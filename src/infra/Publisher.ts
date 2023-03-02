 
import { TransactionsProps } from "../entities/account"
import Observer from "./Observe"

export default class Publisher {
    observers: Observer[]

    constructor() {
        this.observers = []
    }

    register(observer: Observer) {
        this.observers.push(observer)
    }

    publish(transactions: TransactionsProps) {
        for (const observer of this.observers) {
            if (observer.operation === transactions.type) {
                observer.notify(transactions);
            }
        }
    }
}