import React, { Component } from "react";
import Table from './table.component'

export default class Home extends Component {
    render() {
        return (
            <>
            <div>Hello!</div>
            <Table tasks={this.props.tasks} onOperationClicked={this.props.onOperationClicked}></Table>
            </>
        )
    }
}