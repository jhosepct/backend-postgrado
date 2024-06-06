// src/db/seeds/user.seeder.ts
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Docente } from 'src/docentes/docentes.entity';
import { LineaInvestigacion } from 'src/lineas-investigacion/lineas-investigacion.entity';
import { Fase } from 'src/fases/fases.entity';
import { Intento } from 'src/intentos/intentos.entity';

export default class IntentosSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    //await dataSource.query('TRUNCATE "lineasInvestigacion" RESTART IDENTITY');


      const repositoryIntentos = dataSource.getRepository(Intento);
      
      await repositoryIntentos.insert({
        number: 1
      });

      await repositoryIntentos.insert({
        number: 2
      });

      await repositoryIntentos.insert({
        number: 3
      });
    
  }
}
