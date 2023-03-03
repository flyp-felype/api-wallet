import { AppDataSource } from "../../../data-source";
import { AccountProps, TransactionsProps } from "../../../services/account";
import { Account } from "../../../entity/Account";
import { Events } from "../../../entity/Events";
import { Transactions } from "../../../entity/Transactions";
import TransactionsRepository from "../TransactionsRepositoy";

export default class TransactionsRepositorySQL implements TransactionsRepository {
    transaction: Transactions
    constructor() {
        this.transaction = new Transactions()
    }

    async setTransaction(account: AccountProps, transaction: TransactionsProps) {

        let accountData = await AppDataSource.manager.findOneBy(Account, { document: account.document })

        const events = await AppDataSource.manager.findOneBy(Events, { name: transaction.events.name.toLocaleLowerCase() })

        this.transaction.amount = transaction.amount
        this.transaction.events = events
        this.transaction.account = accountData
        this.transaction.createAt = new Date()
        await AppDataSource.manager.save(this.transaction)

        accountData = await AppDataSource.manager.findOneBy(Account, { document: account.document })

        return accountData
    }

    async getTransactions(account: AccountProps, limit = 10, page = 0) {
  
        const transactionsData = await AppDataSource.getRepository(Transactions)
            .createQueryBuilder('transactions')
            .innerJoinAndSelect('transactions.events', 'events')
            .where('transactions.account = :accountId', { accountId: account.id })
            .orderBy('transactions.createAt', 'DESC')
            .skip(page)
            .limit(limit)
            .getMany()
 
        return transactionsData
    }


}