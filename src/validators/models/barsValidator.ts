import { IValidationError, Validators } from '../core/validator';
import { MultipleFieldsValidator, IFieldValidatorsPair } from '../core/multipleFieldsValidator';
import { ObjectValidator } from '../core/typeValidator';

export class ReportBarsValidator extends ObjectValidator {
  public validate(input: any, path?: string, field?: string): IValidationError[] {
    if (input == null) {
      return null;
    }
    const errors = super.validate(input, path, field);
    if (errors) {
      return errors;
    }

    const fields: IFieldValidatorsPair[] = [
      {
        field: "actionBar",
        validators: [Validators.actionBarValidator]
      }
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input, path, field);
  }
}

export class ActionBarValidator extends ObjectValidator {
  public validate(input: any, path?: string, field?: string): IValidationError[] {
    if (input == null) {
      return null;
    }
    const errors = super.validate(input, path, field);
    if (errors) {
      return errors;
    }

    const fields: IFieldValidatorsPair[] = [
      {
        field: "visible",
        validators: [Validators.booleanValidator]
      },
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input, path, field);
  }
}