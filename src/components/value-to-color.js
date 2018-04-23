// @flow

import React, { Component } from 'react';
import _ from 'lodash';

interface ColoredScoreProps {
    successMin : number;
    warningMin : number;
    value : number;
}

export default class ValueToColor extends Component<ColoredScoreProps> {

    constructor(props : ColoredScoreProps) {
        super(props);

        if (!this.props.successMin) {
            throw new Error()
        }

        if (this.props.successMin < this.props.warningMin) {
            throw new Error("Success should be greater than warning.");
        }
    }

    render() {

        let className = "label-danger";
        if (this.props.value >= this.props.successMin) {
            className = "label-success";
        } else if (this.props.value >= this.props.warningMin) {
            className = "label-warning";
        }

        return <span className={`label ${className}`}>{this.props.value >= 10 ? this.props.value.toString() : _.padEnd(this.props.value.toString(), 3, '.0')}</span>
    }

}