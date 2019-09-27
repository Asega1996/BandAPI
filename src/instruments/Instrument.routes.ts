import InstrumentController from "./Instrument.controller"
import { getIdValidate } from "../utils/validators/validators";
const { check } = require('express-validator');

export class InstrumentRoutes{

    private postInstrumentValidate() : any[] {
        let validations = [
            check('name').exists().withMessage('name Required'),
            check('type').exists().withMessage('type Required'),
        ];

        return validations;
    }

    private putInstrumentValidate() : any[] {
        let validations = this.postInstrumentValidate();
        validations.push(getIdValidate())
        return validations;
    }

    public setRoutes(app){
        app.route('/instrument')
        .get(InstrumentController.retrieveAll.bind(InstrumentController.retrieveAll))
        .post(this.postInstrumentValidate(),InstrumentController.create.bind(InstrumentController.create))
        .put(this.putInstrumentValidate(),InstrumentController.update.bind(InstrumentController.update))
        app.route('/instrument/:id')
        .get(InstrumentController.retrieveById.bind(InstrumentController.retrieveById))
        .put(InstrumentController.update.bind(InstrumentController.update))
        .post(InstrumentController.delete.bind(InstrumentController.delete))
        .delete(InstrumentController.remove.bind(InstrumentController.remove))

    }
}

export default new InstrumentRoutes();