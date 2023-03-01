 
import { expect, test, beforeEach} from 'vitest'
import { Account } from '.' 
import AccountRepository from '../../repository/AccountRepository';
import AccountRepositoryMemory from '../../repository/memory/AccountRespoistoryMemory'

let accountRepository: AccountRepository;
let accountService: Account
 
beforeEach(function(){
     accountRepository = new AccountRepositoryMemory();
     accountService = new Account(accountRepository)
})

test('create an account', () => {

    accountService.setAccount({name: "John Doe", document:"123456"})

    const account = accountService.getAccount("123456")
 
    expect(account.document).toBe("123456")
})