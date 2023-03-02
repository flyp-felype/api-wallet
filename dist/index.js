"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
var options = {
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
        "".concat(__dirname, "/routes/example-route.ts"),
        "./dist/routes/example-route.js",
    ],
};
var swaggerSpec = (0, swagger_jsdoc_1.default)(options);
app.get("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.get('/', function (req, res) {
    res.send('Express  bcdede');
});
app.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at http://localhost:".concat(port));
});
