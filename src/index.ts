import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
 
import { AppDataSource } from './data-source';  
import { router } from './router';
import swagerDocs from './documentation/swagger.json'
dotenv.config();

AppDataSource.initialize().then(() => { console.log('Data source has beem initialized') }).catch(err => console.log('Error during data source', err))

const app: Express = express();
const port = process.env.PORT || 3000;
const options = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "REST API PicPay Documentation",
            version: "1.0.0",
        },
        schemes: ["http", "https"],
        servers: [{ url: "http://localhost:3000/" }],
    },
    apis: [
        `${__dirname}/routes/account.ts`,
        "./dist/routes/account.js",
    ],
};
 

app.use(cors())
app.use(express.json());
 
app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagerDocs));
 
app.get('/', (req: Request, res: Response) => {

    return res.redirect("/api-docs");
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

 