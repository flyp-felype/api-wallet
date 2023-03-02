import { AppDataSource } from "../../../data-source";
import { AccountProps } from "../../../entities/account";
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
            return await AppDataSource.manager.findOneBy(Account, { document: accountDocument })
        } catch (error) {
            return { error: error.driverError.detail }
        }
    }
}
