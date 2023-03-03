

import { expect, test, beforeEach, describe } from 'vitest'
import { Account, AccountProps } from '.'
import AccountRepository from '../../infra/repository/AccountRepository';
import AccountRepositoryMemory from '../../infra/repository/memory/AccountRespoistoryMemory'
import TransactionsRepositoryMemory from '../../infra/repository/memory/TransactionsRepositoryMemory';
import TransactionsRepository from '../../infra/repository/TransactionsRepositoy';

let accountRepository: AccountRepository;
let accountService: Account
let account: AccountProps
let document: string

let transactionRepository: TransactionsRepository

beforeEach(async function () {
    accountRepository = new AccountRepositoryMemory();
    transactionRepository = new TransactionsRepositoryMemory()
    accountService = new Account(accountRepository, transactionRepository)
    document = "123456"
    accountService.setAccount({ name: "John Doe", document })
    account = await accountService.getAccount(document)
})


test('create an account', () => {

    expect(account.document).toBe(document)
})

test('Test transactions credit ', async () => {
    account = await accountService.setTransaction(document, 10, 'credito', 'C')
    account = await accountService.setTransaction(document, 20, 'credito', 'C')

    expect(account.saldo).toBe(30)
})

test('Test transactions credit duplicate ', async () => {
    const account = accountService.setTransaction(document, 10, 'debito', 'D')
    const retornoCredit: any = await accountService.setTransaction(document, 10, 'debito', 'D')

    expect(retornoCredit).toThrow(TypeError);
})

test('Test transactions debit duplicate ', async () => {
    account = await accountService.setTransaction(document, 50, 'credito', 'C')
    account = await accountService.setTransaction(document, 10, 'debito', 'D')
    const retornoCredit: any = accountService.setTransaction(document, 10, 'debito', 'D')
    expect(retornoCredit).toThrow(TypeError);
})

test('Test transactions debit', async () => {
    let accountTransaction;
    accountTransaction = await accountService.setTransaction(document, 20, 'credito', 'C')
    accountTransaction = await accountService.setTransaction(document, 10, 'debito', 'D')

    expect(accountTransaction.saldo).toBe(10)
})

test("Test transactions ChargeBack Credito", async () => {
    account = await accountService.setTransaction(document, 30, 'credito', 'C')
    accountService.setChargeBack(document, account.transactions[0].id)
    expect(account.saldo).toBe(0)
})

test("Test transactions ChargeBack Debito", async () => {
    account = await accountService.setTransaction(document, 10, 'credito', 'C')
    account = await accountService.setTransaction(document, 10, 'debito', 'D')
    expect(account.saldo).toBe(0)

    accountService.setChargeBack(document, account.transactions[1].id)

    expect(account.saldo).toBe(10)
})

test('Test extract', async () => {

    account = await accountService.setTransaction(document, 10, 'credito', 'C')
    account = await accountService.setTransaction(document, 15, 'credito', 'C')
    account = await accountService.setTransaction(document, 5, 'debito', 'D')

    expect(account.transactions.length).toBe(3)

})

test('Test extract pagination', async () => {

    const totalTransactions = 20
    //loop para gerar 20 extrato e testar a paginação de 10

    for (let index = 0; index < totalTransactions; index++) {
        account = await accountService.setTransaction(document, 10 + index, 'credito', 'C')
        
    }
    const transatcions = await accountService.getExtracts(account, 10, 0)
    
    expect(transatcions.length).toBe(10)

})

