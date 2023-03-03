import { AccountProps, TransactionsProps } from "../../../services/account";
import TransactionsRepository from "../TransactionsRepositoy";

export default class TransactionsRepositoryMemory implements TransactionsRepository {

    getTransactions(account: AccountProps, limit: number, page: number) {
            return account.transactions.splice(page, limit)
    }
    setTransaction(account: AccountProps, transaction: TransactionsProps): AccountProps {
       
        account.saldo = transaction.type === "C" || transaction.type === "ED" ? account.saldo = account.saldo + transaction.amount : account.saldo = account.saldo - transaction.amount
        account.transactions.push({
                id: account.transactions.length + 1,
                amount: transaction.amount,
                events: { type: transaction.type, name: '' },
                type: transaction.type,
                createAt: new Date()

        })
        return account
    }


}