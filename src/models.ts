declare var require: Function;

import { IValidator, Validator, IError, IValidationError } from './validators/core/validator';
import { StringValidator } from './validators/core/typeValidator';
import { ReportLoadValidator } from './validators/models/reportLoadValidator';

export * from './validators/core/validator';

/* tslint:disable:no-var-requires */
export const advancedFilterSchema = require('./schemas/advancedFilter.json');
export const includeExcludeFilterSchema = require('./schemas/includeExcludeFilter.json');
export const notSupportedFilterSchema = require('./schemas/notSupportedFilter.json');
export const relativeDateFilterSchema = require('./schemas/relativeDateFilter.json');
export const topNFilterSchema = require('./schemas/topNFilter.json');
export const filterSchema = require('./schemas/filter.json');
export const extensionSchema = require('./schemas/extension.json');
export const extensionItemSchema = require('./schemas/extensionItem.json');
export const commandExtensionSchema = require('./schemas/commandExtension.json');
export const extensionPointsSchema = require('./schemas/extensionPoints.json');
export const menuExtensionSchema = require('./schemas/menuExtension.json');
export const loadSchema = require('./schemas/reportLoadConfiguration.json');
export const dashboardLoadSchema = require('./schemas/dashboardLoadConfiguration.json');
export const tileLoadSchema = require('./schemas/tileLoadConfiguration.json');
export const pageSchema = require('./schemas/page.json');
export const settingsSchema = require('./schemas/settings.json');
export const basicFilterSchema = require('./schemas/basicFilter.json');
export const createReportSchema = require('./schemas/reportCreateConfiguration.json');
export const saveAsParametersSchema = require('./schemas/saveAsParameters.json');
export const loadQnaConfigurationSchema = require('./schemas/loadQnaConfiguration.json');
export const qnaSettingsSchema = require('./schemas/qnaSettings.json');
export const qnaInterpretInputDataSchema = require('./schemas/qnaInterpretInputData.json');
export const customLayoutSchema = require('./schemas/customLayout.json');
export const pageSizeSchema = require('./schemas/pageSize.json');
export const customPageSizeSchema = require('./schemas/customPageSize.json');
/* tslint:enable:no-var-requires */

export const validateSettings = Validator.validate(settingsSchema, {
  schemas: {
    customLayout: customLayoutSchema,
    pageSize: pageSizeSchema,
    extension: extensionSchema,
    extensionItem: extensionItemSchema,
    commandExtension: commandExtensionSchema,
    extensionPoints: extensionPointsSchema,
    menuExtension: menuExtensionSchema,
  }
});

export const validateCustomPageSize = Validator.validate(customPageSizeSchema, {
  schemas: {
    pageSize: pageSizeSchema,
  }
});

// TODO : add tests to check validateExtension.
export const validateExtension = Validator.validate(extensionSchema, {
  schemas: {
    extension: extensionSchema,
    extensionItem: extensionItemSchema,
    commandExtension: commandExtensionSchema,
    extensionPoints: extensionPointsSchema,
    menuExtension: menuExtensionSchema,
  }
});

function runValidators(input: any, path: string, fieldName: string, validators: IValidator[]): IError[] {
  let errors: IValidationError[];
  for (let validator of validators) {
    errors = validator.validate(input, path, fieldName);
    if (errors) {
      return errors.map(Validator.normalizeError);
    }
  }
  return null;
}

export function validateReportLoad(input: any): IError[] {
  const reportLoadValidator = new ReportLoadValidator();
  return reportLoadValidator.validate(input).map(Validator.normalizeError);
}

export const validateCreateReport = Validator.validate(createReportSchema);

export const validateDashboardLoad = Validator.validate(dashboardLoadSchema);

export const validateTileLoad = Validator.validate(tileLoadSchema);

export const validatePage = Validator.validate(pageSchema);

export const validateFilter = Validator.validate(filterSchema, {
  schemas: {
    basicFilter: basicFilterSchema,
    advancedFilter: advancedFilterSchema,
    notSupportedFilter: notSupportedFilterSchema,
    topNFilter: topNFilterSchema,
    relativeDateFilter: relativeDateFilterSchema,
    includeExcludeFilter: includeExcludeFilterSchema
  }
});

// export function validateReportLevelFilters(filer: IFilter): IError {
export function validateReportLevelFilters(filer: any): IError {
  let error: IError;
  if (Validator.validate(basicFilterSchema)(filer) && Validator.validate(advancedFilterSchema)(filer) && Validator.validate(relativeDateFilterSchema)(filer)) {
    error = { message: "One of the filters is not a report level filter" };
  }
  return error;
}

// export function validatePageLevelFilters(filer: IFilter): IError {
export function validatePageLevelFilters(filer: any): IError {
  let error: IError;
  if (Validator.validate(basicFilterSchema)(filer) && Validator.validate(advancedFilterSchema)(filer) && Validator.validate(relativeDateFilterSchema)(filer)) {
    error = { message: "One of the filters is not a page level filter" };
  }
  return error;
}

export const validateSaveAsParameters = Validator.validate(saveAsParametersSchema);

export const validateLoadQnaConfiguration = Validator.validate(loadQnaConfigurationSchema, {
  schemas: {
    qnaSettings: qnaSettingsSchema,
  }
});

export const validateQnaInterpretInputData = Validator.validate(qnaInterpretInputDataSchema);
