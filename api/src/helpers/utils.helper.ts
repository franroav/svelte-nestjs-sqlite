import { HttpStatus, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
export class Utils {
  objectValidationSql(object: any): { isValid: any; message: any; } {
    throw new Error('Method not implemented.');
  }
  dtoValidationErrorMessage(errors: import("class-validator").ValidationError[]) {
    throw new Error('Method not implemented.');
  }
  public startTime: number;

  initializeTimeLog() {
    this.startTime = Date.now();
  }
  data_log(
    codigo: number,
    estado: string,
    respuesta: string,
    url: string,
  ) {
    const tiempoTranscurrido = Date.now() - this.startTime;
    const uuid = uuidv4();
    const body = {
      uuid: uuid,
      codigo: codigo,
      respuesta: respuesta,
      url: url,
      estado: estado,
      tiempo: tiempoTranscurrido,
      lugar: 'BFF denuncio siniestro auto',
    };

    if (body.codigo > 300) {
      return Logger.log(JSON.stringify(body));
    } else {
      return Logger.error(JSON.stringify(body));
    }
  }

}
 