import { BooleanValidator, ArrayValidator, StringValidator, EnumValidator, NumberValidator, StringArrayValidator, BooleanArrayValidator, NumberArrayValidator } from './typeValidator';
import { ExtensionValidator, CommandExtensionValidator, ExtensionPointsValidator, MenuExtensionValidator } from '../models/extensionsValidator';
import { SettingsValidator } from '../models/settingsValidator';
import { PlayBookmarkRequestValidator, AddBookmarkRequestValidator, ApplyBookmarkByNameRequestValidator, ApplyBookmarkStateRequestValidator } from '../models/bookmarkValidator';
import { FilterColumnTargetValidator, FilterHierarchyTargetValidator, FilterMeasureTargetValidator, ConditionItemValidator, RelativeDateFilterValidator, BasicFilterValidator, AdvancedFilterValidator, TopNFilterValidator, NotSupportedFilterValidator, IncludeExcludeFilterValidator, FilterValidator } from '../models/filtersValidator';
import { FieldRequiredValidator } from './fieldRequiredValidator';
import { AnyOfValidator } from './anyOfValidator';
import { ReportLoadValidator } from '../models/reportLoadValidator';
import { ReportCreateValidator } from '../models/reportCreateValidator';
import { DashboardLoadValidator } from '../models/dashboardLoadValidator';
import { TileLoadValidator } from '../models/tileLoadValidator';
import { CustomPageSizeValidator, PageSizeValidator, PageValidator, PageViewFieldValidator } from '../models/pageValidator';
import { QnaSettingsValidator, QnaInterpretInputDataValidator, LoadQnaValidator } from '../models/qnaValidator';
import { SaveAsParametersValidator } from '../models/saveAsParametersValidator';
import { MapValidator } from './mapValidator';
import { CustomLayoutValidator, VisualLayoutValidator, PageLayoutValidator, DisplayStateValidator } from '../models/layoutValidator';
import { ExportDataRequestValidator } from '../models/exportDataValidator';

export interface IValidationError {
  path?: string;
  keyword?: string;
  message?: string;
}

export interface IValidator {
  validate(input: any, path?: string, fieldName?: string): IValidationError[];
}

export const Validators = {
  advancedFilterTypeValidator: new EnumValidator([0]),
  advancedFilterValidator: new AdvancedFilterValidator(),
  anyArrayValidator: new ArrayValidator([new AnyOfValidator([new StringValidator(), new NumberValidator(), new BooleanValidator()])]),
  anyFilterValidator: new AnyOfValidator([new BasicFilterValidator(), new AdvancedFilterValidator(), new IncludeExcludeFilterValidator(), new NotSupportedFilterValidator(), new RelativeDateFilterValidator(), new TopNFilterValidator()]),
  anyValueValidator: new AnyOfValidator([new StringValidator(), new NumberValidator(), new BooleanValidator()]),
  basicFilterTypeValidator: new EnumValidator([1]),
  basicFilterValidator: new BasicFilterValidator(),
  playBookmarkRequestValidator: new PlayBookmarkRequestValidator(),
  addBookmarkRequestValidator: new AddBookmarkRequestValidator(),
  applyBookmarkByNameRequestValidator: new ApplyBookmarkByNameRequestValidator(),
  applyBookmarkStateRequestValidator: new ApplyBookmarkStateRequestValidator(),
  booleanArrayValidator: new BooleanArrayValidator(),
  booleanValidator: new BooleanValidator(),
  commandExtensionValidator: new CommandExtensionValidator(),
  conditionItemValidator: new ConditionItemValidator(),
  customLayoutValidator: new CustomLayoutValidator(),
  customLayoutDisplayOptionValidator: new EnumValidator([0, 1, 2]),
  customPageSizeValidator: new CustomPageSizeValidator(),
  dashboardLoadValidator: new DashboardLoadValidator(),
  displayStateModeValidator: new EnumValidator([0, 1]),
  displayStateValidator: new DisplayStateValidator(),
  exportDataRequestValidator: new ExportDataRequestValidator(),
  extensionPointsValidator: new ExtensionPointsValidator(),
  extentionArrayValidator: new ArrayValidator([new ExtensionValidator()]),
  extentionValidator: new ExtensionValidator(),
  fieldRequiredValidator: new FieldRequiredValidator(),
  filterColumnTargetValidator: new FilterColumnTargetValidator(),
  filterConditionsValidator: new ArrayValidator([new ConditionItemValidator()]),
  filterHierarchyTargetValidator: new FilterHierarchyTargetValidator(),
  filterMeasureTargetValidator: new FilterMeasureTargetValidator(),
  filterTargetValidator: new AnyOfValidator([new FilterColumnTargetValidator(), new FilterHierarchyTargetValidator(),  new FilterMeasureTargetValidator()]),
  filtersArrayValidator: new ArrayValidator([new AnyOfValidator([new BasicFilterValidator(), new AdvancedFilterValidator(), new RelativeDateFilterValidator()])]),
  filtersValidator: new FilterValidator(),
  includeExcludeFilterValidator: new IncludeExcludeFilterValidator(),
  includeExludeFilterTypeValidator: new EnumValidator([3]),
  layoutTypeValidator: new EnumValidator([0, 1, 2, 3]),
  loadQnaValidator: new LoadQnaValidator(),
  menuExtensionValidator: new MenuExtensionValidator(),
  notSupportedFilterTypeValidator: new EnumValidator([2]),
  notSupportedFilterValidator: new NotSupportedFilterValidator(),
  numberArrayValidator: new NumberArrayValidator(),
  numberValidator: new NumberValidator(),
  pageLayoutValidator: new MapValidator([new StringValidator()],[new VisualLayoutValidator()]),
  pageSizeTypeValidator: new EnumValidator([0, 1, 2, 3, 4, 5]),
  pageSizeValidator: new PageSizeValidator(),
  pageValidator: new PageValidator(),
  pageViewFieldValidator: new PageViewFieldValidator(),
  pagesLayoutValidator: new MapValidator([new StringValidator()],[new PageLayoutValidator()]),
  permissionsValidator: new EnumValidator([0, 1, 2, 4, 7]),
  qnaInterpretInputDataValidator: new QnaInterpretInputDataValidator(),
  qnaSettingValidator: new QnaSettingsValidator(),
  relativeDateFilterOperatorValidator: new EnumValidator([0, 1, 2]),
  relativeDateFilterTimeUnitTypeValidator: new EnumValidator([0, 1, 2, 3, 4, 5, 6]),
  relativeDateFilterTypeValidator: new EnumValidator([4]),
  relativeDateFilterValidator: new RelativeDateFilterValidator(),
  reportCreateValidator: new ReportCreateValidator(),
  reportLoadValidator: new ReportLoadValidator(),
  saveAsParametersValidator: new SaveAsParametersValidator(),
  settingsValidator: new SettingsValidator(),
  stringArrayValidator: new StringArrayValidator(),
  stringValidator: new StringValidator(),
  tileLoadValidator: new TileLoadValidator(),
  tokenTypeValidator: new EnumValidator([0, 1]),
  topNFilterTypeValidator: new EnumValidator([5]),
  topNFilterValidator: new TopNFilterValidator(),
  viewModeValidator: new EnumValidator([0, 1]),
  visualLayoutValidator: new VisualLayoutValidator(),
};
