import dayjs from "dayjs"
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
    date?: Date
}

const timeInterval = 60000 //tempo para não permirtir transação duplicadas
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
        try {
            //verifico o ultimo lançamento para saber se é igual ao que estou tentando enviar com um intervalo curto
            const account = this.accountRepository.get(document)
            const transactionLast = account.transactions[account.transactions.length - 1]
            if (transactionLast) {
                const dateLastTransaction = dayjs(transactionLast.date)
                const dateNow = dayjs()
                if (dateLastTransaction.diff(dateNow) < timeInterval &&
                    transactionLast.type === 'C' &&
                    transactionLast.amount === amount &&
                    transactionLast.event === "Credit")
                    throw new Error('It is not allowed to send duplicate transaction')
            }

            const publisher = new Publisher();

            publisher.register(new TransactionHandler('C', this.accountRepository, this.transactionsRepository))

            publisher.publish({ event: "Credit", amount, type: "C", document })

            return account

        }
        catch (error) {
            return { success: false, error }
        }

    }
    setChargeBack(document: string, transactionID: number) {
        const publisher = new Publisher();
        const account = this.accountRepository.get(document)

        const transaction = account.transactions.find(x => x.id === transactionID)
        const typeChargeBack = transaction.type === "C" ? "EC" : "ED"
        publisher.register(new TransactionHandler(typeChargeBack, this.accountRepository, this.transactionsRepository))


        publisher.publish({ event: "ChargeBack", amount: transaction.amount, type: typeChargeBack, document })

    }
    setDebit(document: string, amount: number) {
        try {
            const publisher = new Publisher();

            const account = this.accountRepository.get(document)

            if (account.saldo === 0 || account.saldo < amount) throw new Error('Account insufficient funds!')

            const transactionLast = account.transactions[account.transactions.length - 1]
            if (transactionLast) {
                const dateLastTransaction = dayjs(transactionLast.date)
                const dateNow = dayjs()
                if (dateLastTransaction.diff(dateNow) < timeInterval &&
                    transactionLast.type === 'D' &&
                    transactionLast.amount === amount &&
                    transactionLast.event === "Debit")
                    throw new Error('It is not allowed to send duplicate transaction')
            }


            publisher.register(new TransactionHandler('D', this.accountRepository, this.transactionsRepository))
            publisher.publish({ event: "Debit", amount, type: "D", document })

            return account
        }
        catch (error) {
            return { success: false, error }
        }

    }
}