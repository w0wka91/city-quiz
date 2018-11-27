import React, { Component } from "react";
import Map from "pigeon-maps";
import Marker from "pigeon-marker";

class App extends Component {
  state = {
    markerPosition: null
  };
  render() {
    return (
      <div className="App">
        <Map
          provider={(x, y, z) =>
            `https://api.mapbox.com/styles/v1/w0wka91/cjozn6qj6kwhp2rlm2m8xtoa7/tiles/256/${z}/${x}/${y}?access_token=pk.eyJ1IjoidzB3a2E5MSIsImEiOiJjam96bDZ3ZWgwOHV5M3FwZjQ5Z29kY2w5In0.COtOH3pcEaqshmLryd8yAg#12.0/48.866500/2.317600/0`
          }
          center={[50.520008, 10]}
          onClick={({ event, latLng, pixel }) =>
            this.setState({ markerPosition: latLng })
          }
          zoom={4.5}
          width={800}
          height={600}
        >
          {this.state.markerPosition && (
            <Marker anchor={this.state.markerPosition} />
          )}
        </Map>
      </div>
    );
  }
}

export default App;
