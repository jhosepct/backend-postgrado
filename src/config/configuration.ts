import { registerAs } from '@nestjs/config'

export default registerAs('config', () => {
    return {
        JWT_SECRET: process.env.JWT_SECRET,
        TITLE: process.env.TITLE,
        HOST: process.env.HOST,
        PORT: process.env.PORT,
        DB_HOST: process.env.DB_HOST,
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME,
        DB_PORT: process.env.DB_PORT,
        DATABASE_URL: process.env.DATABASE_URL,
        DATABASE_URL_LOCAL: process.env.DATABASE_URL_LOCAL,
    }
});