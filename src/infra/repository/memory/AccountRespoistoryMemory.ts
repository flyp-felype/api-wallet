import { AccountProps } from "../../../entities/account";
import AccountRepository from "../AccountRepository";

export default class AccountRepositoryMemory implements AccountRepository {

    accounts: AccountProps[]

    constructor() {
        this.accounts = []
    }

    save(account: AccountProps) { 
        account.saldo = 0
        account.transactions = []
        this.accounts.push(account)
        return this.accounts.find(x => x.document === account.document)
    }

    get(accountDocument: string): AccountProps {
        const account = this.accounts.find(x => x.document === accountDocument)
        if (!account) throw new Error("Account not found!")
        return account
    }
}