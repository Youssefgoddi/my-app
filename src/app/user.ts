export class User {
    fullName!: string;
    about_me!: string;
    country! :string;
    image!: string;

    constructor(fullName :string,about_me:string,country:string,image:string){
this.about_me=about_me;
this.fullName = fullName;
this.country = country;
this.image = image
}
}

