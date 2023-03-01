import { AccountProps } from "../../entities/account";
import TransactionsRepository from "../TransactionsRepositoy";

export default class TransactionsRepositoryMemory implements TransactionsRepository {
    setCredit(account: AccountProps, amount: number): AccountProps {
        account.saldo += amount
        return account
    }
    setDebit(account: AccountProps, amount: number): AccountProps {
        account.saldo -= amount
        return account
    }

}