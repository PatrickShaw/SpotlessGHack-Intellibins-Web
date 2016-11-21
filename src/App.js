import React, {Component} from 'react';
import BinList from './components/bin_list';
import BinSort from './components/bin_sort';

import './App.css';
import {getBins, assignBin, unassignBin} from './urls/api';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Drawer from 'material-ui/Drawer';
import GoogleMaps from './components/google_maps';
injectTapEventPlugin();

const SORT_FULL = 1;
const SORT_ID = 2;

class App extends Component {
    constructor() {
        super();
        this.state = {
            bins:[],
            sort: SORT_FULL,
            mapLayer: {
                heatmap: false
            }
        };
        getBins((err, data) => {
            const bins = JSON.parse(data).map((bin) => {
                bin['focused'] = false;
                return bin;
            });
            const sortedBins = this._sortBinsByFull(bins);
            this.setState({
                bins: sortedBins,
                sort: SORT_FULL,
                mapLayer: {
                    heatmap: false
                }
            });
        });
        this.setBinFocus = this.setBinFocus.bind(this);
        this.removeFocus = this.removeFocus.bind(this);
        this.toggleHeatmap = this.toggleHeatmap.bind(this);
        this.sortBy = this.sortBy.bind(this);
    }

    _sortBinsByFull(bins) {
        return bins.sort((bin1, bin2) => {
            return bin2.full - bin1.full;
        });
    }

    _sortBinsById(bins) {
        return bins.sort((bin1, bin2) => {
            return bin1.id - bin2.id;
        });
    }

    sortBy(sortId) {
        let bins = [];
        switch(sortId) {
            case SORT_ID:
                bins = this._sortBinsById(this.state.bins);
                break;
            case SORT_FULL:
                bins = this._sortBinsByFull(this.state.bins);
                break;
            default:
                bins = this._sortBinsByFull(this.state.bins);
                break;
        }

        this.setState(() => {
            return {
                bins: bins,
                sort: sortId,
                mapLayer: this.state.mapLayer
            }});
    }

    toggleHeatmap() {
        this.setState(() => {
            return {
                bins: this.state.bins,
                sort: this.state.sort,
                mapLayer: {
                    heatmap: !this.state.mapLayer.heatmap
                }
            }});
    }

    setBinFocus(binId) {
        const bins = this.state.bins.map((bin, index) => {
            bin['focused'] = bin.id === binId;
            return bin;
        });
        this.setState(() => {
            return {
                bins: bins,
                sort: this.state.sort,
                mapLayer: this.state.mapLayer
            }});
    }

    removeFocus() {
        const bins = this.state.bins.map((bin) => {
            bin['focused'] = false;
            return bin;
        });
        this.setState(() => {
            return {
                bins: bins,
                sort: this.state.sort,
                mapLayer: this.state.mapLayer
            }});

    }

    assignBin(binId) {
        assignBin(binId, (err, data) => {
            this.setState(() => {
                return {
                    bins: JSON.parse(data),
                    sort: this.state.sort,
                    mapLayer: this.state.mapLayer
                }});
        });
    }

    unassignBin(binId) {
        unassignBin(binId, (err, data) => {
            this.setState(() => {
                return {
                    bins: JSON.parse(data),
                    sort: this.state.sort,
                    mapLayer: this.state.mapLayer
                }});
        });
    }

    render() {
        const parent = this;
        return  <MuiThemeProvider>
                    <div className="root">
                        <Drawer>
                            {parent.state.bins != null ?
                                <div>
                                    <BinSort
                                        sortBy={parent.sortBy}
                                        currentSort={parent.state.sort}
                                        toggleHeatmap={parent.toggleHeatmap}
                                    />
                                    <BinList
                                        bins={parent.state.bins}
                                        setBinFocus={parent.setBinFocus}
                                    />
                                </div>
                            : false}
                        </Drawer>

                        <GoogleMaps
                            mapLayer={parent.state.mapLayer}
                            setBinFocus={parent.setBinFocus}
                            removeFocus={parent.removeFocus}
                            assignBin={this.assignBin.bind(this)}
                            unassignBin={this.unassignBin.bind(this)}
                            markers={this.state.bins}
                        />
                    </div>
                </MuiThemeProvider>
    }
}

export default App;
