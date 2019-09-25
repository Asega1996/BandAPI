import  * as mongoose from 'mongoose';
import { Concert } from './Concert.interface'

export interface IConcertModel extends Concert { }

const ConcertSchema = new mongoose.Schema({
    name:{
        type: String
    },
    dateStart: {
        type: Date
    },
    dateEnd:{
        type: Date
    },
    updatedAt: { 
        type: Date, default: Date.now 
    },
    createdAt: { 
        type: Date, default: Date.now 
    },
    isActive:{
        type: Boolean, default: true
    },
    googleCalendarId:{
        type: String, default:''
    }
});

export const ConcertModel : mongoose.Model<IConcertModel> = 
    mongoose.model('Concert',ConcertSchema) as mongoose.Model<IConcertModel>
