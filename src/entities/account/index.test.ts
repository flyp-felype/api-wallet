
import { expect, test, beforeEach } from 'vitest'
import { Account, AccountProps } from '.'
import TransactionHandler from '../../handler/Transaction';
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

test('Test extract', () => {

    accountService.setCredit(document, 10)
    accountService.setCredit(document, 15)
    accountService.setDebit(document, 5)

    expect(account.transactions).toEqual([
        { event: "Credit", amount: 10, type: "C" },
        { event: "Credit", amount: 15, type: "C" },
        { event: "Debit", amount: 5, type: "D" }
    ])

})