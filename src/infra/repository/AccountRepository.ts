import { AccountProps } from "../../entities/account";

export default interface AccountRepository{
    save(account: AccountProps): void;
    get(accountDocument: string): AccountProps;
}