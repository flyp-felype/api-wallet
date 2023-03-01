import AccountRepository from "../../repository/AccountRepository"
import { TransactionsProps } from '../transactions'
export interface AccountProps {
    name: string
    document: string
    saldo?: number
    transactions?: TransactionsProps[]
}

export class Account {

    constructor(readonly accountRepository: AccountRepository) {
    }

    getAccount(document) {
        return this.accountRepository.get(document)
    }

    setAccount(account: AccountProps) {
        this.accountRepository.save(account)
    }
}