import { TransactionsProps, Type } from "../../services/account";
import Observer from "../Observe";
import AccountRepository from "../repository/AccountRepository";
import TransactionsRepository from "../repository/TransactionsRepositoy";

export default class TransactionHandler implements Observer {
    operation: Type;
    constructor(operation: Type, readonly accountRepository: AccountRepository, readonly transactionRepository: TransactionsRepository) {
        this.operation = operation
    }
    notify(transactions: TransactionsProps): void {
        const account = this.accountRepository.get(transactions.document)
        this.transactionRepository.setTransaction(account, transactions)
    }

}