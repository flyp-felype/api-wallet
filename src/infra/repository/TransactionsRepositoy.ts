import { AccountProps, TransactionsProps } from "../../entities/account";

export default interface TransactionsRepository{
    setTransaction(account: AccountProps, transaction: TransactionsProps): AccountProps | any;
  
}