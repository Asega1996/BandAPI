import * as mongoose from 'mongoose';
import { Musician } from 'musician/Musician.interface'

export interface IMusicianModel extends Musician {}

const MusicianSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'Enter a first name'
    },
    lastName: {
        type: String,
        required: 'Enter a last name'
    },
    phone: {
        type: Number            
    },
    instrument: {
        name: {
            type: String
        },
        type:{
            type: String
        }
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

export const MusicianModel : mongoose.Model<IMusicianModel> = 
    mongoose.model('Musician', MusicianSchema) as mongoose.Model<IMusicianModel>