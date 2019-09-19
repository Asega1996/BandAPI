import ConcertRepository from './Concert.repository'
import { Concert } from "./Concert.interface";

export class ConcertService {

    public retrieveAll(search = {}): Promise<Concert[]> {
        return ConcertRepository.retrieveAll(search);
      }
    
    public retrieveById(id: string): Promise<Concert> {
        return ConcertRepository.retrieveById(id).then(Concert => {
          return Concert;
        });
      }
    
    public create(Concert: Concert): Promise<Concert> {
        return ConcertRepository.create(Concert);
    }
    
    public update(id: string, toUpdate: Concert): Promise<Concert | null> {
    
        return this.retrieveById(id).then(Concert => {
          toUpdate._id = id;
          return ConcertRepository.update(Concert._id, toUpdate);
        });
    
      }
    
    public delete(id: string): Promise<Concert> {
        return ConcertRepository.delete(id);
    }
    

}

export default new ConcertService();