import {Router} from 'express'
import AccountController from '../controller/AccountController'

const accountRouter = Router()

accountRouter.get('/:document', AccountController.get)
accountRouter.post('/', AccountController.create)

export {accountRouter}