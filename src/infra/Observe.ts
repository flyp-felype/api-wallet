import { TransactionsProps } from "../entities/account";

 
export default interface Observer {
    operation: string;
    notify(transactions: TransactionsProps): void;
}