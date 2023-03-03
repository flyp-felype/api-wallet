import { AppDataSource } from "../../../data-source";
import { AccountProps, TransactionsProps } from "../../../entities/account";
import { Account } from "../../../entity/Account";
import { Events } from "../../../entity/Events";
import { Transactions } from "../../../entity/Transactions";
import TransactionsRepository from "../TransactionsRepositoy";
import AccountRepositorySQL from "./AccountRespositorySQL";

export default class TransactionsRepositorySQL implements TransactionsRepository {
    transaction: Transactions
    constructor() {
        this.transaction = new Transactions()
    }

    async setTransaction(account: AccountProps, transaction: TransactionsProps) {
        try{
            let accountData = await AppDataSource.manager.findOneBy(Account, { document: account.document })
          
            const events = await AppDataSource.manager.findOneBy(Events, {name: transaction.events.name.toLocaleLowerCase()})
         
            this.transaction.amount = transaction.amount
            this.transaction.events = events
            this.transaction.account = accountData
            this.transaction.createAt = new Date() 
            await AppDataSource.manager.save(this.transaction)
     
            accountData = await AppDataSource.manager.findOneBy(Account, { document: account.document })
      
            return accountData
        }catch(error){
            console.log(error)
        }
    
        
    }


}