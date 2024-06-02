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
    if (data.length < 1) return [];

    const results = [];
    const successfully = []
    const rejected = []

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

      try {
        const result = await Promise.all([
          this.createAgricultor({ nombre: `${nombreAgricultor} ${apellidoAgricultor}`, email: emailAgricultor }),
          this.createCliente({ nombre: `${nombreCliente} ${apellidoCliente}`, email: emailCliente }),
          this.createCampo({ nombre: nombreCampo, ubicacion: ubicacionCampo }),
          this.createFruta({ nombre: frutaCosechada }),
          this.createVariedad({ nombre: variedadCosechada }),
        ]);

        this.logger.log('Entities created successfully', JSON.stringify(result));
        results.push(result);
        successfully.push(result);
      } catch (error) {
        this.logger.error('Error creating entities', { row, error: error.message, stack: error.stack });
        results.push({ error: 'Error creating entities', details: error.message });
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return results;
  }

  private async createAgricultor(data) {
    const request = JSON.stringify(data);
    try {
      const result = await this.agricultorService.create(data);
      return result;
    } catch (error) {
      this.logger.error(`Error creating agricultor: ${request}`, { data, error: error.message, stack: error.stack });
      throw error;
    }
  }

  private async createCliente(data) {
    const request = JSON.stringify(data);
    try {
      const result = await this.clienteService.create(data);
      return result;
    } catch (error) {
      this.logger.error(`Error creating cliente: ${request}`, { data, error: error.message, stack: error.stack });
      throw error;
    }
  }

  private async createCampo(data) {
    const request = JSON.stringify(data);
    try {
      const result = await this.campoService.create(data);
      return result;
    } catch (error) {
      this.logger.error(`Error creating campo: ${request}`, { data, error: error.message, stack: error.stack });
      throw error;
    }
  }

  private async createFruta(data) {
    const request = JSON.stringify(data);
    try {
      const result = await this.frutaService.create(data);
      return result;
    } catch (error) {
      this.logger.error(`Error creating fruta: ${request}`, { data, error: error.message, stack: error.stack });
      throw error;
    }
  }

  private async createVariedad(data) {
    const request = JSON.stringify(data);
    try {
      const result = await this.variedadService.create(data);
      return result;
    } catch (error) {
      this.logger.error(`Error creating variedad: ${request}`, { data, error: error.message, stack: error.stack });
      throw error;
    }
  }
}
