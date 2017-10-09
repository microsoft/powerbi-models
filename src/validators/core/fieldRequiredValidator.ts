import { IValidator, IValidationError } from './validator';

export class FieldRequiredValidator implements IValidator {
  public validate(input: any, path?: string, field?: string): IValidationError[] {
    if (input === undefined || input === null) {
      return [{
        message: field + " is required",
        path: (path ? path + "." : "") + field,
        keyword: "required"
      }];
    }
    return null;
  }
}
