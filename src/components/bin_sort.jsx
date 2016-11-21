import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import './bin_sort.css';

class BinSort extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange(event, index, value) {
        this.props.sortBy(value);
    }

    render() {
        return (
            <div>
                <h1>IntelliBins</h1>
                <div className="sort-by-wrapper">
                    <label>Sort By</label>
                    <DropDownMenu value={this.props.currentSort} onChange={this.handleChange.bind(this)}>
                        <MenuItem value={1} primaryText="Capacity"/>
                        <MenuItem value={2} primaryText="ID"/>
                    </DropDownMenu>
                </div>
            </div>
        )
    }
}
export default BinSort;