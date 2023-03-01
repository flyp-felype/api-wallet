import { beforeEach, expect, test } from 'vitest'
import { Transactiosn } from '.';
import AccountRepositoryMemory from '../../repository/memory/AccountRespoistoryMemory';
import TransactionsRepositoryMemory from '../../repository/memory/TransactionsRepositoryMemory';
import { Account } from '../account';


let accountRepository: AccountRepositoryMemory
let transferRepository: TransactionsRepositoryMemory
let accountService:Account
let transactionsService: Transactiosn

beforeEach(function() {
     accountRepository = new AccountRepositoryMemory();
     transferRepository = new TransactionsRepositoryMemory();
     accountService = new Account(accountRepository)
     transactionsService = new Transactiosn(transferRepository)
})

test('Test transactions credit ', () => {
 

    accountService.setAccount({ name: "John Doe", document: "123456" })

    let account = accountService.getAccount("123456")

    transactionsService.setCredit(account, 10)

    expect(account.saldo).toBe(10)
})

test('Test transactions debit', () => {
  

    accountService.setAccount({ name: "John Doe", document: "123456" })

    let account = accountService.getAccount("123456")
    transactionsService.setCredit(account, 20)
    transactionsService.setDebit(account, 10)

    expect(account.saldo).toBe(10)
})

test('Test extract', () => {
   

    accountService.setAccount({ name: "John Doe", document: "123456" })

    let account = accountService.getAccount("123456")
    transactionsService.setCredit(account, 10)
    transactionsService.setCredit(account, 15)
    transactionsService.setDebit(account, 5)


    expect(account.transactions).toEqual([
        { event: "Credit", amount: 10, type: "C" },
        { event: "Credit", amount: 15, type: "C" },
        { event: "Debit", amount: 5, type: "D" }
    ])

})