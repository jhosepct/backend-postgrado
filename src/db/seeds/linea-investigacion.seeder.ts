// src/db/seeds/user.seeder.ts
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Docente } from 'src/docentes/docentes.entity';
import { LineaInvestigacion } from 'src/lineas-investigacion/lineas-investigacion.entity';

export default class LineaInvestigacionSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('TRUNCATE "lineasInvestigacion" RESTART IDENTITY');

    const repository = dataSource.getRepository(LineaInvestigacion);
    await repository.insert({
        name: 'Tecnologias de la Informacion'
    });

    await repository.insert({
        name: 'Ingenieria de Software'
    });

    await repository.insert({
        name: 'Inteligencia Artificial'
    });

    await repository.insert({
        name: 'Sistemas Complejos'
    });
  }
}
