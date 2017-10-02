declare var require: Function;

import { IError, IValidationError, Validators } from './validators/core/validator';

export * from './validators/core/validator';

export * from './models/common';
export * from './models/customLayout';
export * from './models/events';
export * from './models/extensions';
export * from './models/filters';
export * from './models/load';
export * from './models/qna';

function normalizeError(error: IValidationError): IError {
  let message = error.message;
  if (!message) {
    message = `${error.path} is invalid. Not meeting ${error.keyword} constraint`;
  }
  return {
    message
  };
}

export function validateSettings(input: any): IError[] {
  let errors: IValidationError[] = Validators.settingsValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateCustomPageSize(input: any): IError[] {
  let errors: IValidationError[] = Validators.customPageSizeValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateExtension(input: any): IError[] {
  let errors: IValidationError[] = Validators.extentionValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateReportLoad(input: any): IError[] {
  let errors: IValidationError[] = Validators.reportLoadValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateCreateReport(input: any): IError[] {
  let errors: IValidationError[] = Validators.reportCreateValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateDashboardLoad(input: any): IError[] {
  let errors: IValidationError[] = Validators.dashboardLoadValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateTileLoad(input: any): IError[] {
  let errors: IValidationError[] = Validators.tileLoadValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validatePage(input: any): IError[] {
  let errors: IValidationError[] = Validators.pageValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateFilter(input: any): IError[] {
  let errors: IValidationError[] = Validators.filtersValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateSaveAsParameters(input: any): IError[] {
  let errors: IValidationError[] = Validators.saveAsParametersValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateLoadQnaConfiguration(input: any): IError[] {
  let errors: IValidationError[] = Validators.loadQnaValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}

export function validateQnaInterpretInputData(input: any): IError[] {
  let errors: IValidationError[] = Validators.qnaInterpretInputDataValidator.validate(input);
  return errors ? errors.map(normalizeError) : undefined;
}
