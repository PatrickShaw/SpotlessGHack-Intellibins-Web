import React, {Component} from 'react';
import {BinList} from './components/bin_list';
import './App.css';
import {getBins, assignBin, unassignBin} from './urls/api';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Drawer from 'material-ui/Drawer';
import GoogleMaps from './components/google_maps';
injectTapEventPlugin();

class App extends Component {
    constructor() {
        super();
        this.state = {bins:[]};
        getBins((err, data) => {
            this.setState({bins: JSON.parse(data)});
        });
    }

    assignBin(binIndex) {
        assignBin(binIndex, (err, data) => {
            this.setState({bins: JSON.parse(data)});
        });
    }

    unassignBin(binIndex) {
        unassignBin(binIndex, (err, data) => {
            this.setState({bins: JSON.parse(data)});
        });
    }

    render() {
        const parent = this;
        return  <MuiThemeProvider>
                    <div className="root">
                        <Drawer>
                            {parent.state.bins != null ? <BinList bins={parent.state.bins}/> : false}
                        </Drawer>

                        <GoogleMaps
                            assignBin={this.assignBin.bind(this)}
                            unassignBin={this.unassignBin.bind(this)}
                            markers={this.state.bins}
                        />
                    </div>
                </MuiThemeProvider>
    }
}

export default App;
