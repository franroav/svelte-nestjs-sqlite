import { Injectable } from "@nestjs/common";
import { AtributoLogEntity } from '../entities/atributo-log.entity';
import { v4 as uuidv4 } from 'uuid';
 
@Injectable()
export class TransactionLogsService {

  generateUUID(): string {
    return uuidv4();
  }

  getTime(fecha1:any, fecha2: any = Date.now()): string {
    const date = new Date(fecha2-fecha1);
    const horas = date.getUTCHours();
    const minutos = date.getUTCMinutes();
    const segundo = date.getUTCSeconds();
    const milisegundo = date.getUTCMilliseconds();
    return `${horas}.${minutos}.${segundo}.${milisegundo}`;
  }

  transactionLogs(atributosLogs: AtributoLogEntity): void {
   
    const transactionLogs = {
      'uuid': atributosLogs.uuid,
      'codigo': atributosLogs.codigo,
      'titulo': atributosLogs.titulo,
      'respuesta': atributosLogs.respuesta,
      'url': atributosLogs.url,
      'estado': atributosLogs.estado,
      'tiempo': this.getTime(atributosLogs.inicio),
      'lugar': atributosLogs.lugar,
      'metadata': atributosLogs.metadata,
      'response': atributosLogs.response
    };

    console.log(JSON.stringify(transactionLogs));
  }
}
