import { assert } from 'chai'
import ConcertRepository from '../concert/Concert.repository'
import { Concert } from 'concert/Concert.interface'
import { App } from '../app';

describe('ConcertRepository', () => {


    it('should check the CRUD of concerts', async () => {

        let concert = {} as Concert;
        concert.isActive = true;
        concert._id = "5d889407c6c25966d82af062"
        concert.dateStart = new Date();
        concert.dateEnd = ( new Date( concert.dateStart.getDate()-2 ))
        concert.createdAt = new Date('2019-09-19T09:49:37.169Z');
        concert.updatedAt = new Date('2019-09-19T09:49:37.169Z');
        concert.__v = 0

        let result = await ConcertRepository.create(concert);

        assert(concert.dateEnd == result.dateEnd, 'Failed creating a new concert')
        
        concert = await ConcertRepository.retrieveById(result._id);
        concert.dateEnd = ( new Date( concert.dateStart.getDate()+1 ))

        result = await ConcertRepository.update(result._id,concert);
        assert(concert.dateEnd == result.dateEnd, 'Failed updating a concert')

        result = await ConcertRepository.delete(result._id);
        assert(result.isActive == false, 'Failed deleting a concert')
        
        await ConcertRepository.remove(result._id);
        result = await ConcertRepository.retrieveById(result._id);
        assert(result == null, 'Failed removing a concert')

    })


    it('should check integrity of the concerts', async () => {
        let concert = {} as Concert
        concert.dateStart = new Date();
        concert.dateEnd = ( new Date( concert.dateStart.getDate()-1 ))
        concert = await ConcertRepository.create(concert);
        assert(concert != null, 'Integrity failed, dateStart > dateEnd');
    });


});