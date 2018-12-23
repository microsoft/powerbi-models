import { IValidationError, Validators } from '../core/validator';
import { MultipleFieldsValidator, IFieldValidatorsPair } from '../core/multipleFieldsValidator';
import { ObjectValidator } from '../core/typeValidator';

export class CommandsSettingsValidator extends ObjectValidator {
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
        field: "copy",
        validators: [Validators.singleCommandSettingsValidator]
      },
      {
        field: "drill",
        validators: [Validators.singleCommandSettingsValidator]
      },
      {
        field: "drillthrough",
        validators: [Validators.singleCommandSettingsValidator]
      },
      {
        field: "expandCollapse",
        validators: [Validators.singleCommandSettingsValidator]
      },
      {
        field: "exportData",
        validators: [Validators.singleCommandSettingsValidator]
      },
      {
        field: "includeExclude",
        validators: [Validators.singleCommandSettingsValidator]
      },
      {
        field: "removeVisual",
        validators: [Validators.singleCommandSettingsValidator]
      },
      {
        field: "search",
        validators: [Validators.singleCommandSettingsValidator]
      },
      {
        field: "seeData",
        validators: [Validators.singleCommandSettingsValidator]
      },
      {
        field: "sort",
        validators: [Validators.singleCommandSettingsValidator]
      },
      {
        field: "spotlight",
        validators: [Validators.singleCommandSettingsValidator]
      },
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input, path, field);
  }
}

export class SingleCommandSettingsValidator extends ObjectValidator {
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
        field: "displayOption",
        validators: [Validators.fieldRequiredValidator, Validators.commandDisplayOptionValidator]
      },
      {
        field: "selector",
        validators: [Validators.visualCommandSelectorValidator]
      },
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input, path, field);
  }
}
