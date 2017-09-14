import React, { Component } from 'react';
import './App.css';
import Header from "./components/Header";
import Input from "./components/Input";
import Items from './components/Items';
import Themes from './components/Themes';
import Footer from './components/Footer';
import _ from 'lodash';

const todos = localStorage.todos ? JSON.parse(localStorage.todos) : [];

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos
    }
  }

  render() {
    return (
      <div>
        <Themes />
        <Header />
        <Input todos={this.state.todos} createTask={this.createTask.bind(this)} />
        <Items 
          value={this.state.todos} 
          toggleTask={this.toggleTask.bind(this)} 
          saveTask={this.saveTask.bind(this)} 
          deleteTask={this.deleteTask.bind(this)}
          />
        <Footer />
      </div>
    );
  }

  toggleTask(task, el){
    const foundTodo = _.find(this.state.todos, todo => todo.task === task);
    foundTodo.isCompleted = !foundTodo.isCompleted;
    this.setState({ todos : this.state.todos });

    let i = document.createElement('i');
    i.className = "fa fa-check";
    i.setAttribute('aria-hidden', 'true');

    if(foundTodo.isCompleted){
      el.target.insertBefore(i, el.target.lastChild);
    } else{
      el.target.removeChild(el.target.firstChild)
    }

  }

  saveTask(oldTask, newTask, el){
    const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
    foundTodo.task = newTask;
    this.setState({ todos : this.state.todos});
  
  }

  createTask(task){
    this.state.todos.push({
      task,
      isCompleted: false
    })
    this.setState({
      todos: this.state.todos
    })

    localStorage.todos = JSON.stringify(todos);
  }

  deleteTask(taskToDelete){
    _.remove(this.state.todos, todo => todo.task === taskToDelete);
    this.setState({ todos : this.state.todos});
    localStorage.todos = JSON.stringify(todos);
  }

}

export default App;
