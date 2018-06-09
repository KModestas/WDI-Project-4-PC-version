const User = require('../models/user');


function TrackGig(req, res, next) {
  User
    .findById(req.currentUser.id)
    .then(user => {
      if(!user) return res.notFound();
      user.gigs.push(req.body);
      return user.save();
    })
    .then(user => {
      res.json(user);
    })
    .catch(next);
}

function unTrackGig(req, res, next) {

  const gig = req.body;

  User
    .findById(req.currentUser.id)
    .then(user => {
      if (!user) return res.notFound();

      const index = user.gigs.indexOf(gig);
      user.gigs.splice(index, 1);

      return user.save();
    })
    .then(user => {
      res.json(user);
    })
    .catch(next);

}

// * unTrackGig
// stores the gig id sent from the put request in GigsShow untrackGig id in gig constant
// then finds the Users Id (which it has access to from secure route)
// then finds the index of the gig in users gigs array
// then splices that gig from the array and saves the user schema


function show(req, res, next) {
  User
    .findById(req.currentUser.id)
    .then(user => {
      if(!user) return res.notFound();
      return res.json(user);
    })
    .catch(next);
}

module.exports = {
  TrackGig,
  unTrackGig,
  show
};
