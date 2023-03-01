import { expect, test } from 'vitest'
import { Transactiosn } from '.';
import AccountRepositoryMemory from '../../repository/memory/AccountRespoistoryMemory';
import TransactionsRepositoryMemory from '../../repository/memory/TransactionsRepositoryMemory';
import { Account } from '../account';

test('Test transactions credit ', () => {
    const accountRepository = new AccountRepositoryMemory();
    const transferRepository = new TransactionsRepositoryMemory();
    const  accountService = new Account(accountRepository)
    const transactionsService = new Transactiosn(transferRepository)

    accountService.setAccount({name: "John Doe", document:"123456"})

    let account = accountService.getAccount("123456")

    account = transactionsService.setCredit(account, 10)

    expect(account.saldo).toBe(10)
})

test('Test transactions debit', () => {
    const accountRepository = new AccountRepositoryMemory();
    const  accountService = new Account(accountRepository)
    const transferRepository = new TransactionsRepositoryMemory();
    const transactionsService = new Transactiosn(transferRepository)

    accountService.setAccount({name: "John Doe", document:"123456"})

    let account = accountService.getAccount("123456")
    account.saldo = 20
    account = transactionsService.setDebit(account, 10)

    expect(account.saldo).toBe(10)
})