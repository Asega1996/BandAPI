import { InstrumentModel, IInstrumentModel} from "./Instrument.model";
import BaseRepository from "../utils/repositories/BaseRepository";
import * as mongoose from 'mongoose'
import { Instrument } from "instruments/Instrument.interface";



class InstrumentRepository extends BaseRepository<Instrument, IInstrumentModel> {

    constructor() {
      super(InstrumentModel);
    }
    
}
  
export default new InstrumentRepository();