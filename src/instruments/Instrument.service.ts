import InstrumentRepository from './Instrument.repository'
import { Instrument } from "./Instrument.interface";

export class InstrumentService {

    public retrieveAll(search = {}): Promise<Instrument[]> {
        return InstrumentRepository.retrieveAll(search);
      }
    
    public retrieveById(id: string): Promise<Instrument> {
        return InstrumentRepository.retrieveById(id).then(Instrument => {
          return Instrument;
        });
      }
    
    public create(Instrument: Instrument): Promise<Instrument> {
        return InstrumentRepository.create(Instrument);
    }
    
    public update(id: string, toUpdate: Instrument): Promise<Instrument | null> {
    
        return this.retrieveById(id).then(Instrument => {
          toUpdate._id = id;
          return InstrumentRepository.update(Instrument._id, toUpdate);
        });
    
      }

    public remove(id: string): Promise<Instrument> {
      return InstrumentRepository.remove(id);
    }
    
    public delete(id: string): Promise<Instrument> {
        return InstrumentRepository.delete(id);
    }
    

}

export default new InstrumentService();