import { AccountProps } from "../../entities/account";
import TransactionsRepository from "../TransactionsRepositoy";

export default class TransactionsRepositoryMemory implements TransactionsRepository {
    setCredit(account: AccountProps, amount: number): AccountProps {
        account.saldo += amount
        account.transactions.push({event:"Credit", amount, type: "C"})
        return account
    }
    setDebit(account: AccountProps, amount: number): AccountProps {
        account.saldo -= amount
        account.transactions.push({event:"Debit", amount, type: "D"})
        return account
    }

}