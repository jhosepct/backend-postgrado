// src/db/seeds/user.seeder.ts
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Docente } from 'src/docentes/docentes.entity';
import { LineaInvestigacion } from 'src/lineas-investigacion/lineas-investigacion.entity';
import { Fase } from 'src/fases/fases.entity';
import { Intento } from 'src/intentos/intentos.entity';

export default class DocenteSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<void> {


        const repositoryLineaInvestigacion1 = dataSource.getRepository(LineaInvestigacion);
        await repositoryLineaInvestigacion1.insert({
            name: 'Tecnologias de la Informacion'
        });

        await repositoryLineaInvestigacion1.insert({
            name: 'Ingenieria de Software'
        });

        await repositoryLineaInvestigacion1.insert({
            name: 'Inteligencia Artificial'
        });

        await repositoryLineaInvestigacion1.insert({
            name: 'Sistemas Complejos'
        });

        //await dataSource.query('TRUNCATE "docentes" RESTART IDENTITY;');

        //lista de lineas de investigacion
        //const lineasInvestigacion = await dataSource.query('SELECT * FROM "lineasInvestigacion"');
        const repositoryLineaInvestigacion = dataSource.getRepository(LineaInvestigacion);

        const lineasInvestigacion = await repositoryLineaInvestigacion.find();
        console.log(lineasInvestigacion);

        const repository = dataSource.getRepository(Docente);
        const lineaInvestigacion: LineaInvestigacion = lineasInvestigacion[Math.floor(Math.random() * lineasInvestigacion.length)];
        await repository.insert({
            name: 'Héctor',
            lastname: 'Huamán Samaniego',
            email: 'd_1234567891@uncp.edu.pe',
            dni: '34567891',
            grado: 'Dr.',
            lineaInvestigacion: lineaInvestigacion,
        });

        const lineaInvestigacion1: LineaInvestigacion = lineasInvestigacion[Math.floor(Math.random() * lineasInvestigacion.length)];

        await repository.insert({
            name: 'Anieval',
            lastname: 'Peña Rojas',
            email: 'd_1234567892@uncp.edu.pe',
            dni: '34567892',
            grado: 'Dr.',
            lineaInvestigacion: lineaInvestigacion1,
        });

        const lineaInvestigacion2: LineaInvestigacion = lineasInvestigacion[Math.floor(Math.random() * lineasInvestigacion.length)];


        await repository.insert({
            name: 'Jesus',
            lastname: 'Ulloa Ninahuaman',
            email: 'd_1234567893@uncp.edu.pe',
            dni: '34567893',
            grado: 'Dr.',
            lineaInvestigacion: lineaInvestigacion2,
        });

        const lineaInvestigacion3: LineaInvestigacion = lineasInvestigacion[Math.floor(Math.random() * lineasInvestigacion.length)];


        await repository.insert({
            name: 'Richard',
            lastname: 'Mercado Rivas',
            email: 'd_1234567894@uncp.edu.pe',
            dni: '34567894',
            grado: 'Dr.',
            lineaInvestigacion: lineaInvestigacion3,
        });

        const lineaInvestigacion4: LineaInvestigacion = lineasInvestigacion[Math.floor(Math.random() * lineasInvestigacion.length)];


        await repository.insert({
            name: 'Miguel',
            lastname: 'Inga Avila',
            email: 'd_1234567895@uncp.edu.pe',
            dni: '34567895',
            grado: 'Mg.',
            lineaInvestigacion: lineaInvestigacion4,
        });

        /* await repository.insert({
            name: 'Saul',
            lastname: 'Arauco Esquivel',
            email: 'd_1234567896@uncp.edu.pe',
            dni: '34567896',
            grado: 'Mg.',
            lineaInvestigacionId: lineaInvestigacion1.id,
        }); */

        const lineaInvestigacion5: LineaInvestigacion = lineasInvestigacion[Math.floor(Math.random() * lineasInvestigacion.length)];

        await repository.insert({
            name: 'Jhony',
            lastname: 'Huaroc Suarez',
            email: 'd_1234567897@uncp.edu.pe',
            dni: '34567897',
            grado: 'Mg.',
            lineaInvestigacion: lineaInvestigacion5,
        });

        const lineaInvestigacion6: LineaInvestigacion = lineasInvestigacion[Math.floor(Math.random() * lineasInvestigacion.length)];


        await repository.insert({
            name: 'Marco',
            lastname: 'Taipe Castro',
            email: 'd_1234567898@uncp.edu.pe',
            dni: '34567898',
            grado: 'Dr.',
            lineaInvestigacion: lineaInvestigacion6,
        });

        const lineaInvestigacion7: LineaInvestigacion = lineasInvestigacion[Math.floor(Math.random() * lineasInvestigacion.length)];


        await repository.insert({
            name: 'Henry',
            lastname: 'Maquera Quispe',
            email: 'd_1234567899@uncp.edu.pe',
            dni: '34567899',
            grado: 'Dr.',
            lineaInvestigacion: lineaInvestigacion7,
        });

        const lineaInvestigacion8: LineaInvestigacion = lineasInvestigacion[Math.floor(Math.random() * lineasInvestigacion.length)];

        await repository.insert({
            name: 'Nilo',
            lastname: 'Fernnadez Aquino',
            email: 'd_9876543212@uncp.edu.pe',
            dni: '76543212',
            grado: 'Mg.',
            lineaInvestigacion: lineaInvestigacion8,
        });

        const lineaInvestigacion9: LineaInvestigacion = lineasInvestigacion[Math.floor(Math.random() * lineasInvestigacion.length)];

        await repository.insert({
            name: 'Conny',
            lastname: 'Samaneigo Flores',
            email: 'd_9876543213@uncp.edu.pe',
            dni: '76543213',
            grado: 'Dra.',
            lineaInvestigacion: lineaInvestigacion9,
        });

        const lineaInvestigacion10: LineaInvestigacion = lineasInvestigacion[Math.floor(Math.random() * lineasInvestigacion.length)];

        await repository.insert({
            name: 'Omar',
            lastname: 'Raraz Tupac Yupanqui',
            email: 'd_9876543214@uncp.edu.pe',
            dni: '76543214',
            grado: 'Mg.',
            lineaInvestigacion: lineaInvestigacion10,
        });

        const lineaInvestigacion11: LineaInvestigacion = lineasInvestigacion[Math.floor(Math.random() * lineasInvestigacion.length)];

        await repository.insert({
            name: 'José',
            lastname: 'Olivera Meza',
            email: 'd_9876543215@uncp.edu.pe',
            dni: '76543215',
            grado: 'Mg.',
            lineaInvestigacion: lineaInvestigacion11,
        });


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
