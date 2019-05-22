export class Posts {
    constructor(
        public id: string,
        public title: string,
        public author: string,
        public content: string,
        public likes: number,
        public dislikes: number
    ) {}
}
