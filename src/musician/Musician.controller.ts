import { Request, Response } from 'express';
import MusicianService from '../musician/Musician.service'
import { Musician } from './Musician.interface';
import { checkValidationErrors } from '../utils/validators/validators';

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

        checkValidationErrors(req,res);

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

    public remove(req: Request, res: Response): void {
        const id: string = req.params.id;
        MusicianService.remove(id).then(result => {
            res.status(200).json(result);
        }).catch(err => console.log(err));
    }

    public update(req: Request, res: Response): void {

        checkValidationErrors(req,res);

        const musician = req.body as Musician
        const id = musician._id;
        MusicianService.update(id,musician).then(result => {
            res.status(200).json(result);
        }).catch(err => console.log(err));
    }

}

export default new MusicianController();