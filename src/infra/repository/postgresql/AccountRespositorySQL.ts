import { AppDataSource } from "../../../data-source";
import { AccountProps } from "../../../services/account";
import { Account } from "../../../entity/Account";
import AccountRepository from "../AccountRepository";

export default class AccountRepositorySQL implements AccountRepository {
    accountModel: Account
    constructor() {
        this.accountModel = new Account()
    }
    async save(account: AccountProps) {
        try {

            this.accountModel.name = account.name;
            this.accountModel.document = account.document;
            this.accountModel.createAt = new Date();

            const accountCreate = await AppDataSource.manager.save(this.accountModel)
            return accountCreate
        } catch (error) {
            // const accountError: AccountProps =  { name: '', document: '', error: error?.driverError.detail }
            return { error: error?.driverError.detail }
        }

    }
    async get(accountDocument: string) {
        try {

            const accountData = await AppDataSource
                .getRepository(Account)
                .createQueryBuilder('account')
                .leftJoinAndSelect('account.transactions', 'transactions')
                .innerJoinAndSelect('transactions.events', 'events')
                .where('account.document = :document', { document: accountDocument }).getOne()

            const account: any = accountData

            if (account) {
                account.saldo = 0
                for (let index = 0; index < accountData?.transactions.length; index++) {
                    const transaction = accountData?.transactions[index];

                    if (transaction.events.type === 'C') account.saldo = Number(account.saldo) + Number(transaction.amount)

                    if (transaction.events.type === 'D') account.saldo = Number(account.saldo) - Number(transaction.amount)

                }
            }


            return account
        } catch (error) {
            return { error: error.toString() }
        }
    }
}
