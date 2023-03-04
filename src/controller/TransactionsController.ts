import { Response, Request } from "express";
import { Account } from "../services/account";
import AccountRepositorySQL from "../infra/repository/postgresql/AccountRespositorySQL";
import TransactionsRepositorySQL from "../infra/repository/postgresql/TransactionsRepositorySQL";

const TransactionsController = {
    async transaction(req: Request, res: Response) {
        try {
            const { document, event, amount, type } = req.body

            if (!document) throw new Error('Favor enviar o documento do cliente')

            if (!event) throw new Error('Favor enviar o evento')

            if (!amount) throw new Error('Favor enviar o valor da transação')

            if (!type) throw new Error('Favor enviar o tipo de transação')

            const transferRepository = new TransactionsRepositorySQL()
            const accountRepository = new AccountRepositorySQL()

            const accountService = new Account(accountRepository, transferRepository)

            const account = await accountService.getAccount(document)

            if (!account) return res.status(404).json({ success: false, mensagem: "Conta não encontrada" })

            await accountService.setTransaction(document, amount, event, type)

            res.status(200).json({ success: true, mensagem: 'Transação efetuada com sucesso!' })

        } catch (error) {
            res.status(400).json(error.toString())
        }
    },

    async getExtract(req: Request, res: Response) {
        try {
            const { document, limit, page } = req.params

            if (!document) throw new Error("Favor enviar o documento do cliente")

            const transferRepository = new TransactionsRepositorySQL()
            const accountRepository = new AccountRepositorySQL()

            const accountService = new Account(accountRepository, transferRepository)
            const account = await accountService.getAccount(document)

            if (!account) return res.status(404).json({ success: false, mensagem: "Conta não encontrada" })

            const transactions = await accountService.getExtracts(account, Number(limit), Number(page))

            res.status(200).json(transactions)


        } catch (error) {
            res.status(400).json(error.toString())
        }
    },

    async estornoTransacao(req: Request, res: Response) {
        try {
            const { document, transaction, event } = req.body

            if (!document) throw new Error('Favor enviar o documento')

            if (!transaction) throw new Error('Favor enviar o id da transação')

            const transferRepository = new TransactionsRepositorySQL()
            const accountRepository = new AccountRepositorySQL()

            const accountService = new Account(accountRepository, transferRepository)
            const account = await this.accountRepository.get(document)
            if (!account) return res.status(404).json({ success: false, mensagem: "Conta não encontrada" })

            const transactionExists = account.transactions.find(x => x.id === transaction)
            if (!transactionExists) return res.status(404).json({ success: false, mensagem: "Transação não encontrada para o cliente" })

            await accountService.setChargeBack(document, transaction, event)

            res.status(200).json({ success: true, mensagem: 'Transação estornada com sucesso!' })

        } catch (error) {
            res.status(400).json({ success: false, mensagem: error.toString() })
        }
    }
}

export default TransactionsController