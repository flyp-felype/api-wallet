import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import bodyParser from "body-parser";
dotenv.config();

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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(bodyParser.json());
app.get('/', (req: Request, res: Response) => {
  res.send('Express  bcdede');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});