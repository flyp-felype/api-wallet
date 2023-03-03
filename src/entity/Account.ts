import { Entity, PrimaryGeneratedColumn, Column , Index, OneToMany} from "typeorm"
import {Transactions} from './Transactions'

@Entity()
export class Account {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Index({ unique: true })
    document: string 

    @Column()
    name: string 

    @OneToMany(() => Transactions, transactions => transactions.account) transactions: Transactions[]

    @Column()
    createAt: Date
}
