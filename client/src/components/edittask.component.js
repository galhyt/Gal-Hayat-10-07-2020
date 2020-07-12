import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap/Table'

const EditForm = props => {
    const {task,edit} = props

    function handleChange(e) {
        props.onFieldChange(e.target.id, e.target.value)
    }

    var content = (<><h3>עריכת משימה</h3>
        <div className="form-group">
            <label>שם משימה</label>
            <input type="text" id="title" value={task.title} onChange={handleChange} className="form-control" placeholder="הכנס שם משימה" readOnly={!edit} />
        </div>

        <div className="form-group">
            <label>שם משתמש</label>
            <input type="text" id="clientName" value={task.clientName} onChange={handleChange} className="form-control" placeholder="הכנס שם משתמש" readOnly={!edit} />
        </div>

        <div className="form-group">
            <label>טלפון</label>
            <input type="text" id="clientPhone" value={task.clientPhone} onChange={handleChange} className="form-control" placeholder="הכנס מספר טלפון" readOnly={!edit} />
        </div>

        <div className="form-group">
            <label>מייל</label>
            <input type="email" id="clientEmail" value={task.clientEmail} onChange={handleChange} className="form-control" placeholder="הכנס מייל" readOnly={!edit} />
        </div></>)

    if (edit)
        content = [content, <button type="submit" onClick={props.onSubmit} className="btn btn-primary btn-block">Submit</button>]
    else
        content = [content, <button type="button" onClick={() => document.location.href='/home'} className="btn btn-primary btn-block">Close</button>]
    
    return <form>{content}</form>
}

class EditTask extends Component {
    state = {}

    async getTask(_id) {
        return new Promise((resolve, reject) => {
          fetch(`/tasks/getTask?id=${_id}`).then(res=> {
            resolve(res.json())
          })
        })
    }

    onFieldChange(id, value) {
        this.state[id] = value
    }

    onSubmit() {
        this.props.submitTask(this.state)
    }
    
    render() {
        const {id,edit} = this.props.match.params
        this.getTask(id).then(res => this.setState(res))

        return <EditForm task={this.state} edit={Number(edit)} onFieldChange={this.onFieldChange.bind(this)} onSubmit={this.onSubmit.bind(this)} />
    }
}

export default EditTask;