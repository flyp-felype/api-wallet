import dayjs from "dayjs"
import TransactionHandler from "../../infra/handler/Transaction"
import Publisher from "../../infra/Publisher"
import AccountRepository from "../../infra/repository/AccountRepository"
import TransactionsRepository from "../../infra/repository/TransactionsRepositoy"
export interface AccountProps {
    id?: string,
    name: string
    document: string
    saldo?: number
    transactions?: TransactionsProps[],
    error?: any
}



export type Type = "D" | "C" | 'EC' | 'ED'
interface EventsTransactions {
    id?: string,
    name?: string,
    type: Type,
    createAt?: Date
}
export interface TransactionsProps {
    id?: number,
    events: EventsTransactions,
    amount: number,
    document?: string,
    type: Type,

    createAt?: Date
}

const timeInterval = 60000 //tempo para não permirtir transação duplicadas
export class Account {
    constructor(readonly accountRepository: AccountRepository, readonly transactionsRepository?: TransactionsRepository) {
    }

    async getAccount(document) {
        return await this.accountRepository.get(document)
    }

    async setAccount(account: AccountProps) {
        return await this.accountRepository.save(account)

    }
 

    async setTransaction(document: string, amount: number, event: string, type: Type) {
        try {
            //verifico o ultimo lançamento para saber se é igual ao que estou tentando enviar com um intervalo curto
            let account = await this.accountRepository.get(document)
            
            const transactionLast = account.transactions ? account.transactions[account.transactions.length - 1] : null
    
            if (transactionLast) {
                const dateLastTransaction = dayjs(transactionLast.createAt)
                const dateNow = dayjs(new Date())

                if (dateNow.diff(dateLastTransaction) < timeInterval
                    && transactionLast.events.type === type
                    && Number(transactionLast.amount) === amount
                    && transactionLast.events.name === event
                )
                    throw new Error('Você ja realizou esta transação em menos de 1 min!')
            }

            const publisher = new Publisher(); 

            publisher.register(new TransactionHandler( type, this.accountRepository, this.transactionsRepository))

            publisher.publish({ events: { name: event, type: type }, amount, type: type, document })
            
            account =  this.accountRepository.get(document) 
            
            return account

        }
        catch (error) { 
            console.log(error)
            throw new Error(error)
        }

    }
    
  async  setChargeBack(document: string, transactionID: number, event: string) {
        const publisher = new Publisher();
        const account = await this.accountRepository.get(document)
        console.log(account)
        const transaction = account.transactions.find(x => x.id === transactionID)
        const typeChargeBack = transaction.type === "C" ? "EC" : "ED"

        publisher.register(new TransactionHandler( typeChargeBack, this.accountRepository, this.transactionsRepository))


        publisher.publish({ events: { name: event, type: typeChargeBack }, amount: transaction.amount, type: typeChargeBack, document })

    } 

    async getExtracts(account: AccountProps, limit: number, page: number ){
        const transactions = await this.transactionsRepository.getTransactions(account, limit, page)
         
        return transactions
    }
}