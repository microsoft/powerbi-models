import { IValidationError, Validators } from '../core/validator';
import { MultipleFieldsValidator, IFieldValidatorsPair } from '../core/multipleFieldsValidator';
import { ObjectValidator } from '../core/typeValidator';

export class TileLoadValidator extends ObjectValidator {
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
        field: "accessToken",
        validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
      },
      {
        field: "id",
        validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
      },
      {
        field: "dashboardId",
        validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
      },
      {
        field: "pageView",
        validators: [Validators.stringValidator]
      },
      {
        field: "tokenType",
        validators: [Validators.tokenTypeValidator]
      },
      {
        field: "width",
        validators: [Validators.numberValidator]
      },
      {
        field: "height",
        validators: [Validators.numberValidator]
      }
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input, path, field);
  }
}
