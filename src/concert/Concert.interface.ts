import { Base } from 'utils/interfaces/Base';

export interface Concert extends Base {
    name: String;
    dateStart: Date,
    dateEnd: Date,
    googleCalendarId: String
}