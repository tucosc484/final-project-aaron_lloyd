export class IGroups {
    constructor(
        public id: string,
        public title: string,
        public population: number, //number of people within the group
        public creator: string, //who created the group
        public description: string, //description of the group
        public members: []
    ) {}
}
