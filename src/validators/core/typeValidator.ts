import { IValidator, IValidationError } from './validator';

export class ObjectValidator implements IValidator {
  public validate(input: any, path?: string, field?: string): IValidationError[] {
    if (input == null) {
      return null;
    }
    if (typeof input !== "object" || Array.isArray(input)) {
      return [{
        message: field !== undefined ? field + " must be an object" : "input must be an object",
        path: path,
        keyword: "type"
      }];
    }
    return null;
  }
}

export class ArrayValidator implements IValidator {
  constructor(private itemValidators: IValidator[]) {
  }

  public validate(input: any, path?: string, field?: string): IValidationError[] {
    if (input == null) {
      return null;
    }
    if (!(Array.isArray(input))) {
      return [{
        message: field + " property is invalid",
        path: (path ? path + "." : "") + field,
        keyword: "type"
      }];
    }

    for (let i = 0; i < input.length; i++) {
      const fieldsPath = (path ? path + "." : "") + field + "." + i;
      for (let validator of this.itemValidators) {
        let errors = validator.validate(input[i], fieldsPath, field);
        if (errors) {
          return [{
            message: field + " property is invalid",
            path: (path ? path + "." : "") + field,
            keyword: "type"
          }];
        }
      }
    }

    return null;
  }
}

export class TypeValidator implements IValidator {
  constructor(private expectedType: string) {
  }

  public validate(input: any, path?: string, field?: string): IValidationError[] {
    if (input == null) {
      return null;
    }
    if (!(typeof input === this.expectedType)) {
      return [{
        message: field + " must be a " + this.expectedType,
        path: (path ? path + "." : "") + field,
        keyword: "type"
      }];
    }
    return null;
  }
}

export class StringValidator extends TypeValidator {
  constructor() {
    super("string");
  }
}

export class BooleanValidator extends TypeValidator {
  constructor() {
    super("boolean");
  }
}

export class NumberValidator extends TypeValidator {
  constructor() {
    super("number");
  }
}

export class ValueValidator implements IValidator {
  public constructor(private possibleValues: (number | string)[]) {}

  public validate(input: any, path?: string, field?: string): IValidationError[] {
    if (input == null) {
      return null;
    }
    if (this.possibleValues.indexOf(input) < 0) {
      return [{
        message: field + " property is invalid",
        path: (path ? path + "." : "") + field,
        keyword: "invalid"
      }];
    }
    return null;
  }
}

export class SchemaValidator extends ValueValidator {
  public constructor(private schemaValue: string) {
    super([schemaValue]);
  }
  public validate(input: any, path?: string, field?: string): IValidationError[] {
    return super.validate(input, path, field);
  }
}

export class EnumValidator extends NumberValidator {
  public constructor(private possibleValues: number[]) {
    super();
  }

  public validate(input: any, path?: string, field?: string): IValidationError[] {
    if (input == null) {
      return null;
    }
    const errors = super.validate(input, path, field);
    if (errors) {
      return errors;
    }

    const valueValidator = new ValueValidator(this.possibleValues);
    return valueValidator.validate(input, path, field);
  }
}

export class StringArrayValidator extends ArrayValidator {
  constructor() {
    super([new StringValidator()]);
  }

  public validate(input: any, path?: string, field?: string): IValidationError[] {
    const errors = super.validate(input, path, field);
    if (errors) {
      return [{
        message: field + " must be an array of strings",
        path: (path ? path + "." : "") + field,
        keyword: "type"
      }];
    }
    return null;
  }
}

export class BooleanArrayValidator extends ArrayValidator {
  constructor() {
    super([new BooleanValidator()]);
  }

  public validate(input: any, path?: string, field?: string): IValidationError[] {
    const errors = super.validate(input, path, field);
    if (errors) {
      return [{
        message: field + " must be an array of booleans",
        path: (path ? path + "." : "") + field,
        keyword: "type"
      }];
    }
    return null;
  }
}

export class NumberArrayValidator extends ArrayValidator {
  constructor() {
    super([new NumberValidator()]);
  }

  public validate(input: any, path?: string, field?: string): IValidationError[] {
    const errors = super.validate(input, path, field);
    if (errors) {
      return [{
        message: field + " must be an array of numbers",
        path: (path ? path + "." : "") + field,
        keyword: "type"
      }];
    }
    return null;
  }
}
