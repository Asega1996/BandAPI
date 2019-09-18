import * as mongoose from 'mongoose'

export interface Base extends mongoose.Document {
    createdAt : Date;
    updatedAt : Date;
    isActive: boolean;
}