import { Base } from "../utils/interfaces/Base";

export interface Musician extends Base {
    firstName: String;
    lastName: String;
    phone: Number;
    instrument: String;
}