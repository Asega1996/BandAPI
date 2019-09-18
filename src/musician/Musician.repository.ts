import { MusicianModel, IMusicianModel } from "./Musician.model";
import BaseRepository from "../utils/repositories/BaseRepository";
import * as mongoose from 'mongoose'
import { Musician } from "musician/Musician.interface";



class MusicianRepository extends BaseRepository<Musician, IMusicianModel> {

    constructor() {
      super(MusicianModel);
    }
    
}
  
export default new MusicianRepository();