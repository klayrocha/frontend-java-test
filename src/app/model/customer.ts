import { Country } from './country';

export class Customer {
    constructor(
        public id: string,
        public name: string,
        public phone: string,
        public country: Country,
        public state: string
    ){

    }
}