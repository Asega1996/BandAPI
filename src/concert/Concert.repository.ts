import { ConcertModel, IConcertModel} from "./Concert.model";
import BaseRepository from "../utils/repositories/BaseRepository";
import * as mongoose from 'mongoose'
import { Concert } from "./Concert.interface"



class ConcertRepository extends BaseRepository<Concert, IConcertModel> {

    constructor() {
      super(ConcertModel);
    }
    
}
  
export default new ConcertRepository();