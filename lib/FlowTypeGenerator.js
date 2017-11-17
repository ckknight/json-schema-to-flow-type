'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toFlowType = exports.upperCamelCase = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _babelTypes = require('babel-types');

var t = _interopRequireWildcard(_babelTypes);

var _FlowSchema = require('./FlowSchema');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const upperCamelCase = exports.upperCamelCase = str => _lodash2.default.upperFirst(_lodash2.default.camelCase(str));

const optional = astNode => _lodash2.default.assign(astNode, { optional: true });

const processArraySchema = flowSchema => {
  const { leadingComments } = toFlowType(flowSchema.flowType('any'));

  const itemType = _objectWithoutProperties(toFlowType(flowSchema.flowType('any')), ['leadingComments']);

  return _extends({}, t.genericTypeAnnotation(t.identifier('Array'), t.typeParameterInstantiation([itemType])), {
    leadingComments
  });
};

const processObjectSchema = flowSchema => {
  const properties = _lodash2.default.map(flowSchema.$properties || {}, (fieldFlowSchema, field) => {
    const { leadingComments } = toFlowType(fieldFlowSchema);

    const fieldType = _objectWithoutProperties(toFlowType(fieldFlowSchema), ['leadingComments']);

    const ast = _extends({}, t.objectTypeProperty(t.identifier(field), fieldType), {
      leadingComments
    });

    if (_lodash2.default.includes(flowSchema.$required, field)) {
      return ast;
    }

    return optional(ast);
  });

  return t.objectTypeAnnotation(properties, flowSchema.$union ? [(() => {
    const { leadingComments } = toFlowType(flowSchema.flowType('any'));

    const fieldType = _objectWithoutProperties(toFlowType(flowSchema.flowType('any')), ['leadingComments']);

    return _extends({}, t.objectTypeIndexer(t.identifier('key'), t.anyTypeAnnotation(), fieldType), {
      leadingComments
    });
  })()] : null);
};

const getComment = flowSchema => {
  const fullComment = [flowSchema.$description, flowSchema.$minItems == null ? null : `minItems: ${ flowSchema.$minItems }`, flowSchema.$maxItems == null ? null : `maxItems: ${ flowSchema.$maxItems }`, !flowSchema.$uniqueItems ? null : 'uniqueItems', flowSchema.$minimum == null ? null : `minimum: ${ flowSchema.$minimum }` + (flowSchema.$exclusiveMinimum ? ' (exclusive)' : ''), flowSchema.$maximum == null ? null : `maximum: ${ flowSchema.$maximum }` + (flowSchema.$exclusiveMaximum ? ' (exclusive)' : ''), flowSchema.$format == null ? null : `format: ${ flowSchema.$format }`, flowSchema.$default == null ? null : `default: ${ JSON.stringify(flowSchema.$default) }`].filter(Boolean).join('\n').split('\n').map(line => _lodash2.default.trimEnd(line)).filter(Boolean).map(line => ` * ${ line }`).join('\n');
  if (fullComment) {
    return '*\n' + fullComment + '\n ';
  }
  return '';
};

const withLeadingComments = (node, comment) => {
  if (!comment) {
    return node;
  }
  return _extends({}, node, {
    leadingComments: [{
      type: 'CommentBlock',
      value: comment
    }]
  });
};

const toUncommentedFlowType = flowSchema => {
  if (flowSchema.$flowRef) {
    return t.identifier(upperCamelCase(flowSchema.$flowRef));
  }

  if (flowSchema.$enum) {
    return t.createUnionTypeAnnotation(_lodash2.default.map(flowSchema.$enum, value => t.identifier(JSON.stringify(value))));
  }

  if (flowSchema.$flowType === 'Array') {
    return processArraySchema(flowSchema, toFlowType);
  }

  if (flowSchema.$flowType === 'Object') {
    return processObjectSchema(flowSchema, toFlowType);
  }

  if (flowSchema.$union) {
    return t.unionTypeAnnotation(_lodash2.default.map(flowSchema.$union, toFlowType));
  }

  if (flowSchema.$intersection) {
    return t.intersectionTypeAnnotation(_lodash2.default.map(flowSchema.$intersection, toFlowType));
  }

  if (flowSchema.$flowType === 'any') {
    return t.anyTypeAnnotation();
  }

  if (flowSchema.$flowType === 'null') {
    return t.nullLiteralTypeAnnotation();
  }

  return t.createTypeAnnotationBasedOnTypeof(flowSchema.$flowType);
};

const toFlowType = exports.toFlowType = flowSchema => {
  return withLeadingComments(toUncommentedFlowType(flowSchema), getComment(flowSchema));
};