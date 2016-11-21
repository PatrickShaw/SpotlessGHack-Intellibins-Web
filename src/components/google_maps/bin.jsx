import React, {Component} from 'react';
import './bin.css'
import {binStyles} from './bin_styles.js';
import {Card, CardActions, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import img from "../../drawables/marker.svg";

class Bin extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                className="bin"
                style={binStyles}
                onClick={() => this.props.setBinFocus(this.props.marker.id)}
            >
                {this.props.marker.focused &&
                <Card className="info-box">
                    <div className="info-box-cross" onClick={(e) => {this.props.removeFocus(); e.stopPropagation();}}>
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
                                this.props.unassign(this.props.marker.id);
                                e.preventDefault()
                            }}/>) :
                            (<FlatButton label="Assign" onClick={(e) => {
                                this.props.assign(this.props.marker.id);
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
