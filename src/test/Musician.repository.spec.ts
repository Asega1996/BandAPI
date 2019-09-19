import { assert } from 'chai'
import MusicianRepository from '../musician/Musician.repository'
import { Musician } from 'musician/Musician.interface';
import { App } from '../app';

describe('MusicianRepository', () => {

    //Start the APP
    const PORT = 3000;
    const APP = new App();
    APP.run(PORT);

    it('should check the population of the band', async () => {
        let musicians: Array<Musician> = new Array();
        musicians = await MusicianRepository.retrieveAll({})
        assert(musicians.length >= 1, 'The band must have at least one member');
    });

});