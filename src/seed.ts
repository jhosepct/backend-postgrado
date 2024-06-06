import 'dotenv/config';
import { runSeeders } from 'typeorm-extension';
import { dataSource } from './db/seeds/data-source';

const run = async () => {
    try {
        await dataSource.initialize();
        await runSeeders(dataSource);
        console.log('Seeders executed successfully');
    } catch (error) {
        console.error('Error running seeders:', error);
    } finally {
        await dataSource.destroy();
    }
};

run();
