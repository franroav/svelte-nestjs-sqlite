import { HttpStatus, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
export class Utils {
  objectValidationSql(object: any): { isValid: any; message: any; } {
    throw new Error('Method not implemented.');
  }
  dtoValidationErrorMessage(errors: import("class-validator").ValidationError[]) {
    throw new Error('Method not implemented.');
  }

  data_log(
    codigo: number,
    estado: string,
    respuesta: string,
    url: string,
  ) {
    const uuid = uuidv4();
    const body = {
      uuid: uuid,
      statusCode: codigo,
      timestamp: new Date().toDateString(),
      path: url,
      respuesta: respuesta,
      estado: estado,
    };

    if (body.statusCode > 300) {
      return Logger.log(JSON.stringify(body));
    } else {
      return Logger.error(JSON.stringify(body));
    }
  }

}
 