import React, {Component} from 'react';
import GoogleMap from "google-map-react";
import Bin from './google_maps/bin';

class GoogleMaps extends Component {
    constructor(props) {
        super(props);
        this.assign = this.assign.bind(this);
        this.unassign = this.unassign.bind(this);
    }

    assign(targetIndex) {
        this.props.assignBin(targetIndex);
    }

    unassign(targetIndex) {
        this.props.unassignBin(targetIndex);
    }

    render() {
        return (
            <GoogleMap
                zoom={19}
                center={{lat: -37.813451, lng: 144.963256}}
            >
                {this.props.markers.map((marker, index) => (
                    <Bin
                        id={marker.id}
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
