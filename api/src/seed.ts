// src/seed.ts
import { Sequelize } from 'sequelize-typescript';
import { Fruta } from './frutas/entities/fruta.entity';
import { Variedad } from './variedades/entities/variedade.entity';
import { Agricultor } from './agricultores/entities/agricultore.entity';
import { Campo } from './campos/entities/campo.entity';
import { Cliente } from './clientes/entities/cliente.entity';
import { Cosecha } from './cosechas/entities/cosecha.entity';
import { faker } from '@faker-js/faker';


export async function seedDatabase(sequelize: Sequelize) {
  await sequelize.sync({ force: true }); // Borra y recrea las tablas

  // Crear Frutas y Variedades
  for (let i = 0; i < 10; i++) {
    let variedades = []
    let fruta = await Fruta.create({
      nombre: faker.random.word(),
      variedad: variedades
    });

    for (let j = 0; j < 3; j++) {
    await Variedad.create({
        nombre: faker.random.word(),
        frutaId: fruta.id,
      });
    }
    variedades.push({nombre: faker.random.word(),
      frutaId: fruta.id})
      // console.log("fruta", fruta)
  }

  // Crear Agricultores y Campos
  for (let i = 0; i < 5; i++) {
    const agricultor = await Agricultor.create({
      nombre: faker.name.firstName(),
      email: faker.internet.email(),
    });

    for (let j = 0; j < 2; j++) {
      await Campo.create({
        nombre: faker.address.streetName(),
        ubicacion: faker.address.city(),
        agricultorId: agricultor.id,
      });
    }
  }

  // Crear Clientes
  for (let i = 0; i < 10; i++) {
    await Cliente.create({
      nombre: faker.name.firstName(),
      email: faker.internet.email(),
    });
  }

  // Crear Cosechas
  for (let i = 0; i < 20; i++) {
    await Cosecha.create({
      fecha: faker.date.past(),
      frutaId: faker.datatype.number({ min: 1, max: 10 }),
      campoId: faker.datatype.number({ min: 1, max: 10 }),
      // agricultorId: faker.datatype.number({ min: 1, max: 10 }),
      // variedadeId: faker.datatype.number({ min: 1, max: 10 }),
      // fechaCosecha: faker.date.recent(),
    });
  }
}