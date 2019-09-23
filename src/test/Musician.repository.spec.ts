import { assert } from 'chai'
import MusicianRepository from '../musician/Musician.repository'
import { Musician } from 'musician/Musician.interface';
import { Instrument } from 'instruments/Instrument.interface'
import { App } from '../app';

describe('MusicianRepository', () => {

    //Setup APP
    const PORT = 3000;
    const APP = new App();
    APP.run(PORT);

    it('should check the population of the band', async () => {
        let musicians: Array<Musician> = new Array();
        musicians = await MusicianRepository.retrieveAll({})
        assert(musicians.length >= 1, 'The band must have at least one member');
    });

    it('should check the CRUD of musicians', async () => {

        let instrument = {} as Instrument;
        instrument.name = 'test';
        instrument.type = 'test';
        let musician = {} as Musician;
        musician.isActive = true;
        musician._id = "5d889407c6c25966d82af062"
        musician.firstName = 'firstName';
        musician.lastName = 'lastName';
        musician.createdAt = new Date('2019-09-19T09:49:37.169Z');
        musician.updatedAt = new Date('2019-09-19T09:49:37.169Z');
        musician.phone = 666666666;
        musician.__v = 0

        musician.instrument = instrument

        let result = await MusicianRepository.create(musician);

        assert(musician.firstName == result.firstName, 'Failed creating a new musician')
        
        musician = await MusicianRepository.retrieveById(result._id);
        musician.firstName = 'newFirstName';

        result = await MusicianRepository.update(result._id,musician);
        assert(musician.firstName == result.firstName, 'Failed updating a musician')

        result = await MusicianRepository.delete(result._id);
        assert(result.isActive == false, 'Failed deleting a musician')
        
        await MusicianRepository.remove(result._id);
        result = await MusicianRepository.retrieveById(result._id);
        assert(result == null, 'Failed removing a musician')

    })

});