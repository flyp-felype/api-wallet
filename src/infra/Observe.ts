import { TransactionsProps, Type } from "../entities/account";

 
export default interface Observer {
    operation: Type;
    notify(transactions: TransactionsProps): void;
}