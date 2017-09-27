import { IValidationError } from '../core/validator';
import { MultipleFieldsValidator, IFieldValidatorsPair } from '../core/multipleFieldsValidator';
import { FieldRequiredValidator } from '../core/fieldRequiredValidator';
import { ObjectValidator, EnumValidator, StringValidator } from '../core/typeValidator';

export class MenuExtensionValidator extends ObjectValidator {
  public validate(input: any, path?: string, field?: string): IValidationError[] {
    const errors = super.validate(input, path, field);
    if (errors) {
      return errors;
    }

    const fields: IFieldValidatorsPair[] = [
      {
        field: "title",
        validators: [new StringValidator()]
      },
      {
        field: "icon",
        validators: [new StringValidator()]
      }
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input);
  }
}

export class ExtensionPointsValidator extends ObjectValidator {
  public validate(input: any, path?: string, field?: string): IValidationError[] {
    const errors = super.validate(input, path, field);
    if (errors) {
      return errors;
    }

    const fields: IFieldValidatorsPair[] = [
      {
        field: "visualContextMenu",
        validators: [new MenuExtensionValidator()]
      },
      {
        field: "visualOptionsMenu",
        validators: [new MenuExtensionValidator()]
      }
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input);
  }
}

export class ExtensionItemValidator extends ObjectValidator {
  public validate(input: any, path?: string, field?: string): IValidationError[] {
    const errors = super.validate(input, path, field);
    if (errors) {
      return errors;
    }

    const fields: IFieldValidatorsPair[] = [
      {
        field: "name",
        validators: [new FieldRequiredValidator(), new StringValidator()]
      },
      {
        field: "extend",
        validators: [new FieldRequiredValidator(), new ExtensionPointsValidator()]
      }
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input);
  }
}

export class CommandExtensionValidator extends ExtensionItemValidator {

  public validate(input: any, path?: string, field?: string): IValidationError[] {
    const errors = super.validate(input, path, field);
    if (errors) {
      return errors;
    }

    const fields: IFieldValidatorsPair[] = [
      {
        field: "title",
        validators: [new FieldRequiredValidator(), new StringValidator()]
      },
      {
        field: "icon",
        validators: [new StringValidator()]
      }
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input);
  }
}

export class ExtensionValidator extends ObjectValidator {
  public validate(input: any, path?: string, field?: string): IValidationError[] {
    const errors = super.validate(input, path, field);
    if (errors) {
      return errors;
    }

    const fields: IFieldValidatorsPair[] = [
      {
        field: "command",
        validators: [new CommandExtensionValidator()]
      }
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input);
  }
}
