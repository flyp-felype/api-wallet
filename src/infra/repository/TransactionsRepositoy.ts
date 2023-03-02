import { AccountProps, TransactionsProps } from "../../entities/account";

export default interface TransactionsRepository{
    setCredit(account: AccountProps, transaction: TransactionsProps): AccountProps;
    setDebit(account: AccountProps, transaction: TransactionsProps): AccountProps;
}