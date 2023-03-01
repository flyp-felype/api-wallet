 import { expect, test} from 'vitest'
import { Account } from '.' 
import AccountRepositoryMemory from '../../repository/memory/AccountRespoistoryMemory'

 

test('create an account', () => {

    const accountRepository = new AccountRepositoryMemory();
    const  accountService = new Account(accountRepository)

    accountService.setAccount({name: "John Doe", document:"123456"})

    const account = accountService.getAccount("123456")
 
    expect(account.document).toBe("123456")
})