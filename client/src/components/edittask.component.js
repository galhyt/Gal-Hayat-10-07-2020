import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap/Table'

const EditForm = props => {
    var {task,edit} = props

    function handleChange(e) {
        props.onFieldChange(e.target.id, e.target.value)
    }

    if (!task) return ''

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

    async componentWillMount() {
        const {id,edit} = this.props.match.params
        var task = {title:'',
            clientName: '',
            clientPhone: '',
            clientEmail: ''
        }
        if (id != '0')
            task = await this.getTask(id)
        this.setState({task: task, edit: edit})
    }

    async getTask(_id) {
        var result
        await new Promise((resolve, reject) => {
          fetch(`/tasks/getTask?id=${_id}`).then(res=> {
            resolve(res.json())
          })
        }).then(res => result = res)

        return result
    }

    onFieldChange(id, value) {
        this.state.task[id] = value
        this.setState(this.state)
    }

    onSubmit() {
        this.props.submitTask(this.state.task)
    }
    
    render() {
        const {task,edit} = this.state
        return <EditForm task={task} edit={Number(edit)} onFieldChange={this.onFieldChange.bind(this)} onSubmit={this.onSubmit.bind(this)} />
    }
}

export default EditTask;