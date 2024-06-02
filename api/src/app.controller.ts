import { Controller, Get, Query } from '@nestjs/common';
import * as fs from 'fs';
import { createReadStream } from 'fs';
import { CsvParser } from 'nest-csv-parser';
import { Readable } from 'stream';
import { AppService } from './app.service';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}

@Controller('carga')
export class UploadController {
  constructor(
    private readonly appService: AppService,
    private readonly csvParser: CsvParser
  ) {}

  @Get('import')
  @ApiOperation({ summary: 'Ingresar ruta de documento csv' })
  @ApiQuery({ name: 'csvPath', type: String, required: true, example: "./uploads/csv/cosechas.csv" })
  async import(@Query('csvPath') csvPath: string) {
    
    console.log("CSV Path => ", csvPath);

    if (!csvPath) {
      return { message: 'CSV file path is required' };
    }

    if (!fs.existsSync(csvPath)) {
      console.error("CSV file not found:", csvPath);
      return { message: 'CSV file not found' };
    }

    const stream = createReadStream(csvPath);

    try {
      const headers = await this.getCsvHeaders(stream);
      const GenericDto = this.generateDto(headers);

      // Reset the stream to start from the beginning
      stream.close();
      const resetStream = createReadStream(csvPath);
      console.log("resetStream ", resetStream);
      const entities = await this.csvParser.parse(resetStream, GenericDto);
      console.log("Parsed Entities =>", entities.list);
      // this.appService.updateFileIntoDb(entities.list);
      return this.appService.updateFileIntoDb(entities.list);
    } catch (error) {
      console.error("Error parsing CSV file:", error);
      return { message: 'Error parsing CSV file', error };
    }
  }

  private async getCsvHeaders(stream: Readable): Promise<string[]> {
    return new Promise((resolve, reject) => {
      let headers: string[] = [];
      stream
        .on('data', (chunk) => {
          const lines = chunk.toString().split('\n');
          if (lines.length > 0) {
            headers = lines[0].split(',').map(header => header.trim());
            stream.destroy();
            resolve(headers);
          }
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  private generateDto(headers: string[]) {
    class GenericDto {}
    headers.forEach((header) => {
      GenericDto.prototype[header] = undefined;
    });
    return GenericDto;
  }
}