// @flow

import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as selectors from '../selectors';
import { fetchNext, changeData } from '../actions';
import { bindActionCreators } from 'redux';
import Waypoint from 'react-waypoint';
import GamesListItem from './games-list-item';
import { GamesListProps } from './games-list-props';
import { withRouter } from 'react-router-dom';
 
class GamesList extends Component<GamesListProps, any> {

    handleWaypointEnter() {
        if (this.props.games.length > 0) {
            this.props.fetchNext();
        }
    }

    componentWillMount() {
        this.props.changeData(this.props.match.params.dataType);
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.dataType !== this.props.match.params.dataType){
            this.props.changeData(this.props.match.params.dataType);
        }
    }

    render() {
        return <div>
            <Table bsStyle="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>User Score</th>
                        <th>Votes</th>
                        <th>You Tube</th>
                        <th>Google</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.games.map(d => <GamesListItem key={d._id['$oid']} detail={d} />)}
                </tbody>
            </Table>
            <Waypoint
                className=""
                onEnter={this.handleWaypointEnter.bind(this)}
                bottomOffset="-400px" />
        </div>
    }
}

function bindActionCreatorsToProps(dispatch) {
    return {
        fetchNext: bindActionCreators(fetchNext, dispatch),
        changeData: bindActionCreators(changeData, dispatch),
    };
}

function bindStateToProps(state) {
    return {
        currentDataType: selectors.getDataType(state),
        games: selectors.getFilteredData(state)
    };
}

export default withRouter(connect(bindStateToProps, bindActionCreatorsToProps)(GamesList));
