import { AccountProps } from "../../entities/account";

export default interface AccountRepository{
    save(account: AccountProps): AccountProps | any;
    get(accountDocument: string): AccountProps| any;
}