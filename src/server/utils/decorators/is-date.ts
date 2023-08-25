import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  ValidateBy,
} from 'class-validator';
import { DateManager } from 'src/shared/utils/date-manager';

@ValidatorConstraint({ name: 'IsDate', async: false })
export class IsDate implements ValidatorConstraintInterface {
  validate(date: string, args: ValidationArguments) {
    return DateManager.IS_DATE(date);
  }
}

export const IsDateAfter = (
  property: string,
  options?: ValidationOptions,
): PropertyDecorator =>
  ValidateBy(
    {
      name: 'IsDateAfter',
      constraints: [property],
      validator: {
        validate: (value: string, args: ValidationArguments): boolean => {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as Record<string, unknown>)[
            relatedPropertyName
          ] as string;
          return DateManager.IS_DATE_AFTER(value, relatedValue);
        },
      },
    },
    options,
  );

export const IsDateBefore = (
  property: string,
  options?: ValidationOptions,
): PropertyDecorator =>
  ValidateBy(
    {
      name: 'IsDateBefore',
      constraints: [property],
      validator: {
        validate: (value: string, args: ValidationArguments): boolean => {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as Record<string, unknown>)[
            relatedPropertyName
          ] as string;
          return DateManager.IS_DATE_BEFORE(value, relatedValue);
        },
      },
    },
    options,
  );
