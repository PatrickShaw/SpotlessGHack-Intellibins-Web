import React, {Component} from 'react';
import './bin.css'
import {binStyles} from './bin_styles.js';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

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
            <div
                className="bin"
                style={binStyles}
                onClick={() => this.onMarkerClick()}
            >
                {this.state.showInfoWindow === true && (this.props.assigned ? (
                    <Card className="info-box">
                        <CardActions>
                            <FlatButton label="Unassign" onClick={() => this.props.unassign(this.props.id)}/>
                        </CardActions>
                    </Card>) :
                    (<Card className="info-box">
                        <CardActions>
                            <FlatButton label="Assign" onClick={() => this.props.assign(this.props.id)}/>
                        </CardActions>
                    </Card>))
                }
            </div>
        );
    }
}

export default Bin;
