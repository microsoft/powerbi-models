import { IValidator, IValidationError } from './validator';

export class FieldRequiredValidator implements IValidator {
  public validate(input: any, path?: string, field?: string): IValidationError[] {
    if (input === undefined) {
      return [{
        message: field + " is required",
        path: (path ? path + "." : "") + "accessToken",
        keyword: "required"
      }];
    }
    return null;
  }
}
