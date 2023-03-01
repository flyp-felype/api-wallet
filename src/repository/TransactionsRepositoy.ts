import { AccountProps } from "../entities/account";

export default interface TransactionsRepository{
    setCredit(account: AccountProps, amount: number): AccountProps;
    setDebit(account: AccountProps, amount: number): AccountProps;
}