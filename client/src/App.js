import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, useHistory  } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Home from "./components/home.component";

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
        //if (!confirm("האם אתה בטוח שאתה רוצה למחק את המשימה?")) return
        if (await this.delTask(_id)) {
          const indx = this.state.tasks.map((task, indx) => task._id).indexOf(_id)
          delete this.state.tasks[indx]
        }
        break;
    }

    this.setState(this.state)
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
    this.setState(newState)
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
            </Switch>
          </div>
        </div>
      </div></Router>
    );
  }
}

export default App;
