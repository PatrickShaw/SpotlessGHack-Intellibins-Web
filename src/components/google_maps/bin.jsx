import React, {Component} from 'react';
import { Marker, InfoWindow } from "react-google-maps";

class Bin extends Component {
    constructor(props) {
        super(props);
        this.state = {showInfoWindow: false};
        this.onMarkerClick = this.onMarkerClick.bind(this);
    }

    onMarkerClick() {
        this.setState({showInfoWindow: true});
    }

    render() {
        return (
            <Marker
                {...this.props.marker}
                onClick={() => this.onMarkerClick()}
            >
                {this.state.showInfoWindow === true &&
                (this.props.marker.assigned ? (
                        <InfoWindow>
                            <button onClick={() => this.props.unassign(this.props.id)}>Unassign</button>
                        </InfoWindow>) :
                        (<InfoWindow>
                            <button onClick={() => this.props.assign(this.props.id)}>Assign</button>
                        </InfoWindow>)
                )
                }
            </Marker>
        );
    }
}

export default Bin;
