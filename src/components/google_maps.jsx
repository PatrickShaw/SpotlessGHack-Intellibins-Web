import React, {Component} from 'react';
import GoogleMap from "google-map-react";
import Bin from './google_maps/bin';

class GoogleMaps extends Component {
    constructor(props) {
        super(props);
        this.assign = this.assign.bind(this);
        this.unassign = this.unassign.bind(this);
        this.setHeatMap = this.setHeatMap.bind(this);
    }

    assign(targetIndex) {
        this.props.assignBin(targetIndex);
    }

    unassign(targetIndex) {
        this.props.unassignBin(targetIndex);
    }

    setHeatMap(enable) {
        if (this.maps === undefined) {
            console.log('Heat map is undefined');
            return;
        }

        if (!enable && this.heatmap == undefined) {
            return;
        }

        if (!enable) {
            return this.heatmap.setMap(null);
        }

        if (this.heatmap === undefined) {
            this.heatmap = new this.maps.visualization.HeatmapLayer({
                radius: 75,
                data: this.props.markers.map((marker) => {
                    return {
                        location: new this.maps.LatLng(marker.coord[0], marker.coord[1]),
                        weight: marker.full
                    }
                })
            });
        }

        this.heatmap.setMap(this.map);
    }

    render() {
        return (
            <GoogleMap
                zoom={19}
                center={{lat: -37.813451, lng: 144.963256}}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({map, maps}) => {
                    this.map = map;
                    this.maps = maps;
                    this.setHeatMap();
                }}
            >
                {this.props.markers.map((marker, index) => (
                    <Bin
                        ref={this.setHeatMap(this.props.mapLayer.heatmap)}
                        key={index}
                        setBinFocus={this.props.setBinFocus}
                        removeFocus={this.props.removeFocus}
                        marker={marker}
                        lat={marker.coord[0]}
                        lng={marker.coord[1]}
                        unassign={this.unassign}
                        assign={this.assign}
                    />
                ))}
            </GoogleMap>
        );
    }
}

export default GoogleMaps;
