import { Base } from "../utils/interfaces/Base";
import { Instrument } from 'instruments/Instrument.interface'

export interface Musician extends Base {
    firstName: String;
    lastName: String;
    phone: Number;
    instrument: Instrument;
}