import { AccountProps, TransactionsProps } from "../../../entities/account";
import TransactionsRepository from "../TransactionsRepositoy";

export default class TransactionsRepositoryMemory implements TransactionsRepository {
    setCredit(account: AccountProps, transaction: TransactionsProps): AccountProps {
        account.saldo += transaction.amount
        account.transactions.push({id: account.transactions.length + 1, event:transaction.event, amount: transaction.amount, type: transaction.type})
        return account
    }
    setDebit(account: AccountProps, transaction: TransactionsProps): AccountProps {
        account.saldo -= transaction.amount
        account.transactions.push({id: account.transactions.length + 1, event:transaction.event, amount: transaction.amount, type: transaction.type})
        return account
    }

}