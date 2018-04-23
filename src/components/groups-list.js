import React, { Component } from "react";
import { connect } from 'react-redux';
import * as selectors from '../selectors'

class GroupsList extends Component {

    render() {
        return this.props.groups.map(this.renderGroup);
    }

    renderGroup(group){
        return <div key={group}>
            <span className="label label-warning">{group}</span>&nbsp;
        </div>
           
    }
}

function bindStateToProps(state) {
    return {
        groups: selectors.getGroupsByType(state)
    };
}

export default connect(bindStateToProps)(GroupsList);