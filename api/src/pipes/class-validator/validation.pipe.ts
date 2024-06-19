import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { Utils } from '../../helpers/utils.helper';
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    let valid: boolean = true; 
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    // console.log("object", object)
    // console.log("errors", errors)
    // validate DTO's errors 
    const utils = new Utils();
    if (errors.length > 0) {
      const message: any = utils.dtoValidationErrorMessage(errors);
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
      //throw new BadRequestException(message);
    }
    // validate if string property value are sql injection
    // const {isValid, message} = utils.objectValidationSql(object);

    // valid = isValid
    // if (!valid) {
    //   throw new HttpException(message, HttpStatus.BAD_REQUEST);
    // }
    return value;
  }

  private toValidate(metatype): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}