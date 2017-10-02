import { IValidationError, Validators } from '../core/validator';
import { MultipleFieldsValidator, IFieldValidatorsPair } from '../core/multipleFieldsValidator';
import { ObjectValidator } from '../core/typeValidator';

export class SaveAsParametersValidator extends ObjectValidator {
  public validate(input: any, path?: string, field?: string): IValidationError[] {
    if (input === undefined) {
      return null;
    }
    const errors = super.validate(input, path, field);
    if (errors) {
      return errors;
    }

    const fields: IFieldValidatorsPair[] = [
      {
        field: "name",
        validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
      }
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input, path, field);
  }
}
