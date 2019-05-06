declare var require: Function;

export const Validators = require('./validators/core/validator').Validators;

export type KeyValuePair = {
  key: string;
  value: string;
}

export interface ITechnicalDetails {
  requestId?: string;
  errorInfo?: KeyValuePair[];
}

export interface IError {
  message: string;
  detailedMessage?: string;
  errorCode?: string;
  level?: TraceType;
  technicalDetails?: ITechnicalDetails;
}

export enum TraceType {
  Information = 0,
  Verbose = 1,
  Warning = 2,
  Error = 3,
  ExpectedError = 4,
  UnexpectedError = 5,
  Fatal = 6,
}

export enum PageSizeType {
  Widescreen,
  Standard,
  Cortana,
  Letter,
  Custom
}

export enum DisplayOption {
  FitToPage,
  FitToWidth,
  ActualSize
}

export enum BackgroundType {
  Default,
  Transparent
}

export interface IPageSize {
  type: PageSizeType;
}

export interface ICustomPageSize extends IPageSize {
  width?: number;
  height?: number;
}

export type PagesLayout = { [key: string]: IPageLayout; };
export type VisualsLayout = { [key: string]: IVisualLayout; };

export interface IPageLayout {
  defaultLayout?: IVisualLayout;
  visualsLayout: VisualsLayout;
}

export enum VisualContainerDisplayMode {
  Visible,
  Hidden
}

export enum LayoutType {
  Master,
  Custom,
  MobilePortrait,
  MobileLandscape
}

export interface IVisualLayout {
  x?: number;
  y?: number;
  z?: number;
  width?: number;
  height?: number;
  displayState?: IVisualContainerDisplayState;
}

export interface IVisualContainerDisplayState {
  mode: VisualContainerDisplayMode;
}

export interface ICustomLayout {
  pageSize?: IPageSize;
  displayOption?: DisplayOption;
  pagesLayout?: PagesLayout;
}

export interface IReport {
  id: string;
  displayName: string;
}

export enum SectionVisibility {
  AlwaysVisible,
  HiddenInViewMode,
}

export interface IPage {
  // unique name of a page.
  name: string;

  // Display name of a page.
  displayName: string;

  // True if the page is active.
  isActive?: boolean;

  // Default is AlwaysVisible.
  visibility?: SectionVisibility;

  // Page size as saved in the report.
  defaultSize?: ICustomPageSize;

  // Page display options as saved in the report.
  defaultDisplayOption?: DisplayOption;
}

export interface IVisual {
  name: string;
  title: string;
  type: string;
  layout?: IVisualLayout;
}

export enum Permissions {
  Read = 0,
  ReadWrite = 1,
  Copy = 2,
  Create = 4,
  All = 7
}

export enum ViewMode {
  View,
  Edit
}

export enum TokenType {
  Aad,
  Embed
}

export type PageView = "fitToWidth" | "oneColumn" | "actualSize";

export interface IQnaVisualRenderedEvent {
  question: string;
  normalizedQuestion?: string;
}

export interface IVisualCustomCommandEvent {
  visualName: string;
  command: string;
}

export interface ISelection {
  visual: IVisual;
  page: IPage;
  report: IReport;
  dataPoints: IIdentityValue<IEqualsDataReference>[];
  regions: IIdentityValue<IEqualsDataReference | IBetweenDataReference>[];
  filters: IFilter[];
}

export interface ISwipeEvent {
  currentPosition: IPosition;
  startPosition: IPosition;
}

export interface IPosition {
  x: number;
  y: number;
}

export type Extensions = IExtension[];

export interface IExtension {
  command?: ICommandExtension;
}

export interface IExtensionItem {
  name: string;
  extend: IExtensionPoints;
}

export type CommandExtensionSelector = IVisualSelector | IVisualTypeSelector;

export interface ICommandExtension extends IExtensionItem {
  title: string;
  icon?: string;
  selector?: CommandExtensionSelector;
}

// TODO: ExtensionPoints should extend _.Dictionary<ExtensionPoint>. This will need to add lodash to the project.
export interface IExtensionPoints {
  visualContextMenu?: IMenuExtension;
  visualOptionsMenu?: IMenuExtension;
}

