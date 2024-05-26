// src/db/seeds/user.seeder.ts
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Docente } from 'src/docentes/docentes.entity';

export default class DocenteSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<void> {
        await dataSource.query('TRUNCATE "docente" RESTART IDENTITY;');

        //lista de lineas de investigacion
        const lineasInvestigacion = await dataSource.query('SELECT * FROM "lineasInvestigacion"');

        const repository = dataSource.getRepository(Docente);
        await repository.insert({
            name: 'Héctor',
            lastname: 'Huamán Samaniego',
            email: 'd_1234567891@uncp.edu.pe',
            dni: '34567891',
            grado: 'Dr.',
            lineaInvestigacion: lineasInvestigacion[Math.floor(Math.random() * lineasInvestigacion.length)],
        });

        await repository.insert({
            name: 'Anieval',
            lastname: 'Peña Rojas',
            email: 'd_1234567892@uncp.edu.pe',
            dni: '34567892',
            grado: 'Dr.',
            lineaInvestigacion: lineasInvestigacion[Math.floor(Math.random() * lineasInvestigacion.length)],
        });
        
        await repository.insert({
            name: 'Jesus',
            lastname: 'Ulloa Ninahuaman',
            email: 'd_1234567893@uncp.edu.pe',
            dni: '34567893',
            grado: 'Dr.',
            lineaInvestigacion: lineasInvestigacion[Math.floor(Math.random() * lineasInvestigacion.length)],
        });

        await repository.insert({
            name: 'Jesus',
            lastname: 'Ulloa Ninahuaman',
            email: 'd_1234567893@uncp.edu.pe',
            dni: '34567893',
            grado: 'Dr.',
            lineaInvestigacion: lineasInvestigacion[Math.floor(Math.random() * lineasInvestigacion.length)],
        });

        await repository.insert({
            name: 'Richard',
            lastname: 'Mercado Rivas',
            email: 'd_1234567894@uncp.edu.pe',
            dni: '34567894',
            grado: 'Dr.',
            lineaInvestigacion: lineasInvestigacion[Math.floor(Math.random() * lineasInvestigacion.length)],
        });

        await repository.insert({
            name: 'Miguel',
            lastname: 'Inga Avila',
            email: 'd_1234567895@uncp.edu.pe',
            dni: '34567895',
            grado: 'Mg.',
            lineaInvestigacion: lineasInvestigacion[Math.floor(Math.random() * lineasInvestigacion.length)],
        });

        /* await repository.insert({
            name: 'Saul',
            lastname: 'Arauco Esquivel',
            email: 'd_1234567896@uncp.edu.pe',
            dni: '34567896',
            grado: 'Mg.',
            lineaInvestigacion: lineasInvestigacion[Math.floor(Math.random() * lineasInvestigacion.length)],
        }); */

        await repository.insert({
            name: 'Jhony',
            lastname: 'Huaroc Suarez',
            email: 'd_1234567897@uncp.edu.pe',
            dni: '34567897',
            grado: 'Mg.',
            lineaInvestigacion: lineasInvestigacion[Math.floor(Math.random() * lineasInvestigacion.length)],
        });

        await repository.insert({
            name: 'Marco',
            lastname: 'Taipe Castro',
            email: 'd_1234567898@uncp.edu.pe',
            dni: '34567898',
            grado: 'Dr.',
            lineaInvestigacion: lineasInvestigacion[Math.floor(Math.random() * lineasInvestigacion.length)],
        });

        await repository.insert({
            name: 'Henry',
            lastname: 'Maquera Quispe',
            email: 'd_1234567899@uncp.edu.pe',
            dni: '34567899',
            grado: 'Dr.',
            lineaInvestigacion: lineasInvestigacion[Math.floor(Math.random() * lineasInvestigacion.length)],
        });

        await repository.insert({
            name: 'Nilo',
            lastname: 'Fernnadez Aquino',
            email: 'd_9876543212@uncp.edu.pe',
            dni: '76543212',
            grado: 'Mg.',
            lineaInvestigacion: lineasInvestigacion[Math.floor(Math.random() * lineasInvestigacion.length)],
        });

        await repository.insert({
            name: 'Conny',
            lastname: 'Samaneigo Flores',
            email: 'd_9876543213@uncp.edu.pe',
            dni: '76543213',
            grado: 'Dra.',
            lineaInvestigacion: lineasInvestigacion[Math.floor(Math.random() * lineasInvestigacion.length)],
        });

        await repository.insert({
            name: 'Omar',
            lastname: 'Raraz Tupac Yupanqui',
            email: 'd_9876543214@uncp.edu.pe',
            dni: '76543214',
            grado: 'Mg.',
            lineaInvestigacion: lineasInvestigacion[Math.floor(Math.random() * lineasInvestigacion.length)],
        });

        await repository.insert({
            name: 'José',
            lastname: 'Olivera Meza',
            email: 'd_9876543215@uncp.edu.pe',
            dni: '76543215',
            grado: 'Mg.',
            lineaInvestigacion: lineasInvestigacion[Math.floor(Math.random() * lineasInvestigacion.length)],
        });
        
    }
}
