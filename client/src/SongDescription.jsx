import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

// ----------------------------------------- //

class SongDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: null
    }
    this.updateDescription = this.updateDescription.bind(this);
    this.getIdAndUpdateDOM = this.getIdAndUpdateDOM.bind(this);
  }

  updateDescription(data) {
    console.log('Here is the data sent to updateDescription: ', data);
    this.setState({
      description: data.description
    });
  }

  getIdAndUpdateDOM() {
    let splitUrl = window.location.pathname.split('/');
    let songId = splitUrl.filter(function(id) {
      return parseInt(id);
    });
    console.log('Song ID: ', songId);
    axios.get(`/songDescription/${songId}`)
      .then((response) => {
        console.log('Data: ', response.data.data);
        this.updateDescription(response.data.data);
      })
      .catch((error) => {
        console.log('Error rendering initial song description: ', error);
      });
  }

  componentDidMount() {
    this.getIdAndUpdateDOM();
  }

  render() {
    return (
      <div className="cam song-description">
        <p className="description"> {this.state.description} </p>
      </div>
    )
  }
}

export default SongDescription;