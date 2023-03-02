import { Entity, PrimaryGeneratedColumn, Column , OneToMany} from "typeorm"
import {Transactions} from './Transactions'

@Entity()
export class Events {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string 

    @Column({length: 1})
    type: string 

    @OneToMany(type => Transactions, transactions => transactions.id) transactions: Transactions[]

    @Column()
    createAt: Date
}
