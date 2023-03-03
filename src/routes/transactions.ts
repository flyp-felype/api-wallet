import {Router} from 'express'
import TransactionsController from '../controller/TransactionsController'

const transactionRouter = Router()

transactionRouter.post('/', TransactionsController.transaction)
transactionRouter.get('/:document/:limit/:page', TransactionsController.getExtract)
transactionRouter.post('/estorno', TransactionsController.estornoTransacao)

export {transactionRouter}