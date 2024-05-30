export class User {
    private userId: number;
    private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;
    public constructor(
        userId: number,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
    ) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
    public getUserId(): number {
        return this.userId;
    }
    public setUserId(userId: number) {
        this.userId = userId;
    }
    public getFirstName(): string {
        return this.firstName;
    }
    public setFirstName(firstName: string) {
        this.firstName = firstName;
    }
    public getLastName(): string {
        return this.lastName;
    }
    public setLastName(lastName: string) {
        this.lastName = lastName;
    }
    public getEmail(): string {
        return this.email;
    }
    public setEmail(email: string) {
        this.email = email;
    }
    public getPassword(): string {
        return this.password;
    }
    public setPassword(password: string) {
        this.password = password;
    }
}
