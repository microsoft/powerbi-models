import { IValidator, IValidationError } from './validator';

export class ValueValidator implements IValidator {
  public constructor(private possibleValues: number[]) {
  }

  public validate(input: any, path?: string, field?: string): IValidationError[] {
    if (this.possibleValues.indexOf(input) < 0) {
      return [{
        message: field + " property is invalid",
        path: (path ? path + "." : "") + field,
        keyword: "invalid"
      }];
    }
    return null;
  }
}
