import { TransactionsProps, Type } from "../services/account";

 
export default interface Observer {
    operation: Type;
    notify(transactions: TransactionsProps): void;
}