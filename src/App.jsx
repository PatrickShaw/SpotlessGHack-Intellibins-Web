import React, {Component} from 'react';
import {BinList} from './components/bin_list';
import './App.css';
import BlobFish from './drawables/blobfish.jpeg';
import {get_bins_url} from './urls/api_urls';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import {List, ListItem} from 'material-ui/List';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Drawer from 'material-ui/Drawer';
injectTapEventPlugin();
class App extends Component {
    constructor() {
        super();
        const parent = this;
        this.state = {bins:[]};
        const get_bins_request = new XMLHttpRequest();
        get_bins_request.addEventListener('load', () => {
            parent.setState({bins: JSON.parse(get_bins_request.response)});
        });
        get_bins_request.open('GET', get_bins_url());
        get_bins_request.send();
    }
    render() {
        const parent = this;
        return  <MuiThemeProvider>
                    <div className="root">
                        <Drawer>
                            {parent.state.bins != null ? <BinList bins={parent.state.bins}/> : false}
                        </Drawer>
                    </div>
                </MuiThemeProvider>
    }
}

export default App;
