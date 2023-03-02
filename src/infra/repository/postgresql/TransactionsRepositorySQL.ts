import { AccountProps, TransactionsProps } from "../../../entities/account";
import TransactionsRepository from "../TransactionsRepositoy";

export default class TransactionsRepositorySQL implements TransactionsRepository {
    setCredit(account: AccountProps, transaction: TransactionsProps): AccountProps {
        throw new Error("Method not implemented.");
    }
    setDebit(account: AccountProps, transaction: TransactionsProps): AccountProps {
        throw new Error("Method not implemented.");
    }

}