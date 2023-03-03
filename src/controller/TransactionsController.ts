import { Response, Request} from "express";
import { Account } from "../entities/account";
import AccountRepositorySQL from "../infra/repository/postgresql/AccountRespositorySQL";
import TransactionsRepositorySQL from "../infra/repository/postgresql/TransactionsRepositorySQL";

const TransactionsController = {
    async transaction(req: Request, res: Response){
        try{
            const {accountDocument, event, amount, type} = req.body

            if(!accountDocument) throw new Error('Favor enviar o documento do cliente')

            if(!event) throw new Error('Favor enviar o evento')

            if(!amount) throw new Error('Favor enviar o valor da transação')
            
            if(!type) throw new Error('Favor enviar o tipo de transação')

            const transferRepository = new TransactionsRepositorySQL()
            const accountRepository = new AccountRepositorySQL()
            
            const accountService = new Account(accountRepository, transferRepository)
            
            await accountService.setTransaction(accountDocument, amount, event, type)
   
            res.status(200).json({mensagem: 'Transação efetuada com sucesso!'})

        }catch(error){
            res.status(400).json(error.toString())
        }
    }
}

export default TransactionsController