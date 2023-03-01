import TransactionHandler from "../../infra/handler/Transaction"
import Publisher from "../../infra/Publisher"
import AccountRepository from "../../infra/repository/AccountRepository"
import TransactionsRepository from "../../infra/repository/TransactionsRepositoy"
export interface AccountProps {
    name: string
    document: string
    saldo?: number
    transactions?: TransactionsProps[]
}

export interface TransactionsProps {
    id?: number,
    event: string,
    amount: number,
    document?: string,
    type: "D" | "C" | 'EC' | 'ED' //D = debito C = credito EC = estorno credito ED estorno debido
}

export class Account {

    constructor(readonly accountRepository: AccountRepository, readonly transactionsRepository: TransactionsRepository) {
    }

    getAccount(document) {
        return this.accountRepository.get(document)
    }

    setAccount(account: AccountProps) {
        this.accountRepository.save(account)
    }

    setCredit(document: string, amount: number) {

        const publisher = new Publisher();
        publisher.register(new TransactionHandler('C', this.accountRepository, this.transactionsRepository))

        publisher.publish({ event: "Credit", amount, type: "C", document })

        return this.accountRepository.get(document)

    }
    setChargeBack(document: string,  transactionID: number) {
        const publisher = new Publisher();
        const account = this.accountRepository.get(document)
         const transaction = account.transactions.find(x => x.id === transactionID)
         const typeChargeBack =   transaction.type === "C" ? "EC" : "ED"
        publisher.register(new TransactionHandler(typeChargeBack, this.accountRepository, this.transactionsRepository))


        publisher.publish({ event: "ChargeBack", amount: transaction.amount, type: typeChargeBack, document })

    }
    setDebit(document: string, amount: number) {
        const publisher = new Publisher();
        publisher.register(new TransactionHandler('D', this.accountRepository, this.transactionsRepository))

        const account = this.accountRepository.get(document)

        if (account.saldo === 0 || account.saldo < amount) throw new Error('Account insufficient funds!')

        publisher.publish({ event: "Debit", amount, type: "D", document })

        return account
    }
}