import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import ConcertService from './Concert.service'
import { Concert } from './Concert.interface'


class ConcertController {

    constructor() { }

    public retrieveAll(req: Request, res: Response): void  {
        ConcertService.retrieveAll(req.query).then(result => {
            res.status(200).json(result);
        }).catch(err => console.log(err));
    }

    public retrieveById(req: Request, res: Response): void  {
        let id: string;
        if(req.params.id){
            id = req.params.id;
        }
        ConcertService.retrieveById(req.params.id).then(result => {
            res.status(200).json(result);
        }).catch(err => console.log(err));
    }

    public create(req: Request, res: Response): void {
        let Concert = req.body as Concert;
        ConcertService.create(Concert).then(result => {
            res.status(200).json(result);
        }).catch(err => console.log(err));
    }

    public delete(req: Request, res: Response): void {
        const id: string = req.params.id;
        ConcertService.delete(id).then(result => {
            res.status(200).json(result);
        }).catch(err => console.log(err));
    }

    public update(req: Request, res: Response): void {
        const id = req.params.id;
        const Concert = req.body as Concert
        ConcertService.update(id,Concert).then(result => {
            res.status(200).json(result);
        }).catch(err => console.log(err));
    }

}

export default new ConcertController();