// @flow

import _ from 'lodash';
import assert from 'assert';

import type {
  Schema,
  SimpleTypes,
} from '../definitions/Schema';

type FlowType = 'Object' | 'Array' | 'string' | 'number' | 'boolean' | 'null' | 'any' | 'void';

const hasProps = (schema: Schema, props: Array<string>): boolean =>
  _.reduce(props, (result: boolean, prop: string) => result || _.has(schema, prop), false);

const isObject = (schema: Schema): boolean => hasProps(schema, [
  'properties',
  'additionalProperties',
  'patternProperties',
  'maxProperties',
  'minProperties',
]);

const isArray = (schema: Schema): boolean => hasProps(schema, [
  'items',
  'additionalItems',
  'maxItems',
  'minItems',
  'uniqueItems',
]);

export class FlowSchema {
  $id: string;
  $flowType: FlowType;
  $flowRef: ?string;
  $required: ?Array<string>;
  $properties: ?{ [key: string]: FlowSchema };
  $enum: ?Array<any>;
  $union: ?Array<FlowSchema>;
  $intersection: ?Array<FlowSchema>;
  $definitions: { [key: string]: FlowSchema };
  $default: any;
  $description: ?string;
  $format: ?string;
  $maxItems: ?string;
  $minItems: ?string;
  $uniqueItems: ?boolean;
  $minimum: ?number;
  $maximum: ?number;
  $exclusiveMinimum: ?boolean;
  $exclusiveMaximum: ?boolean;

  static omitUndefined = (arr: Array<any>): Array<any> =>
    _.filter(arr, (item: any): any => !_.isUndefined(item));

  constructor(flowSchema: Object) {
    this.$id = flowSchema.$id;
    this.$flowType = flowSchema.$flowType;
    this.$flowRef = flowSchema.$flowRef;
    this.$enum = flowSchema.$enum;
    this.$definitions = flowSchema.$definitions;
    this.$default = flowSchema.$default;
    this.$description = flowSchema.$description;
    this.$format = flowSchema.$format;
    this.$maxItems = flowSchema.$maxItems;
    this.$minItems = flowSchema.$minItems;
    this.$uniqueItems = flowSchema.$uniqueItems;
    this.$minimum = flowSchema.$minimum;
    this.$maximum = flowSchema.$maximum;
    this.$exclusiveMinimum = flowSchema.$exclusiveMinimum;
    this.$exclusiveMaximum = flowSchema.$exclusiveMaximum;

    this.$union = flowSchema.$union;
    this.$intersection = flowSchema.$intersection;

    // only for Object
    this.$properties = flowSchema.$properties;
    this.$required = flowSchema.$required;
  }

  $set(key: string, value: any) {
    return new FlowSchema({
      ...this,
      [key]: value,
    });
  }

  id(id: ?string): FlowSchema {
    return this.$set('$id', id);
  }

  flowType(flowType: ?FlowType): FlowSchema {
    return this.$set('$flowType', flowType);
  }

  flowRef(flowRef: ?string): FlowSchema {
    if (_.isEmpty(flowRef)) {
      return this;
    }
    return this.$set('$flowRef', flowRef);
  }

  definitions(definitions: { [key: string]: FlowSchema }): FlowSchema {
    if (_.isEmpty(definitions)) {
      return this;
    }
    return this.$set('$definitions', definitions);
  }

  props(properties: { [key: any]: FlowSchema }, required: ?Array<any>): FlowSchema {
    return this
      .flowType('Object')
      .$set('$properties', properties)
      .$set('$required', required || []);
  }

  enum(values: ?Array<any>): FlowSchema {
    if (_.isEmpty(values)) {
      return this;
    }
    return this.$set('$enum', values);
  }

  union(flowSchemas: Array<FlowSchema | void>): FlowSchema {
    const finalFlowSchemas = FlowSchema.omitUndefined(flowSchemas);
    if (_.isEmpty(finalFlowSchemas)) {
      return this;
    }
    return this.$set('$union', finalFlowSchemas);
  }

  intersection(flowSchemas: Array<FlowSchema | void>): FlowSchema {
    const finalFlowSchemas = FlowSchema.omitUndefined(flowSchemas);
    if (_.isEmpty(finalFlowSchemas)) {
      return this;
    }
    return this.$set('$intersection', finalFlowSchemas);
  }

  default(defaultValue: any): FlowSchema {
    if (defaultValue === undefined) {
      return this;
    }
    return this.$set('$default', defaultValue);
  }

  description(description: ?string): FlowSchema {
    if (_.isEmpty(description)) {
      return this;
    }
    return this.$set('$description', description);
  }

  format(format: ?string): FlowSchema {
    if (_.isEmpty(format)) {
      return this;
    }
    return this.$set('$format', format);
  }

