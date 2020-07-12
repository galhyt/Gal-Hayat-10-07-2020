import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, useHistory  } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Home from "./components/home.component";
import EditTask from './components/edittask.component';

class App extends Component {
  state = {}
  token

  async componentDidMount() {
    this.state.tasks = await this.getTasks()
    this.setState(this.state)
  }

  async getTasks() {
    let result
    await new Promise((resolve, reject) => {
      fetch('/tasks/getAllTasks').then(res=> {
        resolve(res.json())
      })
    }).then(res => result = res)
  
    return result
  }

  async onOperationClicked(op, _id) {
    switch(op) {
      case "delete":
        if (await this.delTask(_id)) {
          const indx = this.state.tasks.map((task, indx) => task._id).indexOf(_id)
          delete this.state.tasks[indx]
        }
        this.setState(this.state)
        break;
    }

  }

  async delTask(_id) {
    let result = false
    await new Promise((resolve, reject) => {
      fetch(`/tasks/deleteTask?id=${_id}`).then(res=> {
        resolve(res.json())
      })
    }).then(res => result = true)

    return result
  }

  async submitLogin() {
    alert(JSON.stringify(this.state))
    const {email, password} = this.state
    let result
  
    await new Promise((resolve, reject) => {
      var url = '/users/authenticateUser'
      var body = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password: password })
      }
      fetch(url, body).then(res=> {
        if (res == null)
          resolve(null)
        else
          resolve(res.json())
      })
    }).then(res => result = res)
    
    if (result != null) {
      this.token = result.token
      const history = useHistory()
      history.push('./home')
    }
  }

  onFieldChange(id, value) {
    var newState = this.state
    newState[id] = value
    this.state = newState
  }

  async editTask(task) {
    let result = false
    await new Promise((resolve, reject) => {
      fetch(`/tasks/editTask`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(task)}).then(res=> {
        resolve()
      })
    }).then(res => result = true)
    .catch(() => result = false)

    return result
  }

  async createTask(task) {
    let result = null
    await new Promise((resolve, reject) => {
      fetch(`/tasks/createTask`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(task)}).then(res=> {
        resolve(res.insertedId)
      })
    }).then(res => result = res)
    .catch(() => result = null)

    return result
  }

  async submitTask(task) {
    if (typeof(task._id) != 'undefined') {
      if(await this.editTask(task)) {
        const indx = this.state.tasks.map((t, indx) => t._id).indexOf(task._id)
        this.state.tasks[indx] = task
      }
    }
    else {
      const insertedId = await this.createTask(task)
      if(insertedId) {
        task._id = insertedId
        this.state.tasks.push(task)
      }
    }

    this.setState(this.state)
    useHistory().push('/')
  }

  render() {
    const {tasks} = this.state
    const homeComponent = () => <Home tasks={tasks} onOperationClicked={this.onOperationClicked.bind(this)} />
    return (<Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>positronX.io</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path='/' component={homeComponent} />
              <Route path="/sign-in" component={() => <Login submitLogin={this.submitLogin.bind(this)} onFieldChange={this.onFieldChange.bind(this)} />} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/home" component={homeComponent} />
              <Route path="/editTask/:id/:edit" component={(props) => <EditTask {...props} submitTask={this.submitTask.bind(this)} />} />
            </Switch>
          </div>
        </div>
      </div></Router>
    );
  }
}

export default App;
