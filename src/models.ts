declare var require: Function;

export const advancedFilterSchema = require('./schemas/advancedFilter.json');
export const filterSchema = require('./schemas/filter.json');
export const loadSchema = require('./schemas/load.json');
export const pageSchema = require('./schemas/page.json');
export const pageTargetSchema = require('./schemas/pageTarget.json');
export const settingsSchema = require('./schemas/settings.json');
export const targetSchema = require('./schemas/target.json');
export const valueFilterSchema = require('./schemas/valueFilter.json');
export const visualTargetSchema = require('./schemas/visualTarget.json');

import * as jsen from 'jsen';

interface IValidationError {
  path: string;
  keyword: string;
  message: string;
}

export interface IError {
  message: string;
}

function normalizeError(error: IValidationError): IError {
  if(!error.message) {
    error.message = `${error.path} is invalid. Not meeting ${error.keyword} constraint`;
  }

  delete error.path;
  delete error.keyword;

  return error;
}

/**
 * Takes in schema and returns function which can be used to validate the schema with better semantics around exposing errors
 */
function validate(schema: any, options?: any) {
  return (x: any): IError[] => {
    const validate = jsen(schema, options);
    const isValid = validate(x);

    if(isValid) {
      return undefined;
    }
    else {
      return validate.errors
        .map(normalizeError);
    }
  }
}

export interface ISettings {
  filter?: any;
  filterPaneEnabled?: boolean;
  pageName?: string;
  pageNavigationEnabled?: boolean;
}

export const validateSettings = validate(settingsSchema, {
  schemas: {
    valueFilter: valueFilterSchema,
    advancedFilter: advancedFilterSchema
  }
});

export interface ILoadConfiguration {
  accessToken: string;
  id: string;
  settings?: ISettings;
}

export const validateLoad = validate(loadSchema, {
  schemas: {
    settings: settingsSchema,
    valueFilter: valueFilterSchema,
    advancedFilter: advancedFilterSchema
  }
});

export interface IPageTarget {
  type: "page";
  name: string;
}


export interface IVisualTarget {
  type: "visual";
  id: string;
}

declare type ITarget = (IPageTarget | IVisualTarget);

export const validateTarget = validate(targetSchema);

export interface IPage {
  name: string;
  displayName: string;
}

export const validatePage = validate(pageSchema);

export const validateFilter = validate(filterSchema, {
  schemas: {
    valueFilter: valueFilterSchema,
    advancedFilter: advancedFilterSchema
  }
});

/**
 * Copied powerbi-filters code into this file.
 */
export interface IBaseFilterTarget {
  table: string;
}

export interface IFilterColumnTarget extends IBaseFilterTarget {
  column: string;
}

export interface IFilterHierarchyTarget extends IBaseFilterTarget {
  hierarchy: string;
  hierarchyLevel: string;
}

export interface IFilterMeasureTarget extends IBaseFilterTarget {
  measure: string;
}

export declare type IFilterTarget = (IFilterColumnTarget | IFilterHierarchyTarget | IFilterMeasureTarget);

export interface IFilter {
  $schema: string;
  target: IFilterTarget;
}

export interface IValueFilter extends IFilter {
  operator: BasicFilterOperators;
  values: any[];
}

export type BasicFilterOperators = "In" | "NotIn";
export type AdvancedFilterLogicalOperators = "And" | "Or";
export type AdvancedFilterConditionOperators = "None" | "LessThan" | "LessThanOrEqual" | "GreaterThan" | "GreaterThanOrEqual" | "Contains" | "DoesNotContain" | "StartWith" | "DoesNotStartWith" | "Is" | "IsNot" | "IsBlank" | "IsNotBlank";

export interface IAdvancedFilterCondition {
  value: any;
  operator: AdvancedFilterConditionOperators;
}

export interface IAdvancedFilter extends IFilter {
  logicalOperator: AdvancedFilterLogicalOperators;
  conditions: IAdvancedFilterCondition[];
}

export function isMeasure(arg: any): arg is IFilterMeasureTarget {
  return arg.table !== undefined && arg.measure !== undefined;
}

export function isColumn(arg: any): arg is IFilterColumnTarget {
  return arg.table !== undefined && arg.column !== undefined;
}

export function isHierarchy(arg: any): arg is IFilterHierarchyTarget {
  return arg.table !== undefined && arg.hierarchy !== undefined && arg.hierarchyLevel !== undefined;
}

export abstract class Filter {
  protected static schemaUrl: string;
  protected schemaUrl: string;
  static schema: string;
  target: IFilterTarget;
  
  constructor(
    target: IFilterTarget
  ) {
    this.target = target;
  }
  
  toJSON(): IFilter {
    return {
      $schema: this.schemaUrl,
      target: this.target
    }
  };
}

export class ValueFilter extends Filter {
  static schemaUrl: string = "http://powerbi.com/product/schema#basic";
  operator: BasicFilterOperators;
  values: (string | Number)[];
  
  constructor(
    target: IFilterTarget,
    operator: BasicFilterOperators,
    ...values: any[]
  ) {
    super(target);
    this.operator = operator;
    this.schemaUrl = ValueFilter.schemaUrl;
    
    if(values.length === 0) {
      throw new Error(`values must be a non-empty array. You passed: ${values}`);
    }
    
    /**
     * Accept values as array instead of as individual arguments
     * new ValueFilter('a', 'b', 1, 2);
     * new valueFilter('a', 'b', [1,2]);
     */
    if(Array.isArray(values[0])) {
      this.values = <any>values[0];
    }
    else {
      this.values = values;
    }
  }
  
  toJSON(): IValueFilter {
    const filter = <IValueFilter>super.toJSON();
    
    filter.operator = this.operator;
    filter.values = this.values;
    
    return filter;
  }
}

export class AdvancedFilter extends Filter {
  static schemaUrl: string = "http://powerbi.com/product/schema#advanced";
  
  logicalOperator: AdvancedFilterLogicalOperators;
  conditions: IAdvancedFilterCondition[];
  
  constructor(
    target: IFilterTarget,
    logicalOperator: AdvancedFilterLogicalOperators,
    ...conditions: IAdvancedFilterCondition[]
  ) {
    super(target);
    this.schemaUrl = AdvancedFilter.schemaUrl;
    
    // Guard statements
    if(typeof logicalOperator !== "string" || logicalOperator.length === 0) {
      // TODO: It would be nicer to list out the possible logical operators.
      throw new Error(`logicalOperator must be a valid operator, You passed: ${logicalOperator}`);
    }
    
    this.logicalOperator = logicalOperator;
    
    if(conditions.length === 0) {
      throw new Error(`conditions must be a non-empty array. You passed: ${conditions}`);
    }
    if(conditions.length > 2) {
      throw new Error(`AdvancedFilters may not have more than two conditions. You passed: ${conditions.length}`);
    }
    
    /**
     * Accept conditions as array instead of as individual arguments
     * new ValueFilter('a', 'b', "And", { value: 1, operator: "Equals" }, { value: 2, operator: "IsGreaterThan" });
     * new valueFilter('a', 'b', "And", [{ value: 1, operator: "Equals" }, { value: 2, operator: "IsGreaterThan" }]);
     */
    if(Array.isArray(conditions[0])) {
      this.conditions = <any>conditions[0];
    }
    else {
      this.conditions = conditions;
    }
  }
  
  toJSON(): IAdvancedFilter {
    const filter = <IAdvancedFilter>super.toJSON();
    
    filter.logicalOperator = this.logicalOperator;
    filter.conditions = this.conditions;
    
    return filter;
  }
}