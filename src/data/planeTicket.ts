export class PlaneTicket {
    private id: number;
    private departure: string;
    private destination: string;
    private date: string;
    private hour: string;
    private price: number;

    public constructor(
        id: number,
        departure: string,
        destination: string,
        date: string,
        hour: string,
        price: number,
    ) {
        this.id = id;
        this.departure = departure;
        this.destination = destination;
        this.date = date;
        this.hour = hour;
        this.price = price;
    }
    public getId(): number {
        return this.id;
    }
    public setId(id: number) {
        this.id = id;
    }
    public getDeparture(): string {
        return this.departure;
    }
    public setDeparture(departure: string) {
        this.departure = departure;
    }
    public getDestination(): string {
        return this.destination;
    }
    public setDestination(destination: string) {
        this.destination = destination;
    }
    public getDate(): string {
        return this.date;
    }
    public setDate(date: string) {
        this.date = date;
    }
    public getHour(): string {
        return this.hour;
    }
    public setHour(hour: string) {
        this.hour = hour;
    }
    public getPrice(): number {
        return this.price;
    }
    public setPrice(price: number) {
        this.price = price;
    }
}
