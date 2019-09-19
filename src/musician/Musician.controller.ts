import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import MusicianService from '../musician/Musician.service'
import { Musician } from './Musician.interface';
//import { OK } from 'http-status-codes'


class MusicianController {

    constructor() { }

    public retrieveAll(req: Request, res: Response): void  {
        MusicianService.retrieveAll(req.query).then(result => {
            res.status(200).json(result);
        }).catch(err => console.log(err));
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

    public create(req: Request, res: Response): void {
        let musician = req.body as Musician;
        MusicianService.create(musician).then(result => {
            res.status(200).json(result);
        }).catch(err => console.log(err));
    }

    public delete(req: Request, res: Response): void {
        const id: string = req.params.id;
        MusicianService.delete(id).then(result => {
            res.status(200).json(result);
        }).catch(err => console.log(err));
    }

    public update(req: Request, res: Response): void {
        const id = req.params.id;
        const musician = req.body as Musician
        MusicianService.update(id,musician).then(result => {
            res.status(200).json(result);
        }).catch(err => console.log(err));
    }

}

export default new MusicianController();