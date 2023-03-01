import AccountRepository from "../../repository/AccountRepository"

export interface AccountProps {
    name: string
    document: string
    saldo?: number
    transactions?: any[]
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