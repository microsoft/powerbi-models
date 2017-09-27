export interface IBaseFilterTarget {
  table: string;
}

export interface IFilterColumnTarget extends IBaseFilterTarget {
  column: string;
  aggregationFunction?: string;
}

export interface IFilterKeyColumnsTarget extends IFilterColumnTarget {
  keys: string[];
}

export interface IFilterKeyHierarchyTarget extends IFilterHierarchyTarget {
    keys: string[];
}

export interface IFilterHierarchyTarget extends IBaseFilterTarget {
  hierarchy: string;
  hierarchyLevel: string;
  aggregationFunction?: string;
}

export interface INotSupportedFilterTarget extends IBaseFilterTarget {}

export interface IFilterMeasureTarget extends IBaseFilterTarget {
  measure: string;
}

export declare type IFilterKeyTarget = (IFilterKeyColumnsTarget | IFilterKeyHierarchyTarget);
export declare type IFilterTarget = (IFilterColumnTarget | IFilterHierarchyTarget | IFilterMeasureTarget | INotSupportedFilterTarget);

export interface IFilter {
    $schema: string;
    target: IFilterTarget;
    filterType: FilterType;
}

export interface INotSupportedFilter extends IFilter {
    message: string;
    notSupportedTypeName: string;
}

export interface IIncludeExcludeFilter extends IFilter {
    values: (string | number | boolean)[];
    isExclude: boolean;
}

export interface ITopNFilter extends IFilter {
    operator: TopNFilterOperators;
    itemCount: number;
}

export interface IRelativeDateFilter extends IFilter {
    operator: RelativeDateOperators;
    timeUnitsCount: number;
    timeUnitType: RelativeDateFilterTimeUnit;
    includeToday: boolean;
}

export interface IBasicFilter extends IFilter {
  operator: BasicFilterOperators;
  values: (string | number | boolean)[];
}

export interface IBasicFilterWithKeys extends IBasicFilter {
  target: IFilterKeyTarget;
  keyValues: (string | number | boolean)[][];
}

export type ReportLevelFilters = IBasicFilter | IAdvancedFilter | IRelativeDateFilter;
export type PageLevelFilters = IBasicFilter | IAdvancedFilter | IRelativeDateFilter;
export type VisualFilterTypes = IBasicFilter | IAdvancedFilter | IRelativeDateFilter | ITopNFilter | IIncludeExcludeFilter;
export type TopNFilterOperators = "Top" | "Bottom";
export type BasicFilterOperators = "In" | "NotIn" | "All";
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
    Advanced = 0,
    Basic = 1,
    Unknown = 2,
    IncludeExclude = 3,
    RelativeDate = 4,
    TopN = 5,
}

export enum RelativeDateFilterTimeUnit {
    Days = 0,
    Weeks = 1,
    CalendarWeeks = 2,
    Months = 3,
    CalendarMonths = 4,
    Years = 5,
    CalendarYears = 6,
}

export enum RelativeDateOperators {
    InLast = 0,
    InThis = 1,
    InNext = 2,
}

export abstract class Filter {
  static schema: string;
  protected static schemaUrl: string;
  target: IFilterTarget;
  filterType: FilterType;
  protected schemaUrl: string;

  constructor(
    target: IFilterTarget,
    filterType: FilterType
  ) {
    this.target = target;
    this.filterType = filterType;
  }

  toJSON(): IFilter {
    return {
      $schema: this.schemaUrl,
      target: this.target,
      filterType: this.filterType
    };
  };
}

export class NotSupportedFilter extends Filter {
  static schemaUrl: string = "http://powerbi.com/product/schema#notSupported";
  message: string;
  notSupportedTypeName: string;

  constructor(
    target: IFilterTarget,
    message: string,
    notSupportedTypeName: string) {
    super(target, FilterType.Unknown);
    this.message = message;
    this.notSupportedTypeName = notSupportedTypeName;
    this.schemaUrl = NotSupportedFilter.schemaUrl;
  }

  toJSON(): INotSupportedFilter {
    const filter = <INotSupportedFilter>super.toJSON();

    filter.message = this.message;
    filter.notSupportedTypeName = this.notSupportedTypeName;

    return filter;
  }
}

export class IncludeExcludeFilter extends Filter {
  static schemaUrl: string = "http://powerbi.com/product/schema#includeExclude";
  values: (string | number | boolean)[];
  isExclude: boolean;

  constructor(
    target: IFilterTarget,
    isExclude: boolean,
    values: (string | number | boolean)[]) {
    super(target, FilterType.IncludeExclude);
    this.values = values;
    this.isExclude = isExclude;
    this.schemaUrl = IncludeExcludeFilter.schemaUrl;
  }

  toJSON(): IIncludeExcludeFilter {
    const filter = <IIncludeExcludeFilter>super.toJSON();

    filter.isExclude = this.isExclude;
    filter.values = this.values;

    return filter;
  }
}

