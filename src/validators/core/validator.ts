import { BooleanValidator, ArrayValidator, StringValidator, EnumValidator, NumberValidator, StringArrayValidator, BooleanArrayValidator, NumberArrayValidator } from './typeValidator';
import { ExtensionValidator, CommandExtensionValidator, ExtensionPointsValidator, MenuExtensionValidator } from '../models/extensionsValidator';
import { SettingsValidator } from '../models/settingsValidator';
import { PlayBookmarkRequestValidator, AddBookmarkRequestValidator, ApplyBookmarkByNameRequestValidator, ApplyBookmarkStateRequestValidator } from '../models/bookmarkValidator';
import {
  FilterColumnTargetValidator,
  FilterKeyColumnsTargetValidator,
  FilterHierarchyTargetValidator,
  FilterKeyHierarchyTargetValidator,
  FilterMeasureTargetValidator,
  ConditionItemValidator,
  RelativeDateFilterValidator,
  BasicFilterValidator,
  AdvancedFilterValidator,
  TopNFilterValidator,
  NotSupportedFilterValidator,
  IncludeExcludeFilterValidator,
  FilterValidator } from '../models/filtersValidator';
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
import { VisualSelectorValidator, VisualTypeSelectorValidator, SlicerTargetSelectorValidator } from '../models/selectorsValidator';
import { SlicerValidator, SlicerStateValidator } from '../models/slicersValidator';
import { VisualHeaderSettingsValidator, VisualHeaderValidator, VisualSettingsValidator } from '../models/visualSettingsValidator';
import { SingleCommandSettingsValidator, CommandsSettingsValidator } from '../models/commandsSettingsValidator';
import { CustomThemeValidator } from '../models/customThemeValidator';

export interface IValidationError {
  path?: string;
  keyword?: string;
  message?: string;
}

export interface IValidator {
  validate(input: any, path?: string, fieldName?: string): IValidationError[];
}

export const Validators = {
  addBookmarkRequestValidator: new AddBookmarkRequestValidator(),
  advancedFilterTypeValidator: new EnumValidator([0]),
  advancedFilterValidator: new AdvancedFilterValidator(),
  anyArrayValidator: new ArrayValidator([new AnyOfValidator([new StringValidator(), new NumberValidator(), new BooleanValidator()])]),
  anyFilterValidator: new AnyOfValidator([new BasicFilterValidator(), new AdvancedFilterValidator(), new IncludeExcludeFilterValidator(), new NotSupportedFilterValidator(), new RelativeDateFilterValidator(), new TopNFilterValidator()]),
  anyValueValidator: new AnyOfValidator([new StringValidator(), new NumberValidator(), new BooleanValidator()]),
  applyBookmarkByNameRequestValidator: new ApplyBookmarkByNameRequestValidator(),
  applyBookmarkStateRequestValidator: new ApplyBookmarkStateRequestValidator(),
  applyBookmarkValidator: new AnyOfValidator([new ApplyBookmarkByNameRequestValidator(), new ApplyBookmarkStateRequestValidator()]),
  backgroundValidator: new EnumValidator([0, 1]),
  basicFilterTypeValidator: new EnumValidator([1]),
  basicFilterValidator: new BasicFilterValidator(),
  booleanArrayValidator: new BooleanArrayValidator(),
  booleanValidator: new BooleanValidator(),
  commandDisplayOptionValidator: new EnumValidator([0, 1, 2]),
  commandExtensionSelectorValidator: new AnyOfValidator([new VisualSelectorValidator(), new VisualTypeSelectorValidator()]),
  commandExtensionValidator: new CommandExtensionValidator(),
  commandsSettingsArrayValidator: new ArrayValidator([new CommandsSettingsValidator()]),
  commandsSettingsValidator: new CommandsSettingsValidator(),
  conditionItemValidator: new ConditionItemValidator(),
  customLayoutDisplayOptionValidator: new EnumValidator([0, 1, 2]),
  customLayoutValidator: new CustomLayoutValidator(),
  customPageSizeValidator: new CustomPageSizeValidator(),
  customThemeValidator: new CustomThemeValidator(),
  dashboardLoadValidator: new DashboardLoadValidator(),
  displayStateModeValidator: new EnumValidator([0, 1]),
  displayStateValidator: new DisplayStateValidator(),
  exportDataRequestValidator: new ExportDataRequestValidator(),
  extensionArrayValidator: new ArrayValidator([new ExtensionValidator()]),
  extensionPointsValidator: new ExtensionPointsValidator(),
  extensionValidator: new ExtensionValidator(),
  fieldRequiredValidator: new FieldRequiredValidator(),
  filterColumnTargetValidator: new FilterColumnTargetValidator(),
  filterConditionsValidator: new ArrayValidator([new ConditionItemValidator()]),
  filterHierarchyTargetValidator: new FilterHierarchyTargetValidator(),
  filterMeasureTargetValidator: new FilterMeasureTargetValidator(),
  filterTargetValidator: new AnyOfValidator([new FilterColumnTargetValidator(), new FilterHierarchyTargetValidator(), new FilterMeasureTargetValidator()]),
  filtersArrayValidator: new ArrayValidator([new AnyOfValidator([new BasicFilterValidator(), new AdvancedFilterValidator(), new RelativeDateFilterValidator()])]),
  filtersValidator: new FilterValidator(),
  includeExcludeFilterValidator: new IncludeExcludeFilterValidator(),
  includeExludeFilterTypeValidator: new EnumValidator([3]),
  layoutTypeValidator: new EnumValidator([0, 1, 2, 3]),
  loadQnaValidator: new LoadQnaValidator(),
  menuExtensionValidator: new MenuExtensionValidator(),
  menuLocationValidator: new EnumValidator([0, 1]),
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
  playBookmarkRequestValidator: new PlayBookmarkRequestValidator(),
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
  singleCommandSettingsValidator: new SingleCommandSettingsValidator(),
  slicerSelectorValidator: new AnyOfValidator([new VisualSelectorValidator(), new SlicerTargetSelectorValidator()]),
  slicerStateValidator: new SlicerStateValidator(),
  slicerTargetValidator: new AnyOfValidator([new FilterColumnTargetValidator(), new FilterHierarchyTargetValidator(), new FilterMeasureTargetValidator(), new FilterKeyColumnsTargetValidator(), new FilterKeyHierarchyTargetValidator()]),
  slicerValidator: new SlicerValidator(),
  stringArrayValidator: new StringArrayValidator(),
  stringValidator: new StringValidator(),
  tileLoadValidator: new TileLoadValidator(),
  tokenTypeValidator: new EnumValidator([0, 1]),
  topNFilterTypeValidator: new EnumValidator([5]),
  topNFilterValidator: new TopNFilterValidator(),
  viewModeValidator: new EnumValidator([0, 1]),
  visualCommandSelectorValidator: new AnyOfValidator([new VisualSelectorValidator(), new VisualTypeSelectorValidator()]),
  visualHeaderSelectorValidator: new AnyOfValidator([new VisualSelectorValidator(), new VisualTypeSelectorValidator()]),
  visualHeaderSettingsValidator: new VisualHeaderSettingsValidator(),
  visualHeaderValidator: new VisualHeaderValidator(),
  visualHeadersValidator: new ArrayValidator([new VisualHeaderValidator()]),
  visualLayoutValidator: new VisualLayoutValidator(),
  visualSelectorValidator: new VisualSelectorValidator(),
  visualSettingsValidator: new VisualSettingsValidator(),
  visualTypeSelectorValidator: new VisualTypeSelectorValidator(),
};
