import { assert } from 'chai'
import InstrumentRepository from '../instruments/Instrument.repository'
import { Instrument } from 'instruments/Instrument.interface'
import { App } from '../app';

describe('InstrumentsRepository', () => {

    it('should check the population of the instruments', async () => {
        let musicians: Array<Instrument> = new Array();
        musicians = await InstrumentRepository.retrieveAll({})
        assert(musicians.length >= 1, 'The band must have at least one member');
    });

    it('should check the CRUD of instruments', async () => {

        let instrument = {} as Instrument;
        instrument.name = 'test';
        instrument.type = 'test';
        instrument.isActive = true;
        instrument._id = "5d889407c6c25966d82af062"
        instrument.createdAt = new Date('2019-09-19T09:49:37.169Z');
        instrument.updatedAt = new Date('2019-09-19T09:49:37.169Z');
        instrument.__v = 0

        let result = await InstrumentRepository.create(instrument);

        assert(instrument.name == result.name, 'Failed creating a new musician')
        
        instrument = await InstrumentRepository.retrieveById(result._id);
        instrument.name = 'newName';

        result = await InstrumentRepository.update(result._id,instrument);
        assert(instrument.name == result.name, 'Failed updating a musician')

        result = await InstrumentRepository.delete(result._id);
        assert(result.isActive == false, 'Failed deleting a musician')
        
        await InstrumentRepository.remove(result._id);
        result = await InstrumentRepository.retrieveById(result._id);
        assert(result == null, 'Failed removing a musician')

    })

});