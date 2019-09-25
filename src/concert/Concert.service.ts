import ConcertRepository from './Concert.repository'
import { Concert } from "./Concert.interface";

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');


export function json2array(json){
  var result = [];
  var keys = Object.keys(json);
  keys.forEach(function(key){
      result.push(json[key]);
  });
  return result;
}

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

function authorizeCreation(credentials, callback, event) {
  const {client_secret, client_id, redirect_uris} = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret,redirect_uris[0]);
 
  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client,event);
  });
}

function authorizeDelete(credentials, callback, id) {
  const {client_secret, client_id, redirect_uris} = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret,redirect_uris[0]);
 
  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client,id);
  });
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


function listEvents(auth) {
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
            console.log(concerts[i].name)
            concert.googleCalendarId = event.id
            ConcertRepository.update(concert.id,concert);
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


function createEvent(auth,event) {

  
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.insert({
    auth: auth,
    calendarId: 'alum.uca.es_8ae6btd4gija8fe70sqc8a9864@group.calendar.google.com',
    resource: event,
  }, function(err, event) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event.htmlLink);
  });
}

function deleteEvent(auth,id) {

  
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.delete({
    auth: auth,
    eventId: id,
    calendarId: 'alum.uca.es_8ae6btd4gija8fe70sqc8a9864@group.calendar.google.com',
  }, function(err, event) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event deleted');
  });
}



export class ConcertService {


    /**
     *
     */
    constructor() {
      this.setConfig();
      
    }

    setConfig(){


      fs.readFile('client_secret.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Calendar API.
        authorize(JSON.parse(content), listEvents);
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
    
    public create(concert: Concert): Promise<Concert | null> {

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

      fs.readFile('client_secret.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Calendar API.
        authorizeCreation(JSON.parse(content), createEvent ,event);
      });

     
      return (concert.dateStart <= concert.dateEnd || concert.dateEnd == null || concert.dateStart == null)?
         ConcertRepository.create(concert) : ConcertRepository.retrieveById('11111111111111111111111a');
         
    }
    
    public update(id: string, toUpdate: Concert): Promise<Concert | null> {
    
        return this.retrieveById(id).then(Concert => {
          toUpdate._id = id;
          return ConcertRepository.update(Concert._id, toUpdate);
        });
    
      }
    
    public delete(id: string): Promise<Concert> {
        return ConcertRepository.delete(id);
    }

    public async remove(id: string): Promise<Concert> {

      this.setConfig();

      let concert = await ConcertRepository.retrieveById(id);
      if(concert != null){
        fs.readFile('client_secret.json', (err, content) => {
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