declare var require: Function;

/* tslint:disable:no-var-requires */
export const advancedFilterSchema = require('./schemas/advancedFilter.json');
export const filterSchema = require('./schemas/filter.json');
export const loadSchema = require('./schemas/reportLoadConfiguration.json');
export const dashboardLoadSchema = require('./schemas/dashboardLoadConfiguration.json');
export const pageSchema = require('./schemas/page.json');
export const settingsSchema = require('./schemas/settings.json');
export const basicFilterSchema = require('./schemas/basicFilter.json');
/* tslint:enable:no-var-requires */

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
  if (!error.message) {
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

    if (isValid) {
      return undefined;
    }
    else {
      return validate.errors
        .map(normalizeError);
    }
  };
}

export interface ISettings {
  filterPaneEnabled?: boolean;
  navContentPaneEnabled?: boolean;
}

export const validateSettings = validate(settingsSchema, {
  schemas: {
    basicFilter: basicFilterSchema,
    advancedFilter: advancedFilterSchema
  }
});

export interface ILoadConfiguration {
  accessToken: string;
  id: string;
  settings?: ISettings;
  pageName?: string;
  filters?: (IBasicFilter | IAdvancedFilter)[];
}

export const validateLoad = validate(loadSchema, {
  schemas: {
    settings: settingsSchema,
    basicFilter: basicFilterSchema,
    advancedFilter: advancedFilterSchema
  }
});

export interface IDashboardLoadConfiguration {
    accessToken: string;
    id: string;
}

export const validateDashboardLoad = validate(dashboardLoadSchema);

export interface IReport {
  id: string;
  displayName: string;
}

export interface IPage {
  name: string;
  displayName: string;
}

export interface IVisual {
  name: string;
  title: string;
  type: string;
}

export const validatePage = validate(pageSchema);

export const validateFilter = validate(filterSchema, {
  schemas: {
    basicFilter: basicFilterSchema,
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

export interface IBasicFilter extends IFilter {
  operator: BasicFilterOperators;
  values: (string | number | boolean)[];
}

export type BasicFilterOperators = "In" | "NotIn";
export type AdvancedFilterLogicalOperators = "And" | "Or";
export type AdvancedFilterConditionOperators = "None" | "LessThan" | "LessThanOrEqual" | "GreaterThan" | "GreaterThanOrEqual" | "Contains" | "DoesNotContain" | "StartsWith" | "DoesNotStartWith" | "Is" | "IsNot" | "IsBlank" | "IsNotBlank";

export interface IAdvancedFilterCondition {
  value: (string | number | boolean);
  operator: AdvancedFilterConditionOperators;
}

export interface IAdvancedFilter extends IFilter {
  logicalOperator: AdvancedFilterLogicalOperators;
  conditions: IAdvancedFilterCondition[];
}

export enum FilterType {
  Advanced,
  Basic,
  Unknown
}

export function getFilterType(filter: IFilter): FilterType {
  const basicFilter = filter as IBasicFilter;
  const advancedFilter = filter as IAdvancedFilter;

  if ((typeof basicFilter.operator === "string")
    && (Array.isArray(basicFilter.values))
  ) {
    return FilterType.Basic;
  }
  else if ((typeof advancedFilter.logicalOperator === "string")
    && (Array.isArray(advancedFilter.conditions))
  ) {
    return FilterType.Advanced;
  }
  else {
    return FilterType.Unknown;
  }
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
  static schema: string;
  protected static schemaUrl: string;
  target: IFilterTarget;
  protected schemaUrl: string;

  constructor(
    target: IFilterTarget
  ) {
    this.target = target;
  }

  toJSON(): IFilter {
    return {
      $schema: this.schemaUrl,
      target: this.target
    };
  };
}

export class BasicFilter extends Filter {
  static schemaUrl: string = "http://powerbi.com/product/schema#basic";
  operator: BasicFilterOperators;
  values: (string | number | boolean)[];

  constructor(
    target: IFilterTarget,
    operator: BasicFilterOperators,
    ...values: ((string | number | boolean) | (string | number | boolean)[])[]
  ) {
    super(target);
    this.operator = operator;
    this.schemaUrl = BasicFilter.schemaUrl;

    if (values.length === 0) {
      throw new Error(`values must be a non-empty array. You passed: ${values}`);
    }

    /**
     * Accept values as array instead of as individual arguments
     * new BasicFilter('a', 'b', 1, 2);
     * new BasicFilter('a', 'b', [1,2]);
     */
    if (Array.isArray(values[0])) {
      this.values = <(string | number | boolean)[]>values[0];
    }
    else {
      this.values = <(string | number | boolean)[]>values;
    }
  }

  toJSON(): IBasicFilter {
    const filter = <IBasicFilter>super.toJSON();

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
    ...conditions: (IAdvancedFilterCondition | IAdvancedFilterCondition[])[]
  ) {
    super(target);
    this.schemaUrl = AdvancedFilter.schemaUrl;

    // Guard statements
    if (typeof logicalOperator !== "string" || logicalOperator.length === 0) {
      // TODO: It would be nicer to list out the possible logical operators.
      throw new Error(`logicalOperator must be a valid operator, You passed: ${logicalOperator}`);
    }

    this.logicalOperator = logicalOperator;

    let extractedConditions: IAdvancedFilterCondition[];
    /**
     * Accept conditions as array instead of as individual arguments
     * new AdvancedFilter('a', 'b', "And", { value: 1, operator: "Equals" }, { value: 2, operator: "IsGreaterThan" });
     * new AdvancedFilter('a', 'b', "And", [{ value: 1, operator: "Equals" }, { value: 2, operator: "IsGreaterThan" }]);
     */
    if (Array.isArray(conditions[0])) {
      extractedConditions = <IAdvancedFilterCondition[]>conditions[0];
    }
    else {
      extractedConditions = <IAdvancedFilterCondition[]>conditions;
    }

    if (extractedConditions.length === 0) {
      throw new Error(`conditions must be a non-empty array. You passed: ${conditions}`);
    }
    if (extractedConditions.length > 2) {
      throw new Error(`AdvancedFilters may not have more than two conditions. You passed: ${conditions.length}`);
    }
    if (extractedConditions.length === 1 && logicalOperator !== "And") {
      throw new Error(`Logical Operator must be "And" when there is only one condition provided`);
    }

    this.conditions = extractedConditions;
  }

  toJSON(): IAdvancedFilter {
    const filter = <IAdvancedFilter>super.toJSON();

    filter.logicalOperator = this.logicalOperator;
    filter.conditions = this.conditions;

    return filter;
  }
}

export interface IDataReference {
  target: IFilterTarget;
}

export interface IEqualsDataReference extends IDataReference {
  equals: string | boolean | number;
}

export interface IBetweenDataReference extends IDataReference {
  between: (string | boolean | number)[];
}

export interface IValueDataReference extends IDataReference {
  value: string | boolean | number;
}

export interface IIdentityValue<T extends IDataReference> {
  identity: T[];
  values: IValueDataReference[];
}

export interface ISelection {
  visual: IVisual;
  page: IPage;
  report: IReport;
  dataPoints: IIdentityValue<IEqualsDataReference>[];
  regions: IIdentityValue<IEqualsDataReference | IBetweenDataReference>[];
  filters: (IBasicFilter | IAdvancedFilter)[];
}
