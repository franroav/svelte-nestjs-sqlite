import { Test, TestingModule } from '@nestjs/testing';
import { AgricultoresService } from './agricultores.service';
import { AxiosResponse } from 'axios';
// import { HttpModule, HttpService } from '@nestjs/common';

describe('AgricultoresService', () => {
  let service: AgricultoresService;
  const response: AxiosResponse<any> = {
    data: {},
    headers: {},
    // url: 'http://localhost:3000/mockUrl',
    config: null,
    status: 201,
    statusText: 'OK',
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [
      //   HttpModule.registerAsync({
      //     useFactory: () => ({
      //       timeout: 30000,
      //       maxRedirects: 5,
      //     }),
      //   }),
      // ],
      providers: [AgricultoresService],
    }).compile();

    service = module.get<AgricultoresService>(AgricultoresService);
    // service = await module.resolve<AgricultoresService>(AgricultoresService);
    // httpService = await module.resolve<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  // it('verificar metodo con request es igual a null', async () => {
  //   const request: any = null;
  //   const data: AgricultoresService = [
  //     {
  //       "id": 1,
  //       "nombre": "Casimir",
  //       "email": "Jeff33@yahoo.com",
  //       "createdAt": "2024-05-28T03:29:08.338Z",
  //       "updatedAt": "2024-05-28T03:29:08.338Z"
  //     },
  //     {
  //       "id": 2,
  //       "nombre": "Hosea",
  //       "email": "Erica.Feest8@gmail.com",
  //       "createdAt": "2024-05-28T03:29:08.350Z",
  //       "updatedAt": "2024-05-28T03:29:08.350Z"
  //     },
  //     {
  //       "id": 3,
  //       "nombre": "Lauren",
  //       "email": "Enola84@gmail.com",
  //       "createdAt": "2024-05-28T03:29:08.362Z",
  //       "updatedAt": "2024-05-28T03:29:08.362Z"
  //     },
  //     {
  //       "id": 4,
  //       "nombre": "Warren",
  //       "email": "Jayson26@hotmail.com",
  //       "createdAt": "2024-05-28T03:29:08.374Z",
  //       "updatedAt": "2024-05-28T03:29:08.374Z"
  //     },
  //     {
  //       "id": 5,
  //       "nombre": "Aileen",
  //       "email": "Frederic6@yahoo.com",
  //       "createdAt": "2024-05-28T03:29:08.385Z",
  //       "updatedAt": "2024-05-28T03:29:08.385Z"
  //     }
  //   ];
  //   response.data = data;

  //   jest
  //     .spyOn(httpService, 'post')
  //     .mockImplementationOnce(() => of(response));
  //   jest.spyOn(service, 'ingresarDenuncioAuto');

  //   try {
  //     await service.ingresarDenuncioAuto(request);
  //   } catch (error) {
  //     expect(error).toHaveProperty('message');
  //     expect(error).toHaveProperty('status');
  //     expect(error.message).toBe(
  //       'Solicitud(request) invalido por reglas de negocio',
  //     );
  //     expect(error.status).toBe(400);
  //   }
  // });
});
