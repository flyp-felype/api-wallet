import { TransactionsProps } from "../../entities/account";
import Observer from "../Observe";
import AccountRepository from "../repository/AccountRepository";
import TransactionsRepository from "../repository/TransactionsRepositoy";

export default class TransactionHandler implements Observer {
    operation: string;
    constructor(operation: string, readonly accountRepository: AccountRepository, readonly transactionRepository: TransactionsRepository) {
        this.operation = operation
    }
    notify(transactions: TransactionsProps): void {
        const account = this.accountRepository.get(transactions.document)
        
        switch (transactions.type) {
            case "C":
                this.transactionRepository.setCredit(account, transactions)
                break;
            case "D":
                this.transactionRepository.setDebit(account, transactions)
                break;
            case "ED":
                this.transactionRepository.setCredit(account, transactions)
                break;
            case "EC":
                this.transactionRepository.setDebit(account, transactions)
                break;
            default:
                throw new Error('Type not found')
                break;
        }
    }

}