import React, {Component} from 'react';
import './bin.css'
import {binStyles} from './bin_styles.js';
import {Card, CardActions, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import img from "../../drawables/marker.svg";

class Bin extends Component {
    constructor(props) {
        super(props);
        this.state = {showInfoWindow: false};
        this.showWindow = this.showWindow.bind(this);
        this.hideWindow = this.hideWindow.bind(this);
    }

    showWindow() {
        this.setState({showInfoWindow: true});
    }

    hideWindow() {
        this.setState({showInfoWindow: false});
    }

    render() {
        return (
            <div
                className="bin"
                style={binStyles}
                onClick={() => this.showWindow()}
            >
                {this.state.showInfoWindow &&
                <Card className="info-box">
                    <div className="info-box-cross" onClick={(e) => {this.hideWindow(); e.stopPropagation();}}>
                        ×
                    </div>
                    <CardText>
                        <div className="info-box-image">
                            <img src={img} />
                        </div>
                        <div className="info-box-text">
                            <strong>ID:</strong> <span>{this.props.marker.id}</span><br/>
                            <strong>Full percentage:</strong> <span>{this.props.marker.full}</span>
                        </div>
                    </CardText>
                    <CardActions className="info-box-card-actions">
                        {this.props.marker.assigned ?
                            (<FlatButton label="Unassign" onClick={(e) => {
                                this.props.unassign(this.props.id);
                                e.preventDefault()
                            }}/>) :
                            (<FlatButton label="Assign" onClick={(e) => {
                                this.props.assign(this.props.id);
                                e.preventDefault()
                            }}/>)
                        }
                    </CardActions>
                </Card>
                }
            </div>
        );
    }
}

export default Bin;
