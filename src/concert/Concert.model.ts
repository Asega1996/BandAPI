import  * as mongoose from 'mongoose';
import { Concert } from './Concert.interface'

export interface IConcertModel extends Concert { }

const ConcertSchema = new mongoose.Schema({
    name:{
        type: String, required: true
    },
    dateStart: {
        type: Date, required: true
    },
    dateEnd:{
        type: Date, required: true,
        validate: [dateValidator, 'Start Date must be less than End Date']
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

function dateValidator(dateEnd){
    return this.dateStart < dateEnd;
}

export const ConcertModel : mongoose.Model<IConcertModel> = 
    mongoose.model('Concert',ConcertSchema) as mongoose.Model<IConcertModel>