export class TopNFilter extends Filter {
  static schemaUrl: string = "http://powerbi.com/product/schema#topN";
  operator: TopNFilterOperators;
  itemCount: number;

  constructor(
    target: IFilterTarget,
    operator: TopNFilterOperators,
    itemCount: number) {
    super(target, FilterType.TopN);
    this.operator = operator;
    this.itemCount = itemCount;
    this.schemaUrl = TopNFilter.schemaUrl;
  }

  toJSON(): ITopNFilter {
    const filter = <ITopNFilter>super.toJSON();

    filter.operator = this.operator;
    filter.itemCount = this.itemCount;

    return filter;
  }
}

export class RelativeDateFilter extends Filter {
  static schemaUrl: string = "http://powerbi.com/product/schema#relativeDate";
  operator: RelativeDateOperators;
  timeUnitsCount: number;
  timeUnitType: RelativeDateFilterTimeUnit;
  includeToday: boolean;

  constructor(
    target: IFilterTarget,
    operator: RelativeDateOperators,
    timeUnitsCount: number,
    timeUnitType: RelativeDateFilterTimeUnit,
    includeToday: boolean) {
    super(target, FilterType.RelativeDate);
    this.operator = operator;
    this.timeUnitsCount = timeUnitsCount;
    this.timeUnitType = timeUnitType;
    this.includeToday = includeToday;
    this.schemaUrl = RelativeDateFilter.schemaUrl;
  }

  toJSON(): IRelativeDateFilter {
    const filter = <IRelativeDateFilter>super.toJSON();

    filter.operator = this.operator;
    filter.timeUnitsCount = this.timeUnitsCount;
    filter.timeUnitType = this.timeUnitType;
    filter.includeToday = this.includeToday;

    return filter;
  }
}

export class BasicFilter extends Filter {
  static schemaUrl: string = "http://powerbi.com/product/schema#basic";
  operator: BasicFilterOperators;
  values: (string | number | boolean)[];
  keyValues: (string | number | boolean)[][];

  constructor(
    target: IFilterTarget,
    operator: BasicFilterOperators,
    ...values: ((string | number | boolean) | (string | number | boolean)[])[]
  ) {
    super(target, FilterType.Basic);
    this.operator = operator;
    this.schemaUrl = BasicFilter.schemaUrl;

    if (values.length === 0 && operator !== "All") {
      throw new Error(`values must be a non-empty array unless your operator is "All".`);
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

export class BasicFilterWithKeys extends BasicFilter {
  keyValues: (string | number | boolean)[][];
  target: IFilterKeyTarget;

  constructor(
    target: IFilterKeyTarget,
    operator: BasicFilterOperators,
    values: ((string | number | boolean) | (string | number | boolean)[]),
    keyValues: (string | number | boolean)[][]
  ) {
    super(target, operator, values);
    this.keyValues = keyValues;
    this.target = target;
    let numberOfKeys = target.keys ? target.keys.length : 0;

    if (numberOfKeys > 0 && !keyValues) {
      throw new Error(`You shold pass the values to be filtered for each key. You passed: no values and ${numberOfKeys} keys`);
    }

    if (numberOfKeys === 0 && keyValues && keyValues.length > 0) {
      throw new Error(`You passed key values but your target object doesn't contain the keys to be filtered`);
    }

    for (let i = 0 ; i < this.keyValues.length ; i++) {
      if (this.keyValues[i] ) {
        let lengthOfArray = this.keyValues[i].length;
        if (lengthOfArray !== numberOfKeys) {
          throw new Error(`Each tuple of key values should contain a value for each of the keys. You passed: ${lengthOfArray} values and ${numberOfKeys} keys`);
        }
      }

    }
  }

  toJSON(): IBasicFilter {
    const filter = <IBasicFilterWithKeys>super.toJSON();
    filter.keyValues = this.keyValues;
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
    super(target, FilterType.Advanced);
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
  equals: string | boolean | number | Date;
}

export interface IBetweenDataReference extends IDataReference {
  between: (string | boolean | number)[];
}

export interface IValueDataReference extends IDataReference {
  value: string | boolean | number | Date;
  formattedValue: string;
}

export interface IIdentityValue<T extends IDataReference> {
  identity: T[];
  values: IValueDataReference[];
}

/**
 * Copied powerbi-filters code into this file.
 */

export function isFilterKeyColumnsTarget(target: IFilterTarget): boolean {
    return isColumn(target) && !!(<IFilterKeyColumnsTarget>target).keys;
}

export function isBasicFilterWithKeys(filter: IFilter): boolean {
    return getFilterType(filter) === FilterType.Basic && !!(<IBasicFilterWithKeys>filter).keyValues;
}

export function getFilterType(filter: IFilter): FilterType {
  if(filter.filterType) {
    return filter.filterType;
  }

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
