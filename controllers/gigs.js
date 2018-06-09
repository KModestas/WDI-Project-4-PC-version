// const Gig = require('../models/gig');
const rp = require('request-promise');




function gigsIndex(req, res) {
  // put in here a request to the skiddle api that shows all events in london and returns it as json


  rp({
    url: 'http://www.skiddle.com/api/v1/events/search',
    method: 'GET',
    json: true, // asking for json format back from their api
    qs: {
      api_key: process.env.SKIDDLE_API_KEY,
      latitude: 51.515030,
      longitude: -0.073162,
      radius: 5,
      eventcode: 'LIVE',
      limit: 50
    }
  })
    .then((response) => {
      res.json(response); // res is sending the data to client side
    })
    .catch((err) => {
      res.json(err);
    });
}



function gigsShow(req, res) {
  // put in here a request to the skiddle api that shows one event and returns it as json

  rp({
    url: `http://www.skiddle.com/api/v1/events/${req.params.id}`,
    method: 'GET',
    json: true, // asking for json format back from their api
    qs: {
      api_key: process.env.SKIDDLE_API_KEY
    }
  })
    .then((response) => {
      // in here, find current user and send back as a combined object
      res.json(response); // res is sending the data to client side
    })
    .catch((err) => {
      res.json(err);
    });
}


module.exports = {
  index: gigsIndex,
  show: gigsShow
};
