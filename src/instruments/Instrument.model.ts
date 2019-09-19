import * as mongoose from 'mongoose';
import { Instrument } from './instrument.interface'

export interface IInstrumentModel extends Instrument {}

const InstrumentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Enter a first name'
    },
    type: {
        type: String,
        required: 'Enter a last name'
    },
    phone: {
        type: Number            
    },
    instrument: {
        type: String
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

/*
MusicianSchema.pre('save', function(next){
    this.update({}, { $set: { updatedAt : Date.now() } })

});

MusicianSchema.pre('update', function(next){
    this.update({}, { $set: { updatedAt : Date.now() } })

});
*/

export const InstrumentModel : mongoose.Model<IInstrumentModel> = 
                mongoose.model('Instrument', InstrumentSchema) as mongoose.Model<IInstrumentModel>