// @flow
/* eslint-disable */

/**
 * General information about the API.
 */export type Info = {
  /**
   * A unique and precise title of the API.
   */title: string;
  /**
   * A semantic version number of the API.
   */version: string;
  /**
   * A longer description of the API. Should be different from the title.  GitHub Flavored Markdown is allowed.
   */description?: string;
  /**
   * The terms of service for the API.
   */termsOfService?: string;
  contact?: Contact;
  license?: License;
  /**
   * General information about the API.
   */[key: any]: VendorExtension;
};

/**
 * Contact information for the owners of the API.
 */export type Contact = {
  /**
   * The identifying name of the contact person/organization.
   */name?: string;
  /**
   * The URL pointing to the contact information.
   * format: uri
   */url?: string;
  /**
   * The email address of the contact person/organization.
   * format: email
   */email?: string;
  /**
   * Contact information for the owners of the API.
   */[key: any]: VendorExtension;
};

export type License = {
  /**
   * The name of the license type. It's encouraged to use an OSI compatible license.
   */name: string;
  /**
   * The URL pointing to the license.
   * format: uri
   */url?: string;
  [key: any]: VendorExtension;
};

/**
 * Relative paths to the individual endpoints. They must be relative to the 'basePath'.
 */export type Paths = { /**
                          * Relative paths to the individual endpoints. They must be relative to the 'basePath'.
                          */[key: any]: VendorExtension | PathItem;
};

/**
 * One or more JSON objects describing the schemas being consumed and produced by the API.
 */export type Definitions = { /**
                                * One or more JSON objects describing the schemas being consumed and produced by the API.
                                */[key: any]: Schema;
};

/**
 * One or more JSON representations for parameters
 */export type ParameterDefinitions = { /**
                                         * One or more JSON representations for parameters
                                         */[key: any]: Parameter;
};

/**
 * One or more JSON representations for parameters
 */export type ResponseDefinitions = { /**
                                        * One or more JSON representations for parameters
                                        */[key: any]: Response;
};

/**
 * information about external documentation
 */export type ExternalDocs = {
  description?: string;
  /**
   * format: uri
   */url: string;
  /**
   * information about external documentation
   */[key: any]: VendorExtension;
};

export type Examples = { [key: any]: any;
};

/**
 * The MIME type of the HTTP message.
 */export type MimeType = string;

export type Operation = {
  /**
   * uniqueItems: true
   */tags?: Array<string>;
  /**
   * A brief summary of the operation.
   */summary?: string;
  /**
   * A longer description of the operation, GitHub Flavored Markdown is allowed.
   */description?: string;
  externalDocs?: ExternalDocs;
  /**
   * A unique identifier of the operation.
   */operationId?: string;
  /**
   * A list of MIME types the API can produce.
   */produces?: MediaTypeList;
  /**
   * A list of MIME types the API can consume.
   */consumes?: MediaTypeList;
  parameters?: ParametersList;
  responses: Responses;
  schemes?: SchemesList;
  /**
   * default: false
   */deprecated?: boolean;
  security?: Security;
  [key: any]: VendorExtension;
};

export type PathItem = {
  $ref?: string;
  get?: Operation;
  put?: Operation;
  post?: Operation;
  delete?: Operation;
  options?: Operation;
  head?: Operation;
  patch?: Operation;
  parameters?: ParametersList;
  [key: any]: VendorExtension;
};

/**
 * Response objects names can either be any valid HTTP status code or 'default'.
 */export type Responses = { /**
                              * Response objects names can either be any valid HTTP status code or 'default'.
                              */[key: any]: ResponseValue | VendorExtension;
};

export type ResponseValue = Response | JsonReference;

export type Response = {
  description: string;
  schema?: Schema | FileSchema;
  headers?: Headers;
  examples?: Examples;
  [key: any]: VendorExtension;
};

export type Headers = { [key: any]: Header;
};

export type Header = {
  type: "string" | "number" | "integer" | "boolean" | "array";
  format?: string;
  items?: PrimitivesItems;
  collectionFormat?: CollectionFormat;
  default?: Default;
  maximum?: Maximum;
  exclusiveMaximum?: ExclusiveMaximum;
  minimum?: Minimum;
  exclusiveMinimum?: ExclusiveMinimum;
  maxLength?: MaxLength;
  minLength?: MinLength;
  pattern?: Pattern;
  maxItems?: MaxItems;
  minItems?: MinItems;
  uniqueItems?: UniqueItems;
  enum?: Enum;
  multipleOf?: MultipleOf;
  description?: string;
  [key: any]: VendorExtension;
};

