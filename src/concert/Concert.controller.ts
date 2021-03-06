import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import ConcertService from './Concert.service'
import { Concert } from './Concert.interface'
import { checkValidationErrors } from '../utils/validators/validators';


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

        checkValidationErrors(req,res);

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

    public remove(req: Request, res: Response): void {
        const id: string = req.params.id;
        ConcertService.remove(id).then(result => {
            res.status(200).json(result);
        }).catch(err => console.log(err));
    }

    public update(req: Request, res: Response): void {

        checkValidationErrors(req,res);
        
        const concert = req.body as Concert
        const id = concert._id;
        ConcertService.update(id,concert).then(result => {
            res.status(200).json(result);
        }).catch(err => console.log(err));
    }

}

export default new ConcertController();