import { IValidator, IValidationError } from './validator';
import { ObjectValidator } from './typeValidator';

export class MapValidator extends ObjectValidator {
  public constructor(private keyValidators: IValidator[], private valueValidators: IValidator[]) {
    super();
  }

  public validate(input: any, path?: string, field?: string): IValidationError[] {
    if (input === undefined) {
      return null;
    }
    const errors = super.validate(input, path, field);
    if (errors) {
      return errors;
    }
    
    for (let key in input) {
      const fieldsPath = (path ? path + "." : "") + field + "." + key;
      for (let keyValidator of this.keyValidators) {
        let errors = keyValidator.validate(key, fieldsPath, field);
        if (errors) {
          return errors;
        }
      }
      for (let valueValidator of this.valueValidators) {
        let errors = valueValidator.validate(input[key], fieldsPath, field);
        if (errors) {
          return errors;
        }
      }
    }
    return null;
  }
}
