import { IValidationError } from '../core/validator';
import { MultipleFieldsValidator, IFieldValidatorsPair } from '../core/multipleFieldsValidator';
import { FieldRequiredValidator } from '../core/fieldRequiredValidator';
import { ObjectValidator, StringValidator, EnumValidator, ArrayValidator } from '../core/typeValidator';
import { SettingsValidator } from './settingsValidator';
import { ReportLevelFilterValidator } from './filtersValidator';

export class ReportLoadValidator extends ObjectValidator {
  public validate(input: any, path?: string, field?: string): IValidationError[] {
    const errors = super.validate(input, path, field);
    if (errors) {
      return errors;
    }

    const fields: IFieldValidatorsPair[] = [
      {
        field: "accessToken",
        validators: [ new StringValidator()]
      },
      {
        field: "tokenType",
        validators: [new EnumValidator([0, 1])]
      },
      {
        field: "id",
        validators: [new FieldRequiredValidator(), new StringValidator()]
      },
      {
        field: "settings",
        validators: [new SettingsValidator()]
      },
      {
        field: "pageName",
        validators: [new StringValidator()]
      },
      {
        field: "filters",
        validators: [new ArrayValidator([new ReportLevelFilterValidator()])]
      },
      {
        field: "permissions",
        validators: [new EnumValidator([0, 1, 2, 4, 7])]
      },
      {
        field: "viewMode",
        validators: [new EnumValidator([0, 1])]
      }
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input);
  }
}
