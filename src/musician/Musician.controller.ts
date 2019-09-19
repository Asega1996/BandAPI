import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import MusicianService from '../musician/Musician.service'
//import { OK } from 'http-status-codes'


class MusicianController {


    constructor() { }

    public retrieveAll(req: Request, res: Response): void  {
        console.log(MusicianService)
        MusicianService.retrieveAll({}).then(result => {
            res.status(200).json(result);
        }).catch(err => console.log(err));
        /*this.musicianService.retrieveAll(req.query).then(result => {
            
            (res)? res.status(200).json(result) : console.log('petazo')
    
        }).catch(err => console.log(err));*/

    }

    public retrieveById(req: Request, res: Response): void  {
        let id: string;
        if(req.params.id){
            id = req.params.id;
        }
        MusicianService.retrieveById(req.params.id).then(result => {
            res.status(200).json(result);
        }).catch(err => console.log(err));

    }

    
}

export default new MusicianController();