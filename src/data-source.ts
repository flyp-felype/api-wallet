import "reflect-metadata"
import { DataSource } from "typeorm"
import { Account } from "./entity/Account"
import { Events } from "./entity/Events"
import { Transactions   } from "./entity/Transactions"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "picpay",
    password: "root",
    database: "picpay",
    synchronize: true,
    logging: false,
    entities: [Account, Events, Transactions],
    migrations: [],
    subscribers: [],
})

 