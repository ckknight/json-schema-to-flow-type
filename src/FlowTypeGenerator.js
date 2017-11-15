// @flow

import _ from 'lodash';
import * as t from 'babel-types';

import {
  FlowSchema,
} from './FlowSchema';

export const upperCamelCase = (str: string): string => _.upperFirst(_.camelCase(str));

const optional = (astNode) =>
  _.assign(astNode, { optional: true });

const processArraySchema = (flowSchema: FlowSchema): Object => {
  const { leadingComments, ...itemType } = toFlowType(flowSchema.flowType('any'));
  return {
    ...t.genericTypeAnnotation(
      t.identifier('Array'),
      t.typeParameterInstantiation([
        itemType,
      ]),
    ),
    leadingComments
  };
};

const processObjectSchema = (flowSchema: FlowSchema): Object => {
  const properties = _.map(
    flowSchema.$properties || {},
    (fieldFlowSchema: FlowSchema, field: string) => {
      const { leadingComments, ...fieldType } = toFlowType(fieldFlowSchema);
      const ast = {
        ...t.objectTypeProperty(
          t.identifier(field),
          fieldType,
        ),
        leadingComments
      };

      if (_.includes(flowSchema.$required, field)) {
        return ast;
      }

      return optional(ast);
    },
  );

  return t.objectTypeAnnotation(
    properties,
    flowSchema.$union ? [
      (() => {
        const { leadingComments, ...fieldType } = toFlowType(flowSchema.flowType('any'))
        return {
          ...t.objectTypeIndexer(
            t.identifier('key'),
            t.anyTypeAnnotation(),
            fieldType,
          ),
          leadingComments
        };
      })(),
    ] : null,
  );
};

const getComment = (flowSchema: FlowSchema) => {
  const fullComment = [
    flowSchema.$description,
    flowSchema.$minItems == null ? null : `minItems: ${flowSchema.$minItems}`,
    flowSchema.$maxItems == null ? null : `maxItems: ${flowSchema.$maxItems}`,
    !flowSchema.$uniqueItems ? null : 'uniqueItems',
    flowSchema.$minimum == null ? null : `minimum: ${flowSchema.$minimum}` + (flowSchema.$exclusiveMinimum ? ' (exclusive)' : ''),
    flowSchema.$maximum == null ? null : `maximum: ${flowSchema.$maximum}` + (flowSchema.$exclusiveMaximum ? ' (exclusive)' : ''),
    flowSchema.$format == null ? null : `format: ${flowSchema.$format}`,
    flowSchema.$default == null ? null : `default: ${JSON.stringify(flowSchema.$default)}`,
  ]
    .filter(Boolean)
    .join('\n')
    .split('\n')
    .map(line => _.trimEnd(line))
    .filter(Boolean)
    .map(line => ` * ${line}`)
    .join('\n');
  if (fullComment) {
    return '*\n' + fullComment + '\n ';
  }
  return '';
}

const withLeadingComments = (node: Object, comment: ?string) => {
  if (!comment) {
    return node;
  }
  return {
    ...node,
    leadingComments: [{
      type: 'CommentBlock',
      value: comment,
    }]
  };
}

const toUncommentedFlowType = (flowSchema: FlowSchema): Object => {
  if (flowSchema.$flowRef) {
    return t.identifier(upperCamelCase(flowSchema.$flowRef));
  }

  if (flowSchema.$enum) {
    return t.createUnionTypeAnnotation(
      _.map(
        flowSchema.$enum,
        (value) => t.identifier(JSON.stringify(value)),
      ),
    );
  }

  if (flowSchema.$flowType === 'Array') {
    return processArraySchema(flowSchema, toFlowType);
  }

  if (flowSchema.$flowType === 'Object') {
    return processObjectSchema(flowSchema, toFlowType);
  }

  if (flowSchema.$union) {
    return t.unionTypeAnnotation(_.map(flowSchema.$union, toFlowType));
  }

  if (flowSchema.$intersection) {
    return t.intersectionTypeAnnotation(_.map(flowSchema.$intersection, toFlowType));
  }


  if (flowSchema.$flowType === 'any') {
    return t.anyTypeAnnotation();
  }

  if (flowSchema.$flowType === 'null') {
    return t.nullLiteralTypeAnnotation();
  }

  return t.createTypeAnnotationBasedOnTypeof(flowSchema.$flowType);
};

export const toFlowType = (flowSchema: FlowSchema): Object => {
  return withLeadingComments(
    toUncommentedFlowType(flowSchema),
    getComment(flowSchema)
  );
}
