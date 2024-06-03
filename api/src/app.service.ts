import { Injectable, Logger } from '@nestjs/common';
import { AgricultoresService } from './agricultores/agricultores.service';
import { CamposService } from './campos/campos.service';
import { ClientesService } from './clientes/clientes.service';
import { FrutasService } from './frutas/frutas.service';
import { VariedadesService } from './variedades/variedades.service';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly agricultorService: AgricultoresService,
    private readonly clienteService: ClientesService,
    private readonly campoService: CamposService,
    private readonly frutaService: FrutasService,
    private readonly variedadService: VariedadesService,
  ) {}

  async updateFileIntoDb(data: any) {
    if (data.length < 1) return { exitosas: [], rechazadas: [] };

    const successfully = [];
    const rejected = [];

    for (const row of data) {
      const emailAgricultor = row["Mail Agricultor"];
      const nombreAgricultor = row["Nombre Agricultor"];
      const apellidoAgricultor = row["Apellido Agricultor"];
      const emailCliente = row["Mail Cliente"];
      const nombreCliente = row["Nombre Cliente"];
      const apellidoCliente = row["Apellido Cliente"];
      const nombreCampo = row["Nombre Campo"];
      const ubicacionCampo = row["Ubicación de Campo"];
      const frutaCosechada = row["Fruta Cosechada"];
      const variedadCosechada = row["Variedad Cosechada"];

      if (
        !emailAgricultor || !nombreAgricultor || !apellidoAgricultor ||
        !emailCliente || !nombreCliente || !apellidoCliente ||
        !nombreCampo || !ubicacionCampo || !frutaCosechada || !variedadCosechada
      ) {
        this.logger.warn(`Skipping row with empty values: ${JSON.stringify(row)}`);
        continue;
      }

      const promises = [
        this.createAgricultor({ nombre: `${nombreAgricultor} ${apellidoAgricultor}`, email: emailAgricultor }),
        this.createCliente({ nombre: `${nombreCliente} ${apellidoCliente}`, email: emailCliente }),
        this.createCampo({ nombre: nombreCampo, ubicacion: ubicacionCampo }),
        this.createFruta({ nombre: frutaCosechada }),
        this.createVariedad({ nombre: variedadCosechada, fruta: frutaCosechada }),
      ];

      const results: any = await Promise.allSettled(promises);
      let rejectResponseTemplate = {
        code: null,
        message: 'Solicitud rechazada para insertar a base de datos.',
        request: row,
        errors: null
      }

      let successResponseTemplate = {
        code: 200,
        message: 'Información insertada satisfactoriamente.',
        request: row,
        entities: null,
        response: null,
      }

      results.forEach((result, index) => {

        if (result.status === 'rejected') {
          rejectResponseTemplate['code'] = result.reason['status'] || 400
          rejectResponseTemplate['errors'] = result.reason
          rejected.push({
            ...rejectResponseTemplate,
          });
        } else {
          successResponseTemplate['entities'] = result.value.constructor.name;
          successResponseTemplate['response'] = result.value
          successfully.push({
            ...successResponseTemplate
          });
        }

      });

      await new Promise(resolve => setTimeout(resolve, 200));
    }

    return {count:[...successfully, ...rejected].length,  data: successfully, rechazadas: rejected };
  }

  private async createAgricultor(data) {
    try {
      return await this.agricultorService.create(data);
    } catch (error) {
      this.logger.error(`Error creating agricultor: ${JSON.stringify(data)}`, { error: error.message, stack: error.stack });
      throw error;
    }
  }

  private async createCliente(data) {
    try {
      return await this.clienteService.create(data);
    } catch (error) {
      this.logger.error(`Error creating cliente: ${JSON.stringify(data)}`, { error: error.message, stack: error.stack });
      throw error;
    }
  }

  private async createCampo(data) {
    try {
      return await this.campoService.create(data);
    } catch (error) {
      this.logger.error(`Error creating campo: ${JSON.stringify(data)}`, { error: error.message, stack: error.stack });
      throw error;
    }
  }

  private async createFruta(data) {
    try {
      return await this.frutaService.create(data);
    } catch (error) {
      this.logger.error(`Error creating fruta: ${JSON.stringify(data)}`, { error: error.message, stack: error.stack });
      throw error;
    }
  }

  private async createVariedad(data) {
    try {
      return await this.variedadService.create(data);
    } catch (error) {
      this.logger.error(`Error creating variedad: ${JSON.stringify(data)}`, { error: error.message, stack: error.stack });
      throw error;
    }
  }
}
