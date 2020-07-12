import React, { Component } from "react";
import Table from './table.component'
import { Link, useHistory  } from "react-router-dom";

export default class Home extends Component {
    render() {
        return (
            <>
            <div><button><Link className="nav-link" to={`/editTask/0/1`}>משימה חדשה</Link></button></div>
            <Table tasks={this.props.tasks} onOperationClicked={this.props.onOperationClicked}></Table>
            </>
        )
    }
}