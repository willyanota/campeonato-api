import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";

@ValidatorConstraint({ name: "DataStringValidation", async: false })
class DataStringValidation implements ValidatorConstraintInterface {
  validate(value: any) {
    // Verifica se o valor é uma string
    if (typeof value !== "string") {
      return false;
    }

    // Verifica se o valor está no formato 'dd-mm-aaaa'
    const regex = /^\d{2}-\d{2}-\d{4}$/;
    return regex.test(value);
  }
}

export function IsDataString(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: "IsDataString",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: DataStringValidation,
    });
  };
}
