import { IValidationError } from '../core/validator';
import { MultipleFieldsValidator, IFieldValidatorsPair } from '../core/multipleFieldsValidator';
import { AnyOfValidator } from '../core/anyOfValidator';
import { FieldRequiredValidator } from '../core/fieldRequiredValidator';
import { ObjectValidator, EnumValidator, StringValidator, ArrayValidator, NumberValidator, StringArrayValidator, BooleanArrayValidator, NumberArrayValidator } from '../core/typeValidator';

export class FilterTargetValidator extends ObjectValidator {
  public validate(input: any, path?: string, field?: string): IValidationError[] {
    const errors = super.validate(input, path, field);
    if (errors) {
      return errors;
    }

    const fields: IFieldValidatorsPair[] = [
      {
        field: "table",
        validators: [new FieldRequiredValidator(), new StringValidator()]
      },
      {
        field: "column",
        validators: [new StringValidator()]
      },
      {
        field: "hierarchy",
        validators: [new StringValidator()]
      },
      {
        field: "hierarchyLevel",
        validators: [new StringValidator()]
      },
      {
        field: "measure",
        validators: [new StringValidator()]
      }
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input, path, field);
  }
}

export class BasicFilterValidator extends ObjectValidator {
  public validate(input: any, path?: string, field?: string): IValidationError[] {
    const errors = super.validate(input, path, field);
    if (errors) {
      return errors;
    }



    const fields: IFieldValidatorsPair[] = [
      {
        field: "target",
        validators: [new FieldRequiredValidator(), new FilterTargetValidator()]
      },
      {
        field: "operator",
        validators: [new FieldRequiredValidator(), new StringValidator()]
      },
      {
        field: "values",
        validators: [new FieldRequiredValidator(), new AnyOfValidator([new StringArrayValidator(), new NumberArrayValidator(), new BooleanArrayValidator()])]
      },
      {
        field: "filterType",
        validators: [new EnumValidator([1])]
      },
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input, path, field);
  }
}

export class AdvancedFilterValidator extends ObjectValidator {
  public validate(input: any, path?: string, field?: string): IValidationError[] {
    const errors = super.validate(input, path, field);
    if (errors) {
      return errors;
    }

    const fields: IFieldValidatorsPair[] = [
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input, path, field);
  }
}

export class RelativeDateFilterValidator extends ObjectValidator {
  public validate(input: any, path?: string, field?: string): IValidationError[] {
    const errors = super.validate(input, path, field);
    if (errors) {
      return errors;
    }

    const fields: IFieldValidatorsPair[] = [
    ];

    const multipleFieldsValidator = new MultipleFieldsValidator(fields);
    return multipleFieldsValidator.validate(input, path, field);
  }
}

export class ReportLevelFilterValidator extends ObjectValidator {

  public validate(input: any, path?: string, field?: string): IValidationError[] {
    const anyOfValidator = new AnyOfValidator([new BasicFilterValidator(), new AdvancedFilterValidator(), new RelativeDateFilterValidator()]);
    return anyOfValidator.validate(input, path, field);
  }
}