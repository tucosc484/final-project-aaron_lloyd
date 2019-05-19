export class IUser {
    constructor(
        public email: string,
        public userName: string,
        public password: string,
        public interest: []
    ) {}
}