/**
 * Any property starting with x- is valid.
 */export type VendorExtension = any;

export type BodyParameter = {
  /**
   * A brief description of the parameter. This could contain examples of use.  GitHub Flavored Markdown is allowed.
   */description?: string;
  /**
   * The name of the parameter.
   */name: string;
  /**
   * Determines the location of the parameter.
   */in: "body";
  /**
   * Determines whether or not this parameter is required or optional.
   * default: false
   */required?: boolean;
  schema: Schema;
  [key: any]: VendorExtension;
};

export type HeaderParameterSubSchema = {
  /**
   * Determines whether or not this parameter is required or optional.
   * default: false
   */required?: boolean;
  /**
   * Determines the location of the parameter.
   */in?: "header";
  /**
   * A brief description of the parameter. This could contain examples of use.  GitHub Flavored Markdown is allowed.
   */description?: string;
  /**
   * The name of the parameter.
   */name?: string;
  type?: "string" | "number" | "boolean" | "integer" | "array";
  format?: string;
  items?: PrimitivesItems;
  collectionFormat?: CollectionFormat;
  default?: Default;
  maximum?: Maximum;
  exclusiveMaximum?: ExclusiveMaximum;
  minimum?: Minimum;
  exclusiveMinimum?: ExclusiveMinimum;
  maxLength?: MaxLength;
  minLength?: MinLength;
  pattern?: Pattern;
  maxItems?: MaxItems;
  minItems?: MinItems;
  uniqueItems?: UniqueItems;
  enum?: Enum;
  multipleOf?: MultipleOf;
  [key: any]: VendorExtension;
};

export type QueryParameterSubSchema = {
  /**
   * Determines whether or not this parameter is required or optional.
   * default: false
   */required?: boolean;
  /**
   * Determines the location of the parameter.
   */in?: "query";
  /**
   * A brief description of the parameter. This could contain examples of use.  GitHub Flavored Markdown is allowed.
   */description?: string;
  /**
   * The name of the parameter.
   */name?: string;
  /**
   * allows sending a parameter by name only or with an empty value.
   * default: false
   */allowEmptyValue?: boolean;
  type?: "string" | "number" | "boolean" | "integer" | "array";
  format?: string;
  items?: PrimitivesItems;
  collectionFormat?: CollectionFormatWithMulti;
  default?: Default;
  maximum?: Maximum;
  exclusiveMaximum?: ExclusiveMaximum;
  minimum?: Minimum;
  exclusiveMinimum?: ExclusiveMinimum;
  maxLength?: MaxLength;
  minLength?: MinLength;
  pattern?: Pattern;
  maxItems?: MaxItems;
  minItems?: MinItems;
  uniqueItems?: UniqueItems;
  enum?: Enum;
  multipleOf?: MultipleOf;
  [key: any]: VendorExtension;
};

export type FormDataParameterSubSchema = {
  /**
   * Determines whether or not this parameter is required or optional.
   * default: false
   */required?: boolean;
  /**
   * Determines the location of the parameter.
   */in?: "formData";
  /**
   * A brief description of the parameter. This could contain examples of use.  GitHub Flavored Markdown is allowed.
   */description?: string;
  /**
   * The name of the parameter.
   */name?: string;
  /**
   * allows sending a parameter by name only or with an empty value.
   * default: false
   */allowEmptyValue?: boolean;
  type?: "string" | "number" | "boolean" | "integer" | "array" | "file";
  format?: string;
  items?: PrimitivesItems;
  collectionFormat?: CollectionFormatWithMulti;
  default?: Default;
  maximum?: Maximum;
  exclusiveMaximum?: ExclusiveMaximum;
  minimum?: Minimum;
  exclusiveMinimum?: ExclusiveMinimum;
  maxLength?: MaxLength;
  minLength?: MinLength;
  pattern?: Pattern;
  maxItems?: MaxItems;
  minItems?: MinItems;
  uniqueItems?: UniqueItems;
  enum?: Enum;
  multipleOf?: MultipleOf;
  [key: any]: VendorExtension;
};

