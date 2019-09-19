import * as mongoose from 'mongoose';
import { Instrument } from './Instrument.interface'

export interface IInstrumentModel extends Instrument {}

const InstrumentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'The instrument must have a name'
    },
    type: {
        type: String,
        required: 'The instrument must have a type'
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


export const InstrumentModel : mongoose.Model<IInstrumentModel> = 
                mongoose.model('Instrument', InstrumentSchema) as mongoose.Model<IInstrumentModel>