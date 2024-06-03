import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tesis } from './tesis.entity';
import { Acta } from './acta.entity';
import { CreateFaseUnoDto } from './dto/create-fase-uno.dto';
import { User } from 'src/users/users.entity';
import { Document } from 'src/documents/documents.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateFaseDosDto } from './dto/create-fase-dos.dto';
import { Asesor } from 'src/asesores/asesores.entity';
import { Docente } from 'src/docentes/docentes.entity';
import { Fase } from 'src/fases/fases.entity';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { CreateFaseTresDto } from './dto/create-fase-tres.dto';
import { Revisor } from 'src/revisores/revisores.entity';
import { TesisToRevisores } from 'src/revisores/tesisToRevisores.entity';
import * as nodemailer from 'nodemailer';
import { CreateFaseCuartoDto } from './dto/create-fase-cuarto.dto';
import { Expedito } from 'src/expeditos/expeditos.entity';
import { CreateSupportDateDto } from './dto/create-support-date.dto';
import { Sustentacion } from 'src/sustentaciones/sustentaciones.entity';
import { Intento } from 'src/intentos/intentos.entity';

@Injectable()
export class TesisService {
    constructor(
        @InjectRepository(Tesis) private tesisRepository: Repository<Tesis>,
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Document) private documentsRepository: Repository<Document>,
        @InjectRepository(Asesor) private asesoresRepository: Repository<Asesor>,
        @InjectRepository(Docente) private docentesRepository: Repository<Docente>,
        @InjectRepository(Fase) private fasesRepository: Repository<Fase>,
        @InjectRepository(Revisor) private revisorRepository: Repository<Revisor>,
        @InjectRepository(TesisToRevisores) private tesisToRevisorRepository: Repository<TesisToRevisores>,
        @InjectRepository(Expedito) private expeditoRepository: Repository<Expedito>,
        @InjectRepository(Sustentacion) private sustentacionRepository: Repository<Sustentacion>,
        @InjectRepository(Intento) private intentosRepository: Repository<Intento>,
        @InjectRepository(Acta) private actaRepository: Repository<Acta>,



    ) { }

    async createFaseUno(userData: CreateUserDto, file: Express.Multer.File) {
        const userCreate = this.usersRepository.create(userData);
        const user = await this.usersRepository.save(userCreate);

        const fase = await this.fasesRepository.findOneBy({ fase: 1 });

        const bucket = 'postgrado-uncp';
        const carpetaInternaBucket = `documents/tesis/${user.id}/document`;
        const miRegion = 'us-east-2';

        const s3 = new S3Client({
            region: miRegion,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });

        const params = {
            Bucket: bucket,
            Key: carpetaInternaBucket,
            Body: file.buffer,
            ContentType: 'application/pdf',
        };

        // Subir el archivo PDF a S3
        const command = new PutObjectCommand(params);
        await s3.send(command);

        const urlFile = `https://${bucket}.s3.${miRegion}.amazonaws.com/${carpetaInternaBucket}`;

        const document = this.documentsRepository.create({
            urlFile: urlFile,
        });
        await this.documentsRepository.save(document);

        const tesisCreate = this.tesisRepository.create({
            user: user,
            fase: fase,
            document: document,
        });

        const tesisSave = await this.tesisRepository.save(tesisCreate);

        return tesisSave;
    }

    async createSecondTwo(body: CreateFaseDosDto) {
        const tesis = await this.tesisRepository.findOne({ where: { user: { id: body.userId } } });

        if (!tesis) throw new HttpException('Tesis or User not found', HttpStatus.NOT_FOUND);

        const docente = await this.docentesRepository.findOne({ where: { id: body.docenteId } });

        if (!docente) throw new HttpException('Docente not found', HttpStatus.NOT_FOUND);

        const asesor = this.asesoresRepository.create({
            docente: docente,
        })

        const fase = await this.fasesRepository.findOneBy({ fase: 2 });

        const asesorSave = await this.asesoresRepository.save(asesor);

        tesis.asesor = asesorSave;
        tesis.fase = fase;

        return this.tesisRepository.save(tesis);

    }

    async createThirdPhase(body: CreateFaseTresDto, file: Express.Multer.File) {

        const tesis = await this.tesisRepository.findOne({ where: { user: { id: body.userId } } });

        if (!tesis) throw new HttpException('Tesis or User not found', HttpStatus.NOT_FOUND);

        const docente1 = await this.docentesRepository.findOne({ where: { id: body.docentId1 } });

        if (!docente1) throw new HttpException('Docente not found', HttpStatus.NOT_FOUND);

        const docente2 = await this.docentesRepository.findOne({ where: { id: body.docentId2 } });

        if (!docente2) throw new HttpException('Docente not found', HttpStatus.NOT_FOUND);

        const docente3 = await this.docentesRepository.findOne({ where: { id: body.docentId3 } });

        if (!docente3) throw new HttpException('Docente not found', HttpStatus.NOT_FOUND);

        const revisor1 = this.revisorRepository.create({ docente: docente1 });
        const revisor2 = this.revisorRepository.create({ docente: docente2 });
        const revisor3 = this.revisorRepository.create({ docente: docente3 });

        //save revisores

        const revisor1Save = await this.revisorRepository.save(revisor1);
        const revisor2Save = await this.revisorRepository.save(revisor2);
        const revisor3Save = await this.revisorRepository.save(revisor3);

        const revisorToRevisor1 = this.tesisToRevisorRepository.create({
            tesisId: tesis.id,
            revisor: revisor1Save
        });

        const revisorToRevisor2 = this.tesisToRevisorRepository.create({
            tesisId: tesis.id,
            revisor: revisor2Save,
        });

        const revisorToRevisor3 = this.tesisToRevisorRepository.create({
            tesisId: tesis.id,
            revisor: revisor3Save,
        });

        await this.tesisToRevisorRepository.save(revisorToRevisor1);
        await this.tesisToRevisorRepository.save(revisorToRevisor2);
        await this.tesisToRevisorRepository.save(revisorToRevisor3);


        // Actualizar su pdf de la tesis
        const user = await this.usersRepository.findOne({ where: { id: body.userId } });

        const bucket = 'postgrado-uncp';
        const carpetaInternaBucket = `documents/tesis/${user.id}/document`;
        const miRegion = 'us-east-2';

        const s3 = new S3Client({
            region: miRegion,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });

        const params = {
            Bucket: bucket,
            Key: carpetaInternaBucket,
            Body: file.buffer,
            ContentType: 'application/pdf',
        };

        // Subir el archivo PDF a S3
        const command = new PutObjectCommand(params);
        await s3.send(command);


        // Actualizamos la fase
        const fase = await this.fasesRepository.findOneBy({ fase: 3 });

        tesis.fase = fase;

        // Enviamos mensajes para cada uno de los docentes con el documento: 
        const transporter = nodemailer.createTransport({
            host: process.env.AWS_EMAIL_HOST,
            port: process.env.AWS_EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.AWS_EMAIL_USER,
                pass: process.env.AWS_EMAIL_PASS,
            },
        } as nodemailer.TransportOptions);

        const emailContent = `
        <p>Estimados docentes,</p>
        <p>Les envío adjunto el borrador de la tesis para su revisión y comentarios.</p>
        <p>Agradezco de antemano su tiempo y atención a este documento. Cualquier observación o sugerencia será muy valorada.</p>
        <p>Quedo atento a sus comentarios.</p>
        <p>Saludos cordiales,</p>
        <p>${user.name} ${user.lastName}</p>
    `;

        try {
            const info = await transporter.sendMail({
                from: process.env.AWS_EMAIL_SENDER,
                to: `${docente1.email},${docente2.email},${docente3.email}`,
                subject: `<strong>Postgrado UNCP</strong> Borrador de tesis de estudiante - ${user.name}`, // Subject line
                text: "Hello world?", // plain text body
                html: emailContent,
                attachments: [
                    {
                        filename: file.originalname,
                        content: file.buffer,
                        contentType: file.mimetype
                    }
                ]
            });
            console.log(info);
        } catch (e) {
            console.log(e);
        }

        return this.tesisRepository.save(tesis);
    }

    async createFourthPhase(userId: number, phaseFourthdArray: CreateFaseCuartoDto[]) {
        const tesis = await this.tesisRepository.findOne({ where: { user: { id: userId } } });

        if (!tesis) throw new HttpException('Tesis or User not found', HttpStatus.NOT_FOUND);

        const fase = await this.fasesRepository.findOneBy({ fase: 4 });

        tesis.fase = fase;

        const user = await this.usersRepository.findOne({ where: { id: userId } });

        const bucket = 'postgrado-uncp';
        const miRegion = 'us-east-2';

        const s3 = new S3Client({
            region: miRegion,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });

        const urlFiles = [];

        // Subida de archivos de los revisores
        phaseFourthdArray.forEach(async (element) => {
            const carpetaInternaBucket = `documents/tesis/${user.id}/reviewers/${element.docentId}`;

            const params = {
                Bucket: bucket,
                Key: carpetaInternaBucket,
                Body: element.file.buffer,
                ContentType: 'application/pdf',
            };

            // Subir el archivo PDF a S3
            const command = new PutObjectCommand(params);
            await s3.send(command);

            const urlFile = `https://${bucket}.s3.${miRegion}.amazonaws.com/${carpetaInternaBucket}`;
            urlFiles.push(urlFile);
        });

        const tesisRevisores = await this.tesisToRevisorRepository.find({
            where: { tesisId: tesis.id },
        });

        tesisRevisores.forEach(async (tesiToRevisor, index) => {
            const document = this.documentsRepository.create({
                urlFile: urlFiles[index],
            });
            const documentSave = await this.documentsRepository.save(document);
            tesiToRevisor.document = documentSave;
            this.tesisToRevisorRepository.save(tesiToRevisor);
        });

        //Envio de correo al usuario
        const transporter = nodemailer.createTransport({
            host: process.env.AWS_EMAIL_HOST,
            port: parseInt(process.env.AWS_EMAIL_PORT, 10),
            secure: false,
            auth: {
                user: process.env.AWS_EMAIL_USER,
                pass: process.env.AWS_EMAIL_PASS,
            },
        } as nodemailer.TransportOptions);

        const emailContent = `
        <p>Estimado ${user.name} ${user.lastName},</p>
        <p>Le envió el adjunto la revisión de los revisores</p>`;

        try {
            const info = await transporter.sendMail({
                from: process.env.AWS_EMAIL_SENDER,
                to: `${user.email}`,
                subject: "<strong>Postgrado UNCP</strong> Revisión de los revisores",
                text: "<strong>Postgrado UNCP</strong>",
                html: emailContent,
                attachments:
                    phaseFourthdArray.map((element) => {
                        return {
                            filename: element.file.originalname,
                            content: element.file.buffer,
                            contentType: element.file.mimetype
                        }
                    })
            });
            console.log(info);
        } catch (e) {
            console.log(e);
        }

        return this.tesisRepository.save(tesis);

    }

    async createFifthPhase(userId: number, file: Express.Multer.File) {
        const tesis = await this.tesisRepository.findOne({ where: { user: { id: userId } } });

        if (!tesis) throw new HttpException('Tesis or User not found', HttpStatus.NOT_FOUND);

        const fase = await this.fasesRepository.findOneBy({ fase: 5 });

        tesis.fase = fase;

        const user = await this.usersRepository.findOne({ where: { id: userId } });

        const bucket = 'postgrado-uncp';
        const miRegion = 'us-east-2';

        const s3 = new S3Client({
            region: miRegion,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });

        const carpetaInternaBucket = `documents/tesis/${user.id}/expedito`;

        const params = {
            Bucket: bucket,
            Key: carpetaInternaBucket,
            Body: file.buffer,
            ContentType: 'application/pdf',
        };

        // Subir el archivo PDF a S3
        const command = new PutObjectCommand(params);
        await s3.send(command);

        const urlFile = `https://${bucket}.s3.${miRegion}.amazonaws.com/${carpetaInternaBucket}`;

        const document = this.documentsRepository.create({
            urlFile: urlFile,
        });
        await this.documentsRepository.save(document);

        const date = new Date();

        const expedito = this.expeditoRepository.create({
            document: document,
            issueDate: date,
        });

        const expeditoSave = await this.expeditoRepository.save(expedito);
        tesis.expedito = expeditoSave;

        //actualizar la fase
        const faseUpdate = await this.fasesRepository.findOneBy({ fase: 5 });
        tesis.fase = faseUpdate;


        return this.tesisRepository.save(tesis);
    }

    async sendMessage() {
        const transporter = nodemailer.createTransport({
            host: process.env.AWS_EMAIL_HOST,
            port: parseInt(process.env.AWS_EMAIL_PORT, 10),
            secure: false,
            auth: {
                user: process.env.AWS_EMAIL_USER,
                pass: process.env.AWS_EMAIL_PASS,
            },
        } as nodemailer.TransportOptions);

        try {
            const info = await transporter.sendMail({
                from: process.env.AWS_EMAIL_SENDER, // sender address
                to: "e_2019200649G@uncp.edu.pe, kevinjhosepct@gmail.com", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>", // html body
            });
            return info;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async createSupportDate(body: CreateSupportDateDto, file: Express.Multer.File) {
        const tesis = await this.tesisRepository.findOne({ where: { user: { id: body.userId } }, relations: ["expedito"] });

        if (!tesis) throw new HttpException('Tesis or User not found', HttpStatus.NOT_FOUND);
        tesis.isFaseCompleted = true;

        const tesisSave = await this.tesisRepository.save(tesis);

        const intento = await this.intentosRepository.findOne({ where: { number: 1 } });

        const bucket = 'postgrado-uncp';
        const miRegion = 'us-east-2';

        const s3 = new S3Client({
            region: miRegion,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });

        const carpetaInternaBucket = `documents/tesis/${body.userId}/resolucion`;

        const params = {
            Bucket: bucket,
            Key: carpetaInternaBucket,
            Body: file.buffer,
            ContentType: 'application/pdf',
        };

        // Subir el archivo PDF a S3
        const command = new PutObjectCommand(params);
        await s3.send(command);

        const urlFile = `https://${bucket}.s3.${miRegion}.amazonaws.com/${carpetaInternaBucket}`;

        const document = this.documentsRepository.create({
            urlFile: urlFile,
        });

        const documentSave = await this.documentsRepository.save(document);

        const sustentacion = this.sustentacionRepository.create({
            tesis: tesisSave,
            intento: intento,
            place: body.place,
            date: body.date,
            document: documentSave,
        });

        await this.sustentacionRepository.save(sustentacion);


        return this.tesisRepository.save(tesisSave);
        /* const fase = await this.fasesRepository.findOneBy({ fase: 5 });

        tesis.fase = fase;

        return this.tesisRepository.save(tesis); */
    }

    async createActa(userId: number, file: Express.Multer.File) {
        const tesis = await this.tesisRepository.findOne({ where: { user: { id: userId } } , relations: ["susentacion"]});

        if (!tesis) throw new HttpException('Tesis or User not found', HttpStatus.NOT_FOUND);

        const user = await this.usersRepository.findOne({ where: { id: userId } });

        const bucket = 'postgrado-uncp';
        const miRegion = 'us-east-2';

        const s3 = new S3Client({
            region: miRegion,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });

        const carpetaInternaBucket = `documents/tesis/${user.id}/acta`;

        const params = {
            Bucket: bucket,
            Key: carpetaInternaBucket,
            Body: file.buffer,
            ContentType: 'application/pdf',
        };

        // Subir el archivo PDF a S3
        const command = new PutObjectCommand(params);
        await s3.send(command);

        const urlFile = `https://${bucket}.s3.${miRegion}.amazonaws.com/${carpetaInternaBucket}`;

        const document = this.documentsRepository.create({
            urlFile: urlFile,
        });

        const documentSave = await this.documentsRepository.save(document);

        const acta = this.actaRepository.create({
            document: documentSave,
        });

        const actaSave = await this.actaRepository.save(acta);

        tesis.acta = actaSave;

        // Actualizamos la sustentacion
        const sustentacion = await this.sustentacionRepository.findOne({ where: { tesis: { id: tesis.id } } });

        sustentacion.approval = true;

        await this.sustentacionRepository.save(sustentacion);

        // Envio de correo al usuario

        const transporter = nodemailer.createTransport({
            host: process.env.AWS_EMAIL_HOST,
            port: parseInt(process.env.AWS_EMAIL_PORT, 10),
            secure: false,
            auth: {
                user: process.env.AWS_EMAIL_USER,
                pass: process.env.AWS_EMAIL_PASS,
            },
        } as nodemailer.TransportOptions);

        const emailContent = `
        <p>Estimado ${user.name} ${user.lastName},</p>
        <p>Le envío el adjunto el acta de sustentación</p>`;

        try {
            const info = await transporter.sendMail({
                from: process.env.AWS_EMAIL_SENDER,
                to: `${user.email}`,
                subject: "<strong>Postgrado UNCP</strong> Acta de sustentación",
                text: "<strong>Postgrado UNCP</strong>",
                html: emailContent,
                attachments: [
                    {
                        filename: file.originalname,
                        content: file.buffer,
                        contentType: file.mimetype
                    }
                ]
            });
            console.log(info);
        } catch (e) {
            console.log(e);
        }

        return this.tesisRepository.save(tesis);
    }


    async getReviewersByUserId(id: number) {

        const tesis = await this.tesisRepository.findOne({ where: { user: { id: id } } });

        if (!tesis) throw new HttpException('Tesis or User not found', HttpStatus.NOT_FOUND);

        const tesisRevisores = await this.tesisToRevisorRepository.find({
            where: { tesisId: tesis.id },
            relations: ["revisor", "revisor.docente"],
        });

        const response = tesisRevisores.map(tesiToRevisor => {
            const docente = tesiToRevisor.revisor.docente;
            return {
                id: docente.id,
                name: docente.name,
                lastname: docente.lastname,
                email: docente.email,
                dni: docente.dni,
                grado: docente.grado,
            };
        });

        return response;
    }

    async getTesis() {
        const tesis = await this.tesisRepository.find({ relations: ["user", "asesor", "asesor.docente", "asesor.docente.lineaInvestigacion", "asesor.docente.periodo", "asesor.docente.jurados", "asesor.docente.asesores", "asesor.docente.revisores"] });

        console.log(tesis);

        const response = tesis.map((tesi) => {
            return tesi.ToJSON();
        });

        return tesis;
    }

    async createFaseUnoWithIdUser(data: any, id: number) {
        const user = await this.usersRepository.findOne({ where: { id } });

        const tesisCreate = this.tesisRepository.create({
            user: user,
        });
        const tesis = await this.tesisRepository.save(tesisCreate);

        const document = this.documentsRepository.create({
            //tesis: tesis,
            urlFile: data.file.name,
        });
        await this.documentsRepository.save(document);
        return this.tesisRepository.save(tesis);
    }

    async getTesisByUser(id: number) {
        const tesis = await this.tesisRepository.findOne({
            where: { user: { id: id } }, relations: {
                user: true,
                asesor: true,
                expedito: true,
                fase: true,
            }
        });

        if (!tesis) throw new HttpException('Tesis or User not found', HttpStatus.NOT_FOUND);

        return tesis;

    }
}
