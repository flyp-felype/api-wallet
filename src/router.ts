import express from "express";
import { accountRouter } from "./routes/account"; 
import { transactionRouter } from "./routes/transactions";

const router = express.Router();

router.use("/account", accountRouter); 
router.use("/transaction", transactionRouter); 

export { router };
