import  * as mongoose from 'mongoose';
import { Concert } from './Concert.interface'

export interface IConcertModel extends Concert { }

const ConcertSchema = new mongoose.Schema({
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
    }
});

export const ConcertModel : mongoose.Model<IConcertModel> = 
    mongoose.model('Concert',ConcertSchema) as mongoose.Model<IConcertModel>
