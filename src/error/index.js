import { connect } from 'react-redux'
import React from 'react'
import * as selectors from '../selectors'

const Error = (props) => {

    if(props.errorState == null){
        return false
    }

    return <div>
        <div>{props.errorState.message}</div>
        <div>
        <a href="/">Reload</a></div>
    </div>
}

const bindStateToProps = state => {
    return {
        errorState: selectors.getErrorState(state)
    }
}

export default connect(bindStateToProps)(Error);