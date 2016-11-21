import React, {Component} from 'react';
import { withGoogleMap, GoogleMap } from "react-google-maps";
import Bin from './google_maps/bin';

const GettingStartedGoogleMap = withGoogleMap(props => (
    <GoogleMap
        defaultZoom={19}
        defaultCenter={{lat: -37.813451, lng: 144.963256}}
    >
        {props.markers.map((marker, index) => (
            <Bin
                id={index}
                marker={marker}
                unassign={props.unassign}
                assign={props.assign}
             />
        ))}
    </GoogleMap>
));

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
            <GettingStartedGoogleMap
                markers={this.props.markers}
                assign={this.assign}
                unassign={this.unassign}
                containerElement={
                    <div style={{height: `100%`}}/>
                }
                mapElement={
                    <div style={{height: `100%`}}/>
                }
            />
        );
    }
}

export default GoogleMaps;
