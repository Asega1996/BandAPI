const { check } = require('express-validator');
const { validationResult } = require('express-validator');


export function checkValidationErrors(req,res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    }
}

export function getIdValidate(){
    return check('_id').exists().withMessage('_id Required')
}