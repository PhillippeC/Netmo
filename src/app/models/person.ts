import { Film } from "./film";

export class Person {
    public id:number;
    public name:String;
    public known_for:Film[];
    public biography:String;
    public birthday:String;
    public profile_path:String;

    constructor(){}
}
