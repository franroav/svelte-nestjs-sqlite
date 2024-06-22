import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance, plainToClass } from 'class-transformer';
import { Utils } from '../../helpers/utils.helper';
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    // const object = plainToInstance(metatype, value);
    // validate DTO's errors 
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException(Utils.dtoValidationErrorMessage(errors));
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}