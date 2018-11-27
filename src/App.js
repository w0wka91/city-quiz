import React, { Component } from "react";
import Map from "pigeon-maps";
import Marker from "pigeon-marker";
import capitalCities from "./capitalCities";
import { getDistance, convertUnit } from "geolib";

class App extends Component {
  defaultCenter = [50.520008, 10];
  defaultZoom = 4.5;
  state = {
    center: this.defaultCenter,
    zoom: this.defaultZoom,
    score: 0,
    currentCityIndex: 0,
    kilometersLeft: 1500,
    markerPosition: null,
    distance: null
  };
  calcDistance = () => {
    let distance = getDistance(capitalCities[this.state.currentCityIndex], {
      latitude: this.state.markerPosition[0],
      longitude: this.state.markerPosition[1]
    });
    distance = convertUnit("km", distance, 0);
    this.setState({
      distance,
      center: [
        capitalCities[this.state.currentCityIndex].latitude,
        capitalCities[this.state.currentCityIndex].longitude
      ]
      //zoom: 7
    });
  };
  calcRemainingKm = () => {
    const { distance, score, kilometersLeft, currentCityIndex } = this.state;
    this.setState({
      center: this.defaultCenter,
      zoom: this.defaultZoom,
      score: distance <= 50 ? score + 1 : score,
      currentCityIndex: currentCityIndex + 1,
      kilometersLeft: kilometersLeft - distance,
      markerPosition: null,
      distance: null
    });
  };
  render() {
    return (
      <>
        <span>{this.state.kilometersLeft} kilometers left</span>
        {this.state.distance ? (
          <span>
            The distance between your marker and "
            {capitalCities[this.state.currentCityIndex].capitalCity}" is{" "}
            {this.state.distance} kilometers
          </span>
        ) : (
          <span>
            Select the location of "
            {capitalCities[this.state.currentCityIndex].capitalCity}"
          </span>
        )}
        <Map
          provider={(x, y, z) =>
            `https://api.mapbox.com/styles/v1/w0wka91/cjozn6qj6kwhp2rlm2m8xtoa7/tiles/256/${z}/${x}/${y}?access_token=pk.eyJ1IjoidzB3a2E5MSIsImEiOiJjam96bDZ3ZWgwOHV5M3FwZjQ5Z29kY2w5In0.COtOH3pcEaqshmLryd8yAg#12.0/48.866500/2.317600/0`
          }
          center={this.state.center}
          onClick={({ latLng }) => this.setState({ markerPosition: latLng })}
          zoom={this.state.zoom}
          width={800}
          height={600}
        >
          {this.state.markerPosition && (
            <Marker anchor={this.state.markerPosition} />
          )}
          {this.state.distance && (
            <Marker
              payload={capitalCities[this.state.currentCityIndex].capitalCity}
              anchor={[
                capitalCities[this.state.currentCityIndex].latitude,
                capitalCities[this.state.currentCityIndex].longitude
              ]}
            />
          )}
        </Map>
        <button
          onClick={
            this.state.distance ? this.calcRemainingKm : this.calcDistance
          }
          disabled={this.state.markerPosition ? false : true}
        >
          {this.state.distance ? "Next" : "Confirm"}
        </button>
      </>
    );
  }
}

export default App;
