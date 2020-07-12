import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap/Table'
import './Table.css';

const TableHeader = (props) => {
    const {type} = props
    return (
        <thead>
            <tr>
                <th>שם משתמש</th>
                <th>טלפון</th>
                <th>מייל</th>
                <th>תאריך יצירת משימה</th>
                <th>פעולות</th>
            </tr>
        </thead>
    )
}

class TableBody extends Component {
    onOperationClicked(e) {
        this.props.onOperationClicked(e.target.id, e.target.attributes._id.nodeValue)
    }

    render() {
        const {tasks} = this.props

        var rows = ''
        if (tasks != null) {
            rows = tasks.map((el, indx) => {
                return <tr>
                    <td>{el.clientName}</td>
                    <td>{el.clientPhone}</td>
                    <td>{el.clientEmail}</td>
                    <td>{new Date(el.createDate).toDateString()}</td>
                    <td><a id="delete" _id={el._id} onClick={this.onOperationClicked.bind(this)}>מחיקה</a></td>
                </tr>
            })
        }

        return <tbody>{rows}</tbody>
    }
}

class Table extends Component {
    render() {
        const {tasks,onOperationClicked} = this.props

        return (
            <BootstrapTable striped bordered hover size="sm">
                <TableHeader />
                <TableBody tasks={tasks} onOperationClicked={onOperationClicked} />
            </BootstrapTable>
        )
    }
}

export default Table;