export type PathParameterSubSchema = {
  /**
   * Determines whether or not this parameter is required or optional.
   */required: true;
  /**
   * Determines the location of the parameter.
   */in?: "path";
  /**
   * A brief description of the parameter. This could contain examples of use.  GitHub Flavored Markdown is allowed.
   */description?: string;
  /**
   * The name of the parameter.
   */name?: string;
  type?: "string" | "number" | "boolean" | "integer" | "array";
  format?: string;
  items?: PrimitivesItems;
  collectionFormat?: CollectionFormat;
  default?: Default;
  maximum?: Maximum;
  exclusiveMaximum?: ExclusiveMaximum;
  minimum?: Minimum;
  exclusiveMinimum?: ExclusiveMinimum;
  maxLength?: MaxLength;
  minLength?: MinLength;
  pattern?: Pattern;
  maxItems?: MaxItems;
  minItems?: MinItems;
  uniqueItems?: UniqueItems;
  enum?: Enum;
  multipleOf?: MultipleOf;
  [key: any]: VendorExtension;
};

export type NonBodyParameter = HeaderParameterSubSchema | FormDataParameterSubSchema | QueryParameterSubSchema | PathParameterSubSchema;

export type Parameter = BodyParameter | NonBodyParameter;

/**
 * A deterministic version of a JSON Schema object.
 */export type Schema = {
  $ref?: string;
  format?: string;
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
  /**
   * minimum: 0
   */maxLength?: number;
  /**
   * minimum: 0
   * default: 0
   */minLength?: number;
  /**
   * format: regex
   */pattern?: string;
  /**
   * minimum: 0
   */maxItems?: number;
  /**
   * minimum: 0
   * default: 0
   */minItems?: number;
  /**
   * default: false
   */uniqueItems?: boolean;
  /**
   * minimum: 0
   */maxProperties?: number;
  /**
   * minimum: 0
   * default: 0
   */minProperties?: number;
  /**
   * minItems: 1
   * uniqueItems: true
   */required?: Array<string>;
  /**
   * minItems: 1
   * uniqueItems: true
   */enum?: Array<any>;
  /**
   * default: {}
   */additionalProperties?: Schema | boolean;
  type?: "array" | "boolean" | "integer" | "null" | "number" | "object" | "string" | /**
                                                                                      * minItems: 1
                                                                                      * uniqueItems: true
                                                                                      */Array<"array" | "boolean" | "integer" | "null" | "number" | "object" | "string">;
  /**
   * default: {}
   */items?: Schema | /**
                       * minItems: 1
                       */Array<Schema>;
  /**
   * minItems: 1
   */allOf?: Array<Schema>;
  /**
   * default: {}
   */properties?: { /**
                     * default: {}
                     */[key: any]: Schema;
  };
  discriminator?: string;
  /**
   * default: false
   */readOnly?: boolean;
  xml?: Xml;
  externalDocs?: ExternalDocs;
  example?: any;
  /**
   * A deterministic version of a JSON Schema object.
   */[key: any]: VendorExtension;
};

/**
 * A deterministic version of a JSON Schema object.
 */export type FileSchema = {
  format?: string;
  title?: string;
  description?: string;
  default?: any;
  /**
   * minItems: 1
   * uniqueItems: true
   */required?: Array<string>;
  type: "file";
  /**
   * default: false
   */readOnly?: boolean;
  externalDocs?: ExternalDocs;
  example?: any;
  /**
   * A deterministic version of a JSON Schema object.
   */[key: any]: VendorExtension;
};

export type PrimitivesItems = {
  type?: "string" | "number" | "integer" | "boolean" | "array";
  format?: string;
  items?: PrimitivesItems;
  collectionFormat?: CollectionFormat;
  default?: Default;
  maximum?: Maximum;
  exclusiveMaximum?: ExclusiveMaximum;
  minimum?: Minimum;
  exclusiveMinimum?: ExclusiveMinimum;
  maxLength?: MaxLength;
  minLength?: MinLength;
  pattern?: Pattern;
  maxItems?: MaxItems;
  minItems?: MinItems;
  uniqueItems?: UniqueItems;
  enum?: Enum;
  multipleOf?: MultipleOf;
  [key: any]: VendorExtension;
};

/**
 * uniqueItems: true
 */export type Security = Array<SecurityRequirement>;

export type SecurityRequirement = { [key: any]: /**
                                                 * uniqueItems: true
                                                 */Array<string>;
};

export type Xml = {
  name?: string;
  namespace?: string;
  prefix?: string;
  /**
   * default: false
   */attribute?: boolean;
  /**
   * default: false
   */wrapped?: boolean;
  [key: any]: VendorExtension;
};

export type Tag = {
  name: string;
  description?: string;
  externalDocs?: ExternalDocs;
  [key: any]: VendorExtension;
};

export type SecurityDefinitions = { [key: any]: BasicAuthenticationSecurity | ApiKeySecurity | Oauth2ImplicitSecurity | Oauth2PasswordSecurity | Oauth2ApplicationSecurity | Oauth2AccessCodeSecurity;
};

export type BasicAuthenticationSecurity = {
  type: "basic";
  description?: string;
  [key: any]: VendorExtension;
};

export type ApiKeySecurity = {
  type: "apiKey";
  name: string;
  in: "header" | "query";
  description?: string;
  [key: any]: VendorExtension;
};

export type Oauth2ImplicitSecurity = {
  type: "oauth2";
  flow: "implicit";
  scopes?: Oauth2Scopes;
  /**
   * format: uri
   */authorizationUrl: string;
  description?: string;
  [key: any]: VendorExtension;
};

export type Oauth2PasswordSecurity = {
  type: "oauth2";
  flow: "password";
  scopes?: Oauth2Scopes;
  /**
   * format: uri
   */tokenUrl: string;
  description?: string;
  [key: any]: VendorExtension;
};

export type Oauth2ApplicationSecurity = {
  type: "oauth2";
  flow: "application";
  scopes?: Oauth2Scopes;
  /**
   * format: uri
   */tokenUrl: string;
  description?: string;
  [key: any]: VendorExtension;
};

export type Oauth2AccessCodeSecurity = {
  type: "oauth2";
  flow: "accessCode";
  scopes?: Oauth2Scopes;
  /**
   * format: uri
   */authorizationUrl: string;
  /**
   * format: uri
   */tokenUrl: string;
  description?: string;
  [key: any]: VendorExtension;
};

export type Oauth2Scopes = { [key: any]: string;
};

/**
 * uniqueItems: true
 */export type MediaTypeList = Array<MimeType>;

/**
 * The parameters needed to send a valid API call.
 * uniqueItems: true
 */export type ParametersList = Array<Parameter | JsonReference>;

/**
 * The transfer protocol of the API.
 * uniqueItems: true
 */export type SchemesList = Array<"http" | "https" | "ws" | "wss">;

/**
 * default: "csv"
 */export type CollectionFormat = "csv" | "ssv" | "tsv" | "pipes";

/**
 * default: "csv"
 */export type CollectionFormatWithMulti = "csv" | "ssv" | "tsv" | "pipes" | "multi";

export type Title = string;

export type Description = string;

export type Default = any;

/**
 * minimum: 0
 * exclusiveMinimum: true
 */export type MultipleOf = number;

export type Maximum = number;

/**
 * default: false
 */export type ExclusiveMaximum = boolean;

export type Minimum = number;

/**
 * default: false
 */export type ExclusiveMinimum = boolean;

/**
 * minimum: 0
 */export type MaxLength = number;

/**
 * minimum: 0
 * default: 0
 */export type MinLength = number;

/**
 * format: regex
 */export type Pattern = string;

/**
 * minimum: 0
 */export type MaxItems = number;

/**
 * minimum: 0
 * default: 0
 */export type MinItems = number;

/**
 * default: false
 */export type UniqueItems = boolean;

/**
 * minItems: 1
 * uniqueItems: true
 */export type Enum = Array<any>;

export type JsonReference = {
  $ref: string;
};

export type Swagger = {
  /**
   * The Swagger version of this document.
   */swagger: "2.0";
  info: Info;
  /**
   * The host (name or ip) of the API. Example: 'swagger.io'
   */host?: string;
  /**
   * The base path to the API. Example: '/api'.
   */basePath?: string;
  schemes?: SchemesList;
  /**
   * A list of MIME types accepted by the API.
   */consumes?: MediaTypeList;
  /**
   * A list of MIME types the API can produce.
   */produces?: MediaTypeList;
  paths: Paths;
  definitions?: Definitions;
  parameters?: ParameterDefinitions;
  responses?: ResponseDefinitions;
  security?: Security;
  securityDefinitions?: SecurityDefinitions;
  /**
   * uniqueItems: true
   */tags?: Array<Tag>;
  externalDocs?: ExternalDocs;
  [key: any]: VendorExtension;
};
