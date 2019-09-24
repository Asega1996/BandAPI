import { App } from './app';
import { env } from "./config/config";

const APP = new App();

APP.run(env.PORT);


function json2array(json){
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result.push(json[key]);
    });
    return result;
}