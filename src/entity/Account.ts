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

    @OneToMany(type => Transactions, transactions => transactions.id) transactions: Transactions[]

    @Column()
    createAt: Date
}
