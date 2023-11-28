import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidatorOptions,
  registerDecorator,
} from "class-validator";
import { AppDataSource } from "@database/data-source";

@ValidatorConstraint({ async: true })
export class IsValidIdConstraint implements ValidatorConstraintInterface {
  public defaultMessage(): string {
    return `$property does not exist`;
  }

  async validate<T>(value: T, args: ValidationArguments): Promise<boolean> {
    const [entity, field] = args.constraints;

    const repository = AppDataSource.getRepository(entity);

    const count = await repository.count({ where: { [field]: value } });

    return count === 1;
  }
}

export function IsValid<T>(
  entity: T,
  field: string,
  validationOptions?: ValidatorOptions,
) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity, field],
      validator: IsValidIdConstraint,
    });
  };
}
