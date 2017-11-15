// @flow
/* eslint-disable */

/**
 * minItems: 1
 */export type SchemaArray = Array<Schema>;

/**
 * minimum: 0
 */export type PositiveInteger = number;

/**
 * default: 0
 */export type PositiveIntegerDefault0 = PositiveInteger;

export type SimpleTypes = "array" | "boolean" | "integer" | "null" | "number" | "object" | "string";

/**
 * minItems: 1
 * uniqueItems: true
 */export type StringArray = Array<string>;

/**
 * Core schema meta-schema
 * default: {}
 */export type Schema = {
  /**
   * format: uri
   */id?: string;
  /**
   * format: uri
   */$ref?: string;
  /**
   * format: uri
   */$schema?: string;
  title?: string;
  description?: string;
  default?: any;
  /**
   * minimum: 0
   * exclusiveMinimum: true
   */multipleOf?: number;
  maximum?: number;
  /**
   * default: false
   */exclusiveMaximum?: boolean;
  minimum?: number;
  /**
   * default: false
   */exclusiveMinimum?: boolean;
  maxLength?: PositiveInteger;
  minLength?: PositiveIntegerDefault0;
  /**
   * format: regex
   */pattern?: string;
  /**
   * default: {}
   */additionalItems?: boolean | Schema;
  /**
   * default: {}
   */items?: Schema | SchemaArray;
  maxItems?: PositiveInteger;
  minItems?: PositiveIntegerDefault0;
  /**
   * default: false
   */uniqueItems?: boolean;
  maxProperties?: PositiveInteger;
  minProperties?: PositiveIntegerDefault0;
  required?: StringArray;
  /**
   * default: {}
   */additionalProperties?: boolean | Schema;
  /**
   * default: {}
   */definitions?: { /**
                      * default: {}
                      */[key: any]: Schema;
  };
  /**
   * default: {}
   */properties?: { /**
                     * default: {}
                     */[key: any]: Schema;
  };
  /**
   * default: {}
   */patternProperties?: { /**
                            * default: {}
                            */[key: any]: Schema;
  };
  dependencies?: { [key: any]: Schema | StringArray;
  };
  /**
   * minItems: 1
   * uniqueItems: true
   */enum?: Array<any>;
  type?: SimpleTypes | /**
                        * minItems: 1
                        * uniqueItems: true
                        */Array<SimpleTypes>;
  allOf?: SchemaArray;
  anyOf?: SchemaArray;
  oneOf?: SchemaArray;
  not?: Schema;
};
