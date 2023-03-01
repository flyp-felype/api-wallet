import TransactionsRepository from "../../repository/TransactionsRepositoy";
import { AccountProps } from "../account";
export interface TransactionsProps{
    event: string,
    amount: number
}
export class Transactiosn{
    constructor(readonly transactionsRepository: TransactionsRepository){}
    
    setCredit(account: AccountProps, amount: number){
         this.transactionsRepository.setCredit(account, amount)
        return account
    }

    setDebit(account: AccountProps, amount: number){
        if(account.saldo  === 0 || account.saldo < amount) throw new Error('Account insufficient funds!') 
        
        this.transactionsRepository.setDebit(account, amount)
        return account
    }

}