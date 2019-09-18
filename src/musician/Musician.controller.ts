import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { MusicianService } from '../musician/Musician.service'
//import { OK } from 'http-status-codes'


export default class MusicianController {

    public musicianService : MusicianService;

    constructor() {
        this.musicianService = new MusicianService();
    }

    public retrieveAll(req: Request, res: Response): void  {

        this.musicianService.retrieveAll(req.query).then(result => {
    
          res.status(200).json(res);
    
        }).catch(err => console.log(err));
    }

}