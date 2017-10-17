import { IValidator, IValidationError } from './validator';
import { ObjectValidator } from './typeValidator';

export class MapValidator extends ObjectValidator {
  public constructor(private keyValidators: IValidator[], private valueValidators: IValidator[]) {
    super();
  }

  public validate(input: any, path?: string, field?: string): IValidationError[] {
    if (input == null) {
      return null;
    }
    let errors = super.validate(input, path, field);
    if (errors) {
      return errors;
    }

    for (let key in input) {
      if(input.hasOwnProperty(key)) {
        const fieldsPath = (path ? path + "." : "") + field + "." + key;
        for (let keyValidator of this.keyValidators) {
          errors = keyValidator.validate(key, fieldsPath, field);
          if (errors) {
            return errors;
          }
        }
        for (let valueValidator of this.valueValidators) {
          errors = valueValidator.validate(input[key], fieldsPath, field);
          if (errors) {
            return errors;
          }
        }
      }
    }
    return null;
  }
}
