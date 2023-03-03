import { Response, Request } from "express";
import { Account } from "../services/account";
import AccountRepositorySQL from "../infra/repository/postgresql/AccountRespositorySQL";

const AccountController = {
    async get(req: Request, res: Response) {
        try { 
            const { document } = req.params 
            const accountRepository = new AccountRepositorySQL()
            const accountService = new Account(accountRepository)

            const account = await accountService.getAccount(document)
            return res.status(200).json(account)
        } catch (error) {
            return res.status(400).json({ error: error.toString() })
        }
    },
    async create(req: Request, res: Response) {
        try {
            const { name, document } = req.body
            if (!name)
                res.status(400).send({ error: 'Favor enviar o nome do cliente!' })

            if (!document)
                res.status(400).send({ error: 'Favor enviar um número de documento' })

            const accountRepository = new AccountRepositorySQL()

            const accountService = new Account(accountRepository)

            const account = await accountService.setAccount({ name, document })

            if (account?.error) throw new Error(account?.error)

            return res.status(200).json(account)


        } catch (error) {
            return res.status(400).json({ error: error.toString(0) })
        }
    }
}

export default AccountController