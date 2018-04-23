import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sortTypes, changeSort, dataTypes, filterByTitle, filterByVotes, fetchNext } from '../actions';
import { bindActionCreators } from 'redux'
import * as selectors from '../selectors'
import _ from 'lodash';
import {withRouter, Link} from 'react-router-dom'

class NavigationBar extends Component {

    constructor(props) {
        super(props);
        this.handleTitleFilter = _.debounce((filter) => { this.props.filterByTitle(filter); }, 300);
        this.handleVotesFilter = _.debounce((filter) => { this.props.filterByVotes(filter); }, 300);
    }

    renderSortTypeMenuItem(sortType, title) {
        const className = sortType === this.props.currentSortType ? "active dropdown-item" : "dropdown-item";
        return <a className={className} href="/#" onClick={(e) => {this.props.sort(sortType); e.preventDefault();}}>{title}</a>
    }

    renderDataTypeMenuItem(dataType, title) {
        const className = dataType === this.props.currentDataType ? "active dropdown-item" : "dropdown-item";
        return <Link to={`/${dataType}`} className={className}>{title}</Link>
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand" href="/#">Meta Analytics</a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/#" id="gamesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Games
                        </a>
                            <div className="dropdown-menu" aria-labelledby="gamesDropdown">
                                {this.renderDataTypeMenuItem(dataTypes.GAMES_3DS, "3DS")}
                                {this.renderDataTypeMenuItem(dataTypes.GAMES_PS4, "PS4")}
                                {this.renderDataTypeMenuItem(dataTypes.GAMES_XBOXONE, "Xbox One")}
                                {this.renderDataTypeMenuItem(dataTypes.GAMES_PC, "PC")}
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/#" id="sortByDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Sort By
                    </a>
                            <div className="dropdown-menu" aria-labelledby="sortByDropdown">
                                {this.renderSortTypeMenuItem(sortTypes.USERSCORE, "User Socre")}
                                {this.renderSortTypeMenuItem(sortTypes.VOTES, "Votes")}
                                {this.renderSortTypeMenuItem(sortTypes.USERSCORE_VOTES, "User Socre -> Votes")}
                                {this.renderSortTypeMenuItem(sortTypes.VOTES_USERSCORE, "Votes -> User Score")}
                            </div>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2"
                            type="text"
                            placeholder="Title contains..."
                            aria-label="Title contains..."
                            onChange={(e) => this.handleTitleFilter(e.target.value)}
                        />
                        <input className="form-control mr-sm-2"
                            type="text"
                            placeholder="Votes greater than..."
                            aria-label="Votes greater than..."
                            onChange={(e) => this.handleVotesFilter(e.target.value)}
                        />
                    </form>
                </div>
            </nav>
        );
    }
}

function bindActionCreatorsToProps(dispatch) {
    return {
        sort: bindActionCreators(changeSort, dispatch),
        filterByTitle: bindActionCreators(filterByTitle, dispatch),
        filterByVotes: bindActionCreators(filterByVotes, dispatch),
        fetchNext: bindActionCreators(fetchNext, dispatch)
    };
}

function bindStateToProps(state) {
    return {
        currentSortType: selectors.getSortType(state),
        currentDataType: selectors.getDataType(state)
    };
}

export default withRouter(connect(bindStateToProps, bindActionCreatorsToProps)(NavigationBar));