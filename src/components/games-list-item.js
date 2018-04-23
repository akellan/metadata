import React, { Component } from 'react'
import he from 'he'
import ValueToColor from './value-to-color'
import { VelocityTransitionGroup } from 'velocity-react'

export default class GamesListItem extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.detail._id['$oid'] !== nextProps.detail._id['$oid']
    }

    render() {
        var velocityOptions = {
            runOnMount: true, 
            enter: { 
                animation: { opacity: 1 },
                display: 'table-cell' },
            leave: { 
                animation: { opacity: 0 }, 
                display: 'table-cell' }
        };

        return <VelocityTransitionGroup component='tr' {...velocityOptions}>
            <td>{he.decode(this.props.detail.Name)}</td>
            <td><ValueToColor successMin={7.5} warningMin={5.0} value={this.props.detail.UserScore.Score / 10} /></td>
            <td>{this.props.detail.UserScore.Amount}</td>
            <td><a className="label label-danger" target="blank" href={`https://www.youtube.com/results?search_query=${this.props.detail.Name}`}>Watch</a></td>
            <td><a className="label label-info" target="blank" href={`https://www.google.com/search?q=${this.props.detail.Name}`}>Search</a></td>
        </VelocityTransitionGroup>;
    }
}