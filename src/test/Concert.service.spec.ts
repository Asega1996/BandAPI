import { assert } from 'chai'
import { ConcertService } from '../concert/Concert.service'
import { Concert } from 'concert/Concert.interface'
import { ImportMock, MockManager } from 'ts-mock-imports';
import { App } from '../app';
import { before } from 'mocha';
import * as ConcertRepository from '../concert/Concert.repository';

describe('ConcertService', () => {

    let concertRepositoryMock : MockManager<ConcertRepository.ConcertRepository>
    let concertService : ConcertService

    beforeEach(() =>{
        concertRepositoryMock  = 
            ImportMock.mockClass<ConcertRepository.ConcertRepository>(ConcertRepository, 'ConcertRepository');
        concertService = new ConcertService()
    })

    it('should create google calendar', async () => {

        let concert = {} as Concert;
        concert.name = 'OneDayEvent';
        concert.dateStart = new Date();
        concert.dateEnd = new Date();
        concert.dateEnd.setHours(concert.dateStart.getHours() +2);
        
        concertRepositoryMock.mock('create', concert)

        concertService = new ConcertService();
        let concertAux = await concertService.create(concert);
        console.log(concertAux)
        await concertService.remove(concertAux._id);

        assert(concertAux.googleCalendarId != '','Fail creating in calendar')

    });


    afterEach(() =>{
        concertRepositoryMock.restore();
    })

});