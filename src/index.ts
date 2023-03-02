import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
 
import { AppDataSource } from './data-source'; 
import AccountController from './controller/AccountController';
dotenv.config();

AppDataSource.initialize().then(() => { console.log('Data source has beem initialized') }).catch(err => console.log('Error during data source', err))

const app: Express = express();
const port = process.env.PORT || 3000;
const options = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "REST API for Swagger Documentation",
            version: "1.0.0",
        },
        schemes: ["http", "https"],
        servers: [{ url: "http://localhost:3000/" }],
    },
    apis: [
        `${__dirname}/routes/example-route.ts`,
        "./dist/routes/example-route.js",
    ],
};

const swaggerSpec = swaggerJSDoc(options);
app.use(cors())
app.use(express.json());
 
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//accounts
app.get('/account/:document', AccountController.get)
app.post('/account', AccountController.create)

app.get('/', (req: Request, res: Response) => {

    return res.redirect("/api-docs");
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

 