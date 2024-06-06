// src/db/seeds/user.seeder.ts
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Docente } from 'src/docentes/docentes.entity';
import { LineaInvestigacion } from 'src/lineas-investigacion/lineas-investigacion.entity';
import { Fase } from 'src/fases/fases.entity';

export default class FasesSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    //await dataSource.query('TRUNCATE "lineasInvestigacion" RESTART IDENTITY');


    const repositoryfases = dataSource.getRepository(Fase);
    await repositoryfases.insert({
        name: 'Asignación de asesor',
        fase: 1,
        description: 'Asignación de asesor',
    });

    await repositoryfases.insert({
        name: 'Asignación de revisores',
        fase: 2,
        description: 'Asignación de revisores',
    });
      
    await repositoryfases.insert({
        name: 'Actualizar estado revisores',
        fase: 3,
        description: 'Actualizar estado revisores',
    });
      
    await repositoryfases.insert({
        name: 'Expedito',
        fase: 4,
        description: 'Expedito',
    });
      
    await repositoryfases.insert({
        name: 'fecha de sustentación',
        fase: 5,
        description: 'fecha de sustentación',
    });
  }
}