export interface IExtensionPoint {
}

export interface IMenuExtension extends IExtensionPoint {
  title?: string;
  icon?: string;
  menuLocation?: MenuLocation;
}

export enum MenuLocation {
  Bottom,
  Top
}

export interface IBaseTarget {
  table: string;
  $schema?: string;
}

export interface IColumnTarget extends IBaseTarget {
  column: string;
}

export interface IKeyColumnsTarget extends IColumnTarget {
  keys: string[];
}

export interface IKeyHierarchyTarget extends IHierarchyLevelTarget {
  keys: string[];
}

export interface IHierarchyLevelTarget extends IBaseTarget {
  hierarchy: string;
  hierarchyLevel: string;
}

export interface INotSupportedTarget extends IBaseTarget { }

export interface IMeasureTarget extends IBaseTarget {
  measure: string;
}

export interface IAggregationTarget {
  aggregationFunction: string;
}

export interface IColumnAggrTarget extends IColumnTarget, IAggregationTarget { }

export interface IHierarchyLevelAggrTarget extends IHierarchyLevelTarget, IAggregationTarget { }

export declare type IKeyTarget = (IKeyColumnsTarget | IKeyHierarchyTarget);
export declare type ITarget = (IColumnTarget | IHierarchyLevelTarget | IMeasureTarget | INotSupportedTarget | IColumnAggrTarget | IHierarchyLevelAggrTarget);

export interface IBaseFilterTarget extends IBaseTarget { }

export interface IFilterColumnTarget extends IBaseFilterTarget, IColumnTarget { }

export interface IFilterKeyColumnsTarget extends IFilterColumnTarget, IKeyColumnsTarget { }

export interface IFilterHierarchyTarget extends IBaseFilterTarget, IHierarchyLevelTarget { }

export interface IFilterKeyHierarchyTarget extends IFilterHierarchyTarget, IKeyHierarchyTarget { }

export interface INotSupportedFilterTarget extends IBaseFilterTarget, INotSupportedTarget { }

export interface IFilterAggregationTarget extends IBaseFilterTarget, IAggregationTarget { }

export interface IFilterMeasureTarget extends IBaseFilterTarget, IMeasureTarget { }

export interface IFilterColumnAggrTarget extends IFilterColumnTarget, IFilterAggregationTarget { }

export interface IFilterHierarchyAggrTarget extends IFilterHierarchyTarget, IFilterAggregationTarget { }

export declare type IFilterKeyTarget = (IFilterKeyColumnsTarget | IFilterKeyHierarchyTarget);
export declare type IFilterTarget = (IFilterColumnTarget | IFilterHierarchyTarget | IFilterMeasureTarget | INotSupportedFilterTarget | IFilterColumnAggrTarget | IFilterHierarchyAggrTarget);
export type ITupleFilterTarget = IFilterTarget[];
export type IFilterGeneralTarget = IFilterTarget | IFilterKeyTarget | ITupleFilterTarget;
export interface IFilter {
  $schema: string;
  target: IFilterGeneralTarget;
  filterType: FilterType;
  displaySettings?: IFilterDisplaySettings;
}

export interface IFilterDisplaySettings {
  isLockedInViewMode?: boolean;
  isHiddenInViewMode?: boolean;
  displayName?: string;
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

export type PrimitiveValueType = (string | number | boolean);
export interface ITupleElementValue {
  value: PrimitiveValueType;
  keyValues?: PrimitiveValueType[];
}
export type TupleValueType = ITupleElementValue[];
export type TupleFilterOperators = "In";
export interface ITupleFilter extends IFilter {
  $schema: string;
  filterType: FilterType;
  operator: TupleFilterOperators;
  target: ITupleFilterTarget;
  values: TupleValueType[];
}

export enum FiltersLevel {
  Report,
  Page,
  Visual
}

export type ReportLevelFilters = IBasicFilter | IBasicFilterWithKeys | IAdvancedFilter | IRelativeDateFilter | ITupleFilter;
export type PageLevelFilters = IBasicFilter | IBasicFilterWithKeys | IAdvancedFilter | IRelativeDateFilter | ITupleFilter;
export type VisualLevelFilters = IBasicFilter | IBasicFilterWithKeys | IAdvancedFilter | IRelativeDateFilter | ITopNFilter | IIncludeExcludeFilter;
export type ISlicerFilter = IBasicFilter | IBasicFilterWithKeys | IAdvancedFilter | IRelativeDateFilter;

export type TopNFilterOperators = "Top" | "Bottom";
export type BasicFilterOperators = "In" | "NotIn" | "All";
export type AdvancedFilterLogicalOperators = "And" | "Or";
export type AdvancedFilterConditionOperators = "None" | "LessThan" | "LessThanOrEqual" | "GreaterThan" | "GreaterThanOrEqual" | "Contains" | "DoesNotContain" | "StartsWith" | "DoesNotStartWith" | "Is" | "IsNot" | "IsBlank" | "IsNotBlank";

export interface IAdvancedFilterCondition {
  value?: (string | number | boolean | Date);
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
  Tuple = 6
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
  target: IFilterGeneralTarget;
  filterType: FilterType;
  displaySettings?: IFilterDisplaySettings;
  protected schemaUrl: string;

  constructor(
    target: IFilterGeneralTarget,
    filterType: FilterType) {
    this.target = target;
    this.filterType = filterType;
  }

  toJSON(): IFilter {
    let filter: IFilter = {
      $schema: this.schemaUrl,
      target: this.target,
      filterType: this.filterType
    };

    // Add displaySettings only when defined
    if (this.displaySettings !== undefined) {
      filter.displaySettings = this.displaySettings;
    }

    return filter;
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
      throw new Error(`You should pass the values to be filtered for each key. You passed: no values and ${numberOfKeys} keys`);
    }

    if (numberOfKeys === 0 && keyValues && keyValues.length > 0) {
      throw new Error(`You passed key values but your target object doesn't contain the keys to be filtered`);
    }

    for (let i = 0; i < this.keyValues.length; i++) {
      if (this.keyValues[i]) {
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

export class TupleFilter extends Filter {
  static schemaUrl: string = "http://powerbi.com/product/schema#tuple";
  operator: TupleFilterOperators;
  target: ITupleFilterTarget;
  values: TupleValueType[];

  constructor(
    target: ITupleFilterTarget,
    operator: TupleFilterOperators,
    values: TupleValueType[]
  ) {
    super(target, FilterType.Tuple);
    this.operator = operator;
    this.schemaUrl = TupleFilter.schemaUrl;
    this.values = values;
  }

  toJSON(): ITupleFilter {
    const filter = <ITupleFilter>super.toJSON();
    filter.operator = this.operator;
    filter.values = this.values;
    filter.target = this.target;
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

export function isFilterKeyColumnsTarget(target: IFilterTarget): boolean {
  return isColumn(target) && !!(<IFilterKeyColumnsTarget>target).keys;
}

export function isBasicFilterWithKeys(filter: IFilter): boolean {
  return getFilterType(filter) === FilterType.Basic && !!(<IBasicFilterWithKeys>filter).keyValues;
}

export function getFilterType(filter: IFilter): FilterType {
  if (filter.filterType) {
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

export function isMeasure(arg: any): arg is IMeasureTarget {
  return arg.table !== undefined && arg.measure !== undefined;
}

export function isColumn(arg: any): arg is IColumnTarget {
  return !!(arg.table && arg.column && !arg.aggregationFunction);
}

export function isHierarchyLevel(arg: any): arg is IHierarchyLevelTarget {
  return !!(arg.table && arg.hierarchy && arg.hierarchyLevel && !arg.aggregationFunction);
}

export function isHierarchyLevelAggr(arg: any): arg is IHierarchyLevelAggrTarget {
  return !!(arg.table && arg.hierarchy && arg.hierarchyLevel && arg.aggregationFunction);
}

export function isColumnAggr(arg: any): arg is IColumnAggrTarget {
  return !!(arg.table && arg.column && arg.aggregationFunction);
}

export interface IReportLoadConfiguration {
  accessToken: string;
  id: string;
  groupId?: string;
  settings?: ISettings;
  pageName?: string;
  filters?: ReportLevelFilters[];
  slicers?: ISlicer[];
  permissions?: Permissions;
  viewMode?: ViewMode;
  tokenType?: TokenType;
  bookmark?: IApplyBookmarkRequest;
  theme?: IReportTheme;
}

export interface IReportCreateConfiguration {
  accessToken: string;
  datasetId: string;
  groupId?: string;
  settings?: ISettings;
  tokenType?: TokenType;
  theme?: IReportTheme;
}

export interface IDashboardLoadConfiguration {
  accessToken: string;
  id: string;
  groupId?: string;
  pageView?: PageView;
  tokenType?: TokenType;
}

export interface ITileLoadConfiguration {
  accessToken: string;
  id: string;
  dashboardId: string;
  groupId?: string;
  tokenType?: TokenType;
  width?: number;
  height?: number;
}

export interface ISettings {
  background?: BackgroundType;
  bookmarksPaneEnabled?: boolean;
  commands?: ICommandsSettings[];
  customLayout?: ICustomLayout;
  extensions?: Extensions;
  filterPaneEnabled?: boolean;
  hideErrors?: boolean;
  layoutType?: LayoutType;
  navContentPaneEnabled?: boolean;
  useCustomSaveAsDialog?: boolean;
  visualSettings?: IVisualSettings;
}

export interface ISaveAsParameters {
  name: string;
}

export interface IQnaSettings {
  filterPaneEnabled?: boolean;
  hideErrors?: boolean;
}

export interface ILoadQnaConfiguration {
  accessToken: string;
  datasetIds: string[];
  groupId?: string;
  question?: string;
  viewMode?: QnaMode;
  settings?: IQnaSettings;
  tokenType?: TokenType;
}

export enum QnaMode {
  Interactive,
  ResultOnly,
}

export enum ExportDataType {
  Summarized,
  Underlying,
}

export enum BookmarksPlayMode {
  Off,
  Presentation,
}

// This is not an enum because enum strings require
// us to upgrade typeScript version and change SDK build definition
export const CommonErrorCodes = {
  TokenExpired: 'TokenExpired',
  NotFound: 'PowerBIEntityNotFound',
  InvalidParameters: 'Invalid parameters',
  LoadReportFailed: 'LoadReportFailed',
  NotAuthorized: 'PowerBINotAuthorizedException',
  FailedToLoadModel: 'ExplorationContainer_FailedToLoadModel_DefaultDetails',
};

export const TextAlignment = {
  Left: 'left',
  Center: 'center',
  Right: 'right',
};

export const LegendPosition = {
  Top: 'Top',
  Bottom: 'Bottom',
  Right: 'Right',
  Left: 'Left',
  TopCenter: 'TopCenter',
  BottomCenter: 'BottomCenter',
  RightCenter: 'RightCenter',
  LeftCenter: 'LeftCenter',
};

export interface IQnaInterpretInputData {
  question: string;
  datasetIds?: string[];
}

export interface IReportBookmark {
  name: string;
  displayName: string;
  state?: string;
  children?: IReportBookmark[];
}

export interface IPlayBookmarkRequest {
  playMode: BookmarksPlayMode;
}

export interface IAddBookmarkRequest {
  state?: string;
  displayName?: string;
  apply?: boolean;
}

export type IApplyBookmarkRequest = IApplyBookmarkStateRequest | IApplyBookmarkByNameRequest;

export interface IApplyBookmarkStateRequest {
  state: string;
}

export interface IApplyBookmarkByNameRequest {
  name: string;
}

export interface IExportDataRequest {
  rows?: number;
  exportDataType?: ExportDataType;
}

export interface IExportDataResult {
  data: string;
}
export interface ICreateVisualRequest {
  visualType: string;
  layout?: IVisualLayout;
}
export interface IVisualResponse {
  visual: IVisual;
}
export interface ICreateVisualResponse extends IVisualResponse {
}
export interface ICloneVisualRequest {
  // The filters which will be applied to the new visual. Default: source visual filters.
  filters?: IFilter[];

  // The layout which will be applied to the new visual.
  // Default: a best effort to put a new visual in an empty space on the canvas.
  layout?: IVisualLayout;
}

export interface ICloneVisualResponse extends IVisualResponse {
  // New visual name
  visualName: string;
}

/*
 * Selectors
 */
export interface ISelector {
  $schema: string;
}

export interface IPageSelector extends ISelector {
  pageName: string;
}

export interface IVisualSelector extends ISelector {
  visualName: string;
}

export interface IVisualTypeSelector extends ISelector {
  visualType: string;
}

export interface ISlicerTargetSelector extends ISelector {
  target: SlicerTarget;
}

export abstract class Selector implements ISelector {
  public $schema: string;

  constructor(schema: string) {
    this.$schema = schema;
  }

  toJSON(): ISelector {
    return {
      $schema: this.$schema
    };
  };
}

export class PageSelector extends Selector implements IPageSelector {
  static schemaUrl: string = "http://powerbi.com/product/schema#pageSelector";
  public pageName: string;

  constructor(pageName: string) {
    super(PageSelector.schemaUrl);
    this.pageName = pageName;
  }

  toJSON(): IPageSelector {
    const selector = <IPageSelector>super.toJSON();

    selector.pageName = this.pageName;
    return selector;
  }
}

export class VisualSelector extends Selector implements IVisualSelector {
  static schemaUrl: string = "http://powerbi.com/product/schema#visualSelector";
  public visualName: string;

  constructor(visualName: string) {
    super(VisualSelector.schemaUrl);
    this.visualName = visualName;
  }

  toJSON(): IVisualSelector {
    const selector = <IVisualSelector>super.toJSON();

    selector.visualName = this.visualName;
    return selector;
  }
}

export class VisualTypeSelector extends Selector implements IVisualTypeSelector {
  public static schemaUrl: string = "http://powerbi.com/product/schema#visualTypeSelector";
  public visualType: string;

  constructor(visualType: string) {
    super(VisualSelector.schemaUrl);
    this.visualType = visualType;
  }

  toJSON(): IVisualTypeSelector {
    const selector = <IVisualTypeSelector>super.toJSON();

    selector.visualType = this.visualType;
    return selector;
  }
}

export class SlicerTargetSelector extends Selector implements ISlicerTargetSelector {
  public static schemaUrl: string = "http://powerbi.com/product/schema#slicerTargetSelector";
  public target: SlicerTarget;

  constructor(target: SlicerTarget) {
    super(VisualSelector.schemaUrl);
    this.target = target;
  }

  toJSON(): ISlicerTargetSelector {
    const selector = <ISlicerTargetSelector>super.toJSON();

    selector.target = this.target;
    return selector;
  }
}
/*
 * Slicers
 */
export type SlicerTarget = IFilterTarget | IFilterKeyTarget;
export type SlicerSelector = IVisualSelector | ISlicerTargetSelector;

export interface ISlicer {
  selector: SlicerSelector;
  state: ISlicerState;
}

export interface ISlicerState {
  filters: ISlicerFilter[];
  targets?: SlicerTarget[];
}

/*
 * Visual Settings
 */
export type VisualHeaderSelector = IVisualSelector | IVisualTypeSelector;
export type VisualsHeaderSelector = VisualHeaderSelector;

export interface IVisualHeaderSettings {
  visible?: boolean;
}

export interface IVisualHeader {
  settings: IVisualHeaderSettings;
  selector?: VisualHeaderSelector;
}

export interface IVisualSettings {
  visualHeaders?: IVisualHeader[];
}

/*
 * Report Theme
 */

export interface IReportTheme {}

export interface ICustomTheme extends IReportTheme {
  themeJson: any;
}

/*
 * Built-in Commands Configuration
 */

export type VisualCommandSelector = IVisualSelector | IVisualTypeSelector;

export enum CommandDisplayOption {
  Enabled,
  Disabled,
  Hidden
}

export interface ICommandSettings {
  displayOption: CommandDisplayOption;
  selector?: VisualCommandSelector;
}

export interface ICommandsSettings {
  copy?: ICommandSettings;
  drill?: ICommandSettings;
  drillthrough?: ICommandSettings;
  expandCollapse?: ICommandSettings;
  exportData?: ICommandSettings;
  includeExclude?: ICommandSettings;
  removeVisual?: ICommandSettings;
  search?: ICommandSettings;
  seeData?: ICommandSettings;
  sort?: ICommandSettings;
  spotlight?: ICommandSettings;
}

/*
 * Visual CRUD
 */

export enum VisualDataRoleKind {
  // Indicates that the role should be bound to something that evaluates to a grouping of values.
  Grouping = 0,

  // Indicates that the role should be bound to something that evaluates to a single value in a scope.
  Measure = 1,

  // Indicates that the role can be bound to either Grouping or Measure.
  GroupingOrMeasure = 2
}

// Indicates the visual preference on Grouping or Measure. Only applicable if kind is GroupingOrMeasure.
export enum VisualDataRoleKindPreference {
  Measure = 0,
  Grouping = 1
}

export interface IVisualDataRole {
  // Unique name for the VisualDataRole
  name: string;

  // Indicates the kind of role.
  kind: VisualDataRoleKind;

  // Indicates the visual preference on what role kind to use
  kindPreference?: VisualDataRoleKindPreference;

  // The display name of the role. 
  displayName?: string;

  // The tooltip text 
  description?: string;
}

export interface IVisualCapabilities {
  // Defines what roles the visual expects, and how those roles should be populated. This is useful for visual generation/editing.
  dataRoles?: IVisualDataRole[];
}

export interface IVisualPropertySelector {
  objectName: string;
  propertyName: string;
}

export interface IVisualPropertyValue {
  schema?: string;
  value: any;
}

export interface IDefaultProperty {
}

export interface IThemeColorProperty {
  id: number;
  shade: number;
}

function normalizeError(error: any): IError {
  let message = error.message;
  if (!message) {
    message = `${error.path} is invalid. Not meeting ${error.keyword} constraint`;
  }
  return {
    message
  };
}

export function validateVisualSelector(input: any): IError[] {
  let errors: any[] = Validators.visualSelectorValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateSlicer(input: any): IError[] {
  let errors: any[] = Validators.slicerValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateSlicerState(input: any): IError[] {
  let errors: any[] = Validators.slicerStateValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validatePlayBookmarkRequest(input: any): IError[] {
  let errors: any[] = Validators.playBookmarkRequestValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateAddBookmarkRequest(input: any): IError[] {
  let errors: any[] = Validators.addBookmarkRequestValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateApplyBookmarkByNameRequest(input: any): IError[] {
  let errors: any[] = Validators.applyBookmarkByNameRequestValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateApplyBookmarkStateRequest(input: any): IError[] {
  let errors: any[] = Validators.applyBookmarkStateRequestValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateSettings(input: any): IError[] {
  let errors: any[] = Validators.settingsValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateCustomPageSize(input: any): IError[] {
  let errors: any[] = Validators.customPageSizeValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateExtension(input: any): IError[] {
  let errors: any[] = Validators.extensionValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateReportLoad(input: any): IError[] {
  let errors: any[] = Validators.reportLoadValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateCreateReport(input: any): IError[] {
  let errors: any[] = Validators.reportCreateValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateDashboardLoad(input: any): IError[] {
  let errors: any[] = Validators.dashboardLoadValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateTileLoad(input: any): IError[] {
  let errors: any[] = Validators.tileLoadValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validatePage(input: any): IError[] {
  let errors: any[] = Validators.pageValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateFilter(input: any): IError[] {
  let errors: any[] = Validators.filtersValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateSaveAsParameters(input: any): IError[] {
  let errors: any[] = Validators.saveAsParametersValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateLoadQnaConfiguration(input: any): IError[] {
  let errors: any[] = Validators.loadQnaValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateQnaInterpretInputData(input: any): IError[] {
  let errors: any[] = Validators.qnaInterpretInputDataValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateExportDataRequest(input: any): IError[] {
  let errors: any[] = Validators.exportDataRequestValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateVisualHeader(input: any): IError[] {
  let errors: any[] = Validators.visualHeaderValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateVisualSettings(input: any): IError[] {
  let errors: any[] = Validators.visualSettingsValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateCommandsSettings(input: any): IError[] {
  let errors: any[] = Validators.commandsSettingsValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateCustomTheme(input: any): IError[] {
  let errors: any[] = Validators.customThemeValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}