  maxItems(maxItems: ?number): FlowSchema {
    if (_.isNil(maxItems)) {
      return this;
    }
    return this.$set('$maxItems', maxItems);
  }

  minItems(minItems: ?number): FlowSchema {
    if (_.isNil(minItems)) {
      return this;
    }
    return this.$set('$minItems', minItems);
  }

  uniqueItems(uniqueItems: ?boolean): FlowSchema {
    if (_.isNil(uniqueItems)) {
      return this;
    }
    return this.$set('$uniqueItems', uniqueItems);
  }

  minimum(minimum: ?number): FlowSchema {
    if (_.isNil(minimum)) {
      return this;
    }
    return this.$set('$minimum', minimum);
  }

  maximum(maximum: ?number): FlowSchema {
    if (_.isNil(maximum)) {
      return this;
    }
    return this.$set('$maximum', maximum);
  }

  exclusiveMinimum(exclusiveMinimum: ?boolean): FlowSchema {
    if (_.isNil(exclusiveMinimum)) {
      return this;
    }
    return this.$set('$exclusiveMinimum', exclusiveMinimum);
  }

  exclusiveMaximum(exclusiveMaximum: ?boolean): FlowSchema {
    if (_.isNil(exclusiveMaximum)) {
      return this;
    }
    return this.$set('$exclusiveMaximum', exclusiveMaximum);
  }
}

export const flow = (flowType: ?FlowType): FlowSchema =>
  (new FlowSchema({})).flowType(flowType || 'any');

export const convertSchema = (schema: Schema): FlowSchema => {
  if (schema.allOf) {
    const patchedSchema = _.reduce(schema.allOf, (prev: Schema, item: Schema) =>
      _.mergeWith(prev, item, (mergedValue: any, newValue: any, key: string): any => {
        if (_.isNil(mergedValue)) {
          return;
        }
        if (key === '$required') {
          return _.uniq(mergedValue.concat(newValue)); // eslint-disable-line consistent-return
        }
        if (_.isPlainObject(mergedValue)) {
          if (!_.isPlainObject(newValue)) {
            throw new Error(`Failed to merge "allOf" schemas because "${key}" has different values.`);
          }
          return;
        }
        assert.deepEqual(mergedValue, newValue, `Failed to merge "allOf" schemas because "${key}" has different values: ${JSON.stringify(mergedValue)} and ${JSON.stringify(newValue)}.`);
      })
    , _.omit(schema, ['allOf', '$ref']));

    return convertSchema(patchedSchema);
  }

  const f = flow()
    .id(schema.id)
    .flowRef(schema.$ref)
    .enum(schema.enum)
    .default(schema.default)
    .description(schema.description)
    .format((schema: $FlowFixMe).format)
    .definitions(
      _.mapValues(
        schema.definitions,
        (definition: Schema, id: any) => convertSchema(_.assign(_.omit(definition, '$ref'), { id })),
      ),
    );

  if (_.isArray(schema.type)) {
    return f.union(
      _.map(
        [].concat(schema.type || []),
        (type: SimpleTypes) => convertSchema({
          ...schema,
          type,
        }),
      ),
    );
  }

  if (schema.oneOf) {
    return f.union(_.map(schema.oneOf, convertSchema));
  }

  if (schema.anyOf) {
    return f.union(_.map(schema.anyOf, convertSchema));
  }

  if (isObject(schema) && isArray(schema)) {
    return f.flowType('any');
  }

  if (isObject(schema)) {
    return f.flowType('Object')
      .props(_.mapValues(schema.properties, convertSchema), schema.required)
      .union([
        ...(_.map(schema.patternProperties, convertSchema)),
        (typeof schema.additionalProperties === 'object') ? convertSchema(schema.additionalProperties) : undefined,
        (typeof schema.additionalProperties === 'boolean' && schema.additionalProperties) ? convertSchema({}) : undefined,
      ]);
  }

  if (isArray(schema)) {
    return f.flowType('Array')
      .union(_.map([].concat(schema.items || {}), convertSchema))
      .maxItems(schema.maxItems)
      .minItems(schema.minItems)
      .uniqueItems(schema.uniqueItems);
  }

  switch (_.toLower(String(schema.type))) {
    case 'string':
      return f.flowType('string');
    case 'number':
    case 'integer':
      return f
        .minimum(schema.minimum)
        .maximum(schema.maximum)
        .exclusiveMinimum(schema.exclusiveMinimum)
        .exclusiveMaximum(schema.exclusiveMaximum)
        .flowType('number');
    case 'boolean':
      return f.flowType('boolean');
    case 'null':
      return f.flowType('null');
    default:
      return f.flowType('any');
  }
};
