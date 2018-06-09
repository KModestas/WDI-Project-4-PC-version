import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import _ from 'lodash';


class Profile extends Component {
  state = {
    user: { gigs: [] },
    sortBy: 'date',
    sortDirection: 'asc'
  }

  componentDidMount() {
    Axios
      .get('/api/profile', {
        headers: { Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(res => this.setState({
        user: res.data
      }))
      .catch(err => console.log(err));
  }

  render() {

    const { sortBy, sortDirection } = this.state;
    const orderedGigs = _.orderBy(this.state.user.gigs, [sortBy], [sortDirection]);

    return(
      <div className="container-fluid">
        <div className="marginDiv"></div>
        <h2 className="green">Hello {this.state.user.username}, these are all of the Gigs you are tracking (In Order of Date)</h2>
        <div className="block row align-items-center justify-content-center">


          { orderedGigs.map(gig => (
            <div key={gig.id}>
              <div className="col-lg-12">
                <Link to={'/gigs/' + gig.skiddleId}><h3 className="gigShadow ">{ gig.name }</h3></Link>
                <Link to={`/gigs/${gig.skiddleId}`}>
                  <img src={gig.image} />
                </Link>
                <h3 className="white">{ gig.date }</h3>
              </div>
            </div>
          ))
          }
        </div>
      </div>
    );
  }
}

export default Profile;

// first makes axios request to profile route in backend, sends the token in the header so that it can bypass the secureRoute.
// runs the users show function in backend which finds the current user in DB using the id (has access to id from the secureroute) then returns the user data as JSON.
// this gives us access to all the referenced gigs schema on the user schema.
