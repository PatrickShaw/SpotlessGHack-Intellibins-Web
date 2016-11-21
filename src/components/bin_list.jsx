import React from 'react';
import BinItem from './bin_item';
import List from 'material-ui/List';
class BinList extends React.Component {
    render() {
        const parent = this;
        return (
            <List>
                {
                    parent.props.bins.map(function(bin, index) {
                        return <BinItem
                            bin={bin}
                            key={index}
                            setBinFocus={parent.props.setBinFocus}
                        />
                    })
                }
            </List>
        )
    }
}

export default BinList;