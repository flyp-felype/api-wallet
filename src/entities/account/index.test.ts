
import { expect, test, beforeEach } from 'vitest'
import { Account, AccountProps } from '.' 
import AccountRepository from '../../infra/repository/AccountRepository';
import AccountRepositoryMemory from '../../infra/repository/memory/AccountRespoistoryMemory'
import TransactionsRepositoryMemory from '../../infra/repository/memory/TransactionsRepositoryMemory';
import TransactionsRepository from '../../infra/repository/TransactionsRepositoy';

let accountRepository: AccountRepository;
let accountService: Account
let account: AccountProps
let document: string

let transactionRepository:TransactionsRepository

beforeEach(async function () { 
    accountRepository = new AccountRepositoryMemory();
    transactionRepository =  new TransactionsRepositoryMemory()
    accountService = new Account(accountRepository,transactionRepository)
    document = "123456"
    accountService.setAccount({ name: "John Doe", document })
    account = accountService.getAccount(document)
})

test('create an account', () => {

    expect(account.document).toBe(document)
})


test('Test transactions credit ', () => {  
    accountService.setCredit(document, 10)
    accountService.setCredit(document, 20)

    expect(account.saldo).toBe(30)
})
test('Test transactions credit duplicate ', () => {  
    accountService.setCredit(document, 10)
   const retornoCredit: any = accountService.setCredit(document, 10)

    expect(retornoCredit.success).toBe(false)
})

test('Test transactions debit duplicate ', () => {  
    accountService.setCredit(document, 50)
    accountService.setDebit(document, 10)
   const retornoCredit: any = accountService.setDebit(document, 10)

    expect(retornoCredit.success).toBe(false)
})

test('Test transactions debit', () => {

    accountService.setCredit(document, 20)
    accountService.setDebit(document, 10)

    expect(account.saldo).toBe(10)
})

test("Test transactions ChargeBack Credito", () => {
    accountService.setCredit(document, 30) 
    accountService.setChargeBack(document, account.transactions[0].id)

    expect(account.saldo).toBe(0)
})

test("Test transactions ChargeBack Debito", () => { 
    accountService.setCredit(document, 10) 
    accountService.setDebit(document, 10)
    expect(account.saldo).toBe(0)

    accountService.setChargeBack(document, account.transactions[1].id)

    expect(account.saldo).toBe(10)
})
test('Test extract', () => {

    accountService.setCredit(document, 10)
    accountService.setCredit(document, 15)
    accountService.setDebit(document, 5)

    expect(account.transactions.length).toBe(3)

})