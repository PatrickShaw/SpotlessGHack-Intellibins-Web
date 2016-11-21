import React, {Component} from 'react';
import './App.css';
import GoogleMaps from './components/google_maps';

const API_ENDPOINT = 'http://127.0.0.1:8081';

function request(url, options, callback) {
    const data = options.data || null;
    const method = options.method || null;
    const xmlRequest = new XMLHttpRequest();
    xmlRequest.addEventListener('load', () => callback(null, xmlRequest.response));
    xmlRequest.open(method, url);
    xmlRequest.send(data);
}

class App extends Component {
    constructor() {
        super();

        this.state = {bins: []};
        request(API_ENDPOINT + '/api/bin/list', {method: 'GET'}, (err, data) => {
            this.setState({bins: JSON.parse(data)});
        });
    }

    assignBin(binIndex) {
        const options = {
            data: {binId: binIndex}.toString(),
            method: 'POST'
        };
        request(API_ENDPOINT + '/api/bin/assign', options, () => {
            this.setState({bins: this.state.bins.map((bin, index) => {
                if (index === binIndex) {
                    bin['assigned'] = true;
                }
                return bin;
            })});
        });
    }

    unassignBin(binIndex) {
        const options = {
            data: {binId: binIndex}.toString(),
            method: 'POST'
        };
        request(API_ENDPOINT + '/api/bin/unassign', options, () => {
            this.setState({bins: this.state.bins.map((bin, index) => {
                if (index === binIndex) {
                    bin['assigned'] = false;
                }
                return bin;
            })});
        });
    }

    render() {
        return (
            <GoogleMaps
                assignBin={this.assignBin.bind(this)}
                unassignBin={this.unassignBin.bind(this)}
                markers={this.state.bins}
            />
        );
    }
}

export default App;
