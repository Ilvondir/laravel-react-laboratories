import {OrderItem} from "./order-item";

export class Order {
    constructor(
        public id = 1,
        public name = '',
        public email = '',
        public total = 0.0,
        public order_items: OrderItem[]
    ) {
    }
}