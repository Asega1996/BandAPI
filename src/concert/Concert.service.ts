import ConcertRepository from './Concert.repository'
import { Concert } from "./Concert.interface";
import { resolve } from 'path';
import { rejects } from 'assert';

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');



const TOKEN_PATH = 'token.json';

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret,redirect_uris[0]);
 
  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function authorizeCreation(credentials, callback, event): Promise<Concert | null> {
  return new Promise((res,rej)=>{

    const {client_secret, client_id, redirect_uris} = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret,redirect_uris[0]);
   
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      res(callback(oAuth2Client,event));
    });

  })

}

function authorizeDelete(credentials, callback, id) : Promise<string> {
  
  return new Promise((res,rej) => {
    const {client_secret, client_id, redirect_uris} = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret,redirect_uris[0]);
   
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      res(callback(oAuth2Client,id));
    });

  })

}




function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt : 'consent'
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => { 
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}


async function listEvents(auth) {
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.list({
    calendarId: 'alum.uca.es_8ae6btd4gija8fe70sqc8a9864@group.calendar.google.com',
    singleEvents: true,
    orderBy: 'startTime',
  }, async (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = res.data.items;
    if (events.length) {
      let concerts = await ConcertRepository.retrieveAll();
      console.log('Upcoming events:');
      events.map((event, i) => {
        
        concerts.forEach(concert => {
          if(concert.name == event.summary && concert.googleCalendarId == ''){ 
            concert.googleCalendarId = event.id
            ConcertRepository.update(concert.id,concert);
            console.log(concerts[i].name + 'synchronized')
          }
        });
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
      });
    } else {
      console.log('No upcoming events found.');
    } 
  });
}


function createEvent(auth,event) : Promise<Concert> {

  return new Promise((res, rej) => {
    const calendar = google.calendar({version: 'v3', auth});
  calendar.events.insert({
    auth: auth,
    calendarId: 'alum.uca.es_8ae6btd4gija8fe70sqc8a9864@group.calendar.google.com',
    resource: event,
  }, function(err, event2) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      rej();
    }
    console.log('Event created: %s', event2);
    let concert = {} as Concert;
    concert.name = event.summary
    concert.dateStart = event.start.dateTime
    concert.dateEnd = event.end.dateTime
    concert.googleCalendarId = event2.data.id
    ConcertRepository.create(concert);
    res(concert);
  });
  });
}


async function updateEvent(auth,event) : Promise<Concert> {

  var eventUpdated = {
    'summary': event.name,
    'location': '',
    'description': '',
    'start': {
      'dateTime': event.dateStart,
    },
    'end': {
      'dateTime': event.dateEnd,
    }
  };

  let concert = await ConcertRepository.retrieveById(event._id);
  let googleCalendarId = concert.googleCalendarId;

  return new Promise((res, rej) => {
    const calendar = google.calendar({version: 'v3', auth});
    calendar.events.update({
    auth: auth,
    eventId: googleCalendarId,
    calendarId: 'alum.uca.es_8ae6btd4gija8fe70sqc8a9864@group.calendar.google.com',
    resource: eventUpdated,
  }, function(err, event2) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      rej();
    }
    console.log('Event updated: %s', event2);
    let concert = {} as Concert;
    concert._id = event._id
    concert.name = event.name
    concert.dateStart = event.dateStart
    concert.dateEnd = event.dateEnd
    concert.googleCalendarId = event2.data.id
    res(concert);
  });
  });
}

function deleteEvent(auth,id) : Promise<string> {

  return new Promise((res,rej) => {
    const calendar = google.calendar({version: 'v3', auth});
    calendar.events.delete({
      auth: auth,
      eventId: id,
      calendarId: 'alum.uca.es_8ae6btd4gija8fe70sqc8a9864@group.calendar.google.com',
    }, function(err, event) {
      if (err) {
        console.log('There was an error contacting the Calendar service: ' + err);
        rej(err);
      }
      res(id);
    });
  });
  
}



export class ConcertService {


    /**
     *
     */
    constructor() {
      this.fetchCalendar()
    }

    fetchCalendar(){ 


      fs.readFile('client_secret.json', async (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Calendar API.
        await authorize(JSON.parse(content), listEvents);
      });
    }

    public retrieveAll(search = {}): Promise<Concert[]> {
        return ConcertRepository.retrieveAll(search);
      }
    
    public retrieveById(id: string): Promise<Concert> {
        return ConcertRepository.retrieveById(id).then(Concert => {
          return Concert;
        });
      }
    
    public async create(concert: Concert): Promise<any> {

      var event = {
        'summary': concert.name,
        'location': '',
        'description': '',
        'start': {
          'dateTime': concert.dateStart,
        },
        'end': {
          'dateTime': concert.dateEnd,
        }
      };

      return new Promise((res, rej) => {
        fs.readFile('client_secret.json', async (err, content) => {
          if (err) return console.log('Error loading client secret file:', err);
          // Authorize a client with credentials, then call the Google Calendar API.
          let resolv = await authorizeCreation(JSON.parse(content), createEvent ,event);
          res(resolv);
        });
      })
      
      //return (concert.dateStart <= concert.dateEnd || concert.dateEnd == null || concert.dateStart == null)?
        // ConcertRepository.create(concert) : ConcertRepository.retrieveById('11111111111111111111111a');
         
    }
    
    public async update(id: string, toUpdate: Concert): Promise<Concert | null> {

      let concertCheck = await ConcertRepository.retrieveById(id);
      if(concertCheck != null){
        fs.readFile('client_secret.json', async (err, content) => {
          if (err) return console.log('Error loading client secret file:', err);
          // Authorize a client with credentials, then call the Google Calendar API.
          let res = await authorizeCreation(JSON.parse(content), updateEvent ,toUpdate);

          return this.retrieveById(res._id).then(Concert => {
            toUpdate._id = Concert._id;
            return ConcertRepository.update(Concert._id, toUpdate);
          });
        });
      }else{
        return ConcertRepository.retrieveById('11111111111111111111111a')
      }

    }
    
    public delete(id: string): Promise<Concert> {
        return ConcertRepository.delete(id);
    }

    public async remove(id: string): Promise<Concert> {

      
      let concert = await ConcertRepository.retrieveById(id);
      concert = await ConcertRepository.retrieveById(id);
      
      if(concert != null){
        
        fs.readFile('client_secret.json', async (err, content) => {
          if (err) return console.log('Error loading client secret file:', err);
          // Authorize a client with credentials, then call the Google Calendar API.
          authorizeDelete(JSON.parse(content), deleteEvent ,concert.googleCalendarId);
          
        });
        return ConcertRepository.remove(id);
      }
      else{
        return ConcertRepository.retrieveById('11111111111111111111111a')
      }
  }
    
}

export default new ConcertService();