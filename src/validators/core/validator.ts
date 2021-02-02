// -----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
// -----------------------------------------------------------------------

import { ActionBarValidator, ReportBarsValidator } from '../models/barsValidator';
import { AddBookmarkRequestValidator, ApplyBookmarkByNameRequestValidator, ApplyBookmarkStateRequestValidator, CaptureBookmarkOptionsValidator, CaptureBookmarkRequestValidator, PlayBookmarkRequestValidator } from '../models/bookmarkValidator';
import { CommandsSettingsValidator, SingleCommandSettingsValidator } from '../models/commandsSettingsValidator';
import { CustomThemeValidator } from '../models/customThemeValidator';
import { DashboardLoadValidator } from '../models/dashboardLoadValidator';
import { DatasetBindingValidator } from '../models/datasetBindingValidator';
import { ExportDataRequestValidator } from '../models/exportDataValidator';
import { CommandExtensionValidator, ExtensionPointsValidator, ExtensionsValidator, ExtensionValidator, FlatMenuExtensionValidator, GroupedMenuExtensionValidator, MenuGroupExtensionValidator } from '../models/extensionsValidator';
import {
    AdvancedFilterValidator,
    BasicFilterValidator,
    ConditionItemValidator,
    FilterColumnTargetValidator,
    FilterDisplaySettingsValidator,
    FilterHierarchyTargetValidator,
    FilterKeyColumnsTargetValidator,
    FilterKeyHierarchyTargetValidator,
    FilterMeasureTargetValidator,
    FilterValidator,
    IncludeExcludeFilterValidator,
    NotSupportedFilterValidator,
    RelativeDateFilterValidator,
    RelativeTimeFilterValidator,
    RemoveFiltersRequestValidator,
    TopNFilterValidator,
    UpdateFiltersRequestValidator
} from '../models/filtersValidator';
import { CustomLayoutValidator, DisplayStateValidator, PageLayoutValidator, VisualLayoutValidator } from '../models/layoutValidator';
import { CustomPageSizeValidator, PageSizeValidator, PageValidator, PageViewFieldValidator } from '../models/pageValidator';
import {
    BookmarksPaneValidator,
    FieldsPaneValidator,
    FiltersPaneValidator,
    PageNavigationPaneValidator,
    ReportPanesValidator,
    SelectionPaneValidator,
    SyncSlicersPaneValidator,
    VisualizationsPaneValidator
} from '../models/panesValidator';
import { LoadQnaValidator, QnaInterpretInputDataValidator, QnaSettingsValidator } from '../models/qnaValidator';
import { ReportCreateValidator } from '../models/reportCreateValidator';
import { ReportLoadValidator } from '../models/reportLoadValidator';
import { SaveAsParametersValidator } from '../models/saveAsParametersValidator';
import { SlicerTargetSelectorValidator, VisualSelectorValidator, VisualTypeSelectorValidator } from '../models/selectorsValidator';
import { SettingsValidator } from '../models/settingsValidator';
import { SlicerStateValidator, SlicerValidator } from '../models/slicersValidator';
import { TileLoadValidator } from '../models/tileLoadValidator';
import { VisualHeaderSettingsValidator, VisualHeaderValidator, VisualSettingsValidator } from '../models/visualSettingsValidator';
import { AnyOfValidator } from './anyOfValidator';
import { FieldForbiddenValidator } from './fieldForbiddenValidator';
import { FieldRequiredValidator } from './fieldRequiredValidator';
import { MapValidator } from './mapValidator';
import { ArrayValidator, BooleanArrayValidator, BooleanValidator, EnumValidator, NumberArrayValidator, NumberValidator, StringArrayValidator, StringValidator } from './typeValidator';

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
    anyFilterValidator: new AnyOfValidator([new BasicFilterValidator(), new AdvancedFilterValidator(), new IncludeExcludeFilterValidator(), new NotSupportedFilterValidator(), new RelativeDateFilterValidator(), new TopNFilterValidator(), new RelativeTimeFilterValidator()]),
    anyValueValidator: new AnyOfValidator([new StringValidator(), new NumberValidator(), new BooleanValidator()]),
    actionBarValidator: new ActionBarValidator(),
    applyBookmarkByNameRequestValidator: new ApplyBookmarkByNameRequestValidator(),
    applyBookmarkStateRequestValidator: new ApplyBookmarkStateRequestValidator(),
    applyBookmarkValidator: new AnyOfValidator([new ApplyBookmarkByNameRequestValidator(), new ApplyBookmarkStateRequestValidator()]),
    backgroundValidator: new EnumValidator([0, 1]),
    basicFilterTypeValidator: new EnumValidator([1]),
    basicFilterValidator: new BasicFilterValidator(),
    booleanArrayValidator: new BooleanArrayValidator(),
    booleanValidator: new BooleanValidator(),
    bookmarksPaneValidator: new BookmarksPaneValidator(),
    captureBookmarkOptionsValidator: new CaptureBookmarkOptionsValidator(),
    captureBookmarkRequestValidator: new CaptureBookmarkRequestValidator(),
    commandDisplayOptionValidator: new EnumValidator([0, 1, 2]),
    commandExtensionSelectorValidator: new AnyOfValidator([new VisualSelectorValidator(), new VisualTypeSelectorValidator()]),
    commandExtensionArrayValidator: new ArrayValidator([new CommandExtensionValidator()]),
    commandExtensionValidator: new CommandExtensionValidator(),
    commandsSettingsArrayValidator: new ArrayValidator([new CommandsSettingsValidator()]),
    commandsSettingsValidator: new CommandsSettingsValidator(),
    conditionItemValidator: new ConditionItemValidator(),
    contrastModeValidator: new EnumValidator([0, 1, 2, 3, 4]),
    customLayoutDisplayOptionValidator: new EnumValidator([0, 1, 2]),
    customLayoutValidator: new CustomLayoutValidator(),
    customPageSizeValidator: new CustomPageSizeValidator(),
    customThemeValidator: new CustomThemeValidator(),
    dashboardLoadValidator: new DashboardLoadValidator(),
    datasetBindingValidator: new DatasetBindingValidator(),
    displayStateModeValidator: new EnumValidator([0, 1]),
    displayStateValidator: new DisplayStateValidator(),
    exportDataRequestValidator: new ExportDataRequestValidator(),
    extensionArrayValidator: new ArrayValidator([new ExtensionValidator()]),
    extensionsValidator: new AnyOfValidator([new ArrayValidator([new ExtensionValidator()]), new ExtensionsValidator()]),
    extensionPointsValidator: new ExtensionPointsValidator(),
    extensionValidator: new ExtensionValidator(),
    fieldForbiddenValidator: new FieldForbiddenValidator(),
    fieldRequiredValidator: new FieldRequiredValidator(),
    fieldsPaneValidator: new FieldsPaneValidator(),
    filterColumnTargetValidator: new FilterColumnTargetValidator(),
    filterDisplaySettingsValidator: new FilterDisplaySettingsValidator(),
    filterConditionsValidator: new ArrayValidator([new ConditionItemValidator()]),
    filterHierarchyTargetValidator: new FilterHierarchyTargetValidator(),
    filterMeasureTargetValidator: new FilterMeasureTargetValidator(),
    filterTargetValidator: new AnyOfValidator([new FilterColumnTargetValidator(), new FilterHierarchyTargetValidator(), new FilterMeasureTargetValidator()]),
    filterValidator: new FilterValidator(),
    filterTypeValidator: new EnumValidator([0, 1, 2, 3, 4, 5, 6, 7]),
    filtersArrayValidator: new ArrayValidator([new FilterValidator()]),
    filtersOperationsUpdateValidator: new EnumValidator([1, 2, 3]),
    filtersOperationsRemoveAllValidator: new EnumValidator([0]),
    filtersPaneValidator: new FiltersPaneValidator(),
    hyperlinkClickBehaviorValidator: new EnumValidator([0, 1, 2]),
    includeExcludeFilterValidator: new IncludeExcludeFilterValidator(),
    includeExludeFilterTypeValidator: new EnumValidator([3]),
    layoutTypeValidator: new EnumValidator([0, 1, 2, 3]),
    loadQnaValidator: new LoadQnaValidator(),
    menuExtensionValidator: new AnyOfValidator([new FlatMenuExtensionValidator(), new GroupedMenuExtensionValidator()]),
    menuGroupExtensionArrayValidator: new ArrayValidator([new MenuGroupExtensionValidator()]),
    menuGroupExtensionValidator: new MenuGroupExtensionValidator(),
    menuLocationValidator: new EnumValidator([0, 1]),
    notSupportedFilterTypeValidator: new EnumValidator([2]),
    notSupportedFilterValidator: new NotSupportedFilterValidator(),
    numberArrayValidator: new NumberArrayValidator(),
    numberValidator: new NumberValidator(),
    pageLayoutValidator: new MapValidator([new StringValidator()], [new VisualLayoutValidator()]),
    pageNavigationPaneValidator: new PageNavigationPaneValidator(),
    pageNavigationPositionValidator: new EnumValidator([0, 1]),
    pageSizeTypeValidator: new EnumValidator([0, 1, 2, 3, 4, 5]),
    pageSizeValidator: new PageSizeValidator(),
    pageValidator: new PageValidator(),
    pageViewFieldValidator: new PageViewFieldValidator(),
    pagesLayoutValidator: new MapValidator([new StringValidator()], [new PageLayoutValidator()]),
    reportBarsValidator: new ReportBarsValidator(),
    reportPanesValidator: new ReportPanesValidator(),
    permissionsValidator: new EnumValidator([0, 1, 2, 4, 7]),
    playBookmarkRequestValidator: new PlayBookmarkRequestValidator(),
    qnaInterpretInputDataValidator: new QnaInterpretInputDataValidator(),
    qnaSettingValidator: new QnaSettingsValidator(),
    relativeDateFilterOperatorValidator: new EnumValidator([0, 1, 2]),
    relativeDateFilterTimeUnitTypeValidator: new EnumValidator([0, 1, 2, 3, 4, 5, 6]),
    relativeDateFilterTypeValidator: new EnumValidator([4]),
    relativeDateFilterValidator: new RelativeDateFilterValidator(),
    relativeDateTimeFilterTypeValidator: new EnumValidator([4, 7]),
    relativeDateTimeFilterUnitTypeValidator: new EnumValidator([0, 1, 2, 3, 4, 5, 6, 7, 8]),
    relativeTimeFilterTimeUnitTypeValidator: new EnumValidator([7, 8]),
    relativeTimeFilterTypeValidator: new EnumValidator([7]),
    relativeTimeFilterValidator: new RelativeTimeFilterValidator(),
    reportCreateValidator: new ReportCreateValidator(),
    reportLoadValidator: new ReportLoadValidator(),
    saveAsParametersValidator: new SaveAsParametersValidator(),
    selectionPaneValidator: new SelectionPaneValidator(),
    settingsValidator: new SettingsValidator(),
    singleCommandSettingsValidator: new SingleCommandSettingsValidator(),
    slicerSelectorValidator: new AnyOfValidator([new VisualSelectorValidator(), new SlicerTargetSelectorValidator()]),
    slicerStateValidator: new SlicerStateValidator(),
    slicerTargetValidator: new AnyOfValidator([new FilterColumnTargetValidator(), new FilterHierarchyTargetValidator(), new FilterMeasureTargetValidator(), new FilterKeyColumnsTargetValidator(), new FilterKeyHierarchyTargetValidator()]),
    slicerValidator: new SlicerValidator(),
    stringArrayValidator: new StringArrayValidator(),
    stringValidator: new StringValidator(),
    syncSlicersPaneValidator: new SyncSlicersPaneValidator(),
    tileLoadValidator: new TileLoadValidator(),
    tokenTypeValidator: new EnumValidator([0, 1]),
    topNFilterTypeValidator: new EnumValidator([5]),
    topNFilterValidator: new TopNFilterValidator(),
    updateFiltersRequestValidator: new AnyOfValidator([new UpdateFiltersRequestValidator(), new RemoveFiltersRequestValidator()]),
    viewModeValidator: new EnumValidator([0, 1]),
    visualCommandSelectorValidator: new AnyOfValidator([new VisualSelectorValidator(), new VisualTypeSelectorValidator()]),
    visualHeaderSelectorValidator: new AnyOfValidator([new VisualSelectorValidator(), new VisualTypeSelectorValidator()]),
    visualHeaderSettingsValidator: new VisualHeaderSettingsValidator(),
    visualHeaderValidator: new VisualHeaderValidator(),
    visualHeadersValidator: new ArrayValidator([new VisualHeaderValidator()]),
    visualizationsPaneValidator: new VisualizationsPaneValidator(),
    visualLayoutValidator: new VisualLayoutValidator(),
    visualSelectorValidator: new VisualSelectorValidator(),
    visualSettingsValidator: new VisualSettingsValidator(),
    visualTypeSelectorValidator: new VisualTypeSelectorValidator(),
};
