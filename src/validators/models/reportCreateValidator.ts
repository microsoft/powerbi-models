import { IValidationError, Validators } from '../core/validator';
import { MultipleFieldsValidator, IFieldValidatorsPair } from '../core/multipleFieldsValidator';
import { ObjectValidator } from '../core/typeValidator';

export class ReportCreateValidator extends ObjectValidator {
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
        field: "datasetId",
        validators: [Validators.fieldRequiredValidator, Validators.stringValidator]
      },
      {
        field: "groupId",
        validators: [Validators.stringValidator]
      },
      {
        field: "tokenType",
        validators: [Validators.tokenTypeValidator]
      }
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input, path, field);
  }
}
