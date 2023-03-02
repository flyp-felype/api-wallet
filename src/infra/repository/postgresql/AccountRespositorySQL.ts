import { AppDataSource } from "../../../data-source";
import { AccountProps } from "../../../entities/account";
import { Account } from "../../../entity/Account";
import AccountRepository from "../AccountRepository";

export default class AccountRepositorySQL implements AccountRepository {
    async save(account: AccountProps) {
        try {
            const accountModel = new Account()

            accountModel.name = account.name;
            accountModel.document = account.document;
            accountModel.createAt = new Date();

            const accountCreate = await AppDataSource.manager.save(accountModel) 
            return accountCreate
        } catch (error) {
            // const accountError: AccountProps =  { name: '', document: '', error: error?.driverError.detail }
            return { error: error?.driverError.detail }
        }

    }
    get(accountDocument: string): AccountProps {
        throw new Error("Method not implemented.");
    }
}
