import { AccountProps } from "../../services/account";

export default interface AccountRepository{
    save(account: AccountProps): AccountProps | any;
    get(accountDocument: string): AccountProps| any;
}