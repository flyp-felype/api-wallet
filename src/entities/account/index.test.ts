
import { expect, test, beforeEach } from 'vitest'
import { Account, AccountProps } from '.'
import TransactionHandler from '../../infra/handler/Transaction';
import Publisher from '../../infra/Publisher';
import AccountRepository from '../../infra/repository/AccountRepository';
import AccountRepositoryMemory from '../../infra/repository/memory/AccountRespoistoryMemory'
import TransactionsRepositoryMemory from '../../infra/repository/memory/TransactionsRepositoryMemory';

let accountRepository: AccountRepository;
let accountService: Account
let account: AccountProps
let document: string
let publisher: Publisher
let transactionRepository:  TransactionsRepositoryMemory

beforeEach(function () {
    publisher = new Publisher()
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

    expect(account.saldo).toBe(10)
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

    expect(account.transactions).toEqual([
        { id: 1, event: "Credit", amount: 10, type: "C" },
        { id: 2, event: "Credit", amount: 15, type: "C" },
        { id: 3, event: "Debit", amount: 5, type: "D" }
    ])

})