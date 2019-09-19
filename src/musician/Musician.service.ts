import MusicianRepository from "./Musician.repository"
import { Musician } from "./Musician.interface";

export class MusicianService {

    public retrieveAll(search = {}): Promise<Musician[]> {
        return MusicianRepository.retrieveAll(search);
      }
    
    public retrieveById(id: string): Promise<Musician> {
        return MusicianRepository.retrieveById(id).then(Musician => {
          return Musician;
        });
      }
    
    public create(Musician: Musician): Promise<Musician> {
        return MusicianRepository.create(Musician);
    }
    
    public update(id: string, toUpdate: Musician): Promise<Musician | null> {
    
        return this.retrieveById(id).then(Musician => {
          toUpdate._id = id;
          return MusicianRepository.update(Musician._id, toUpdate);
        });
    
      }
    
    
    public delete(id: string): Promise<Musician> {
        return MusicianRepository.delete(id);
    }

    public remove(id: string): Promise<Musician> {
      return MusicianRepository.remove(id);
  }
    

}

export default new MusicianService();