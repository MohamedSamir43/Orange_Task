import React, { Component } from 'react';

import '../CSS/TodoListPage.css';
import Header from '../components/header';
import TodoInput from '../components/todoInput';
import TodoItem from '../components/todoItem';
import mainLogo from'../Images/logo_image.png';

class TodoListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      doneTodos: [],
      curr_user:localStorage['currUser']
    };

    this.addTodo = this.addTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.doneTodo = this.doneTodo.bind(this);
    this.logOut = this.logOut.bind(this)
  }
  componentWillMount(){
    let curr_user = this.state.curr_user
    if(curr_user)
    {
      let user_data = JSON.parse(localStorage['users_todos'])[curr_user]
      this.setState({
        todos:user_data.todos,
        doneTodos:user_data.doneTodos
      })
    }
  }
  addTodo(todoText) {
    if(!this.state.curr_user)
      return
    let todos = this.state.todos.slice();
    todos.push(todoText);
    this.updateLocalStorage(todos)    
    this.setState({ todos });
  }

  updateTodo(id, todoText) {
    let todos = this.state.todos.slice();
    todos[id] = todoText;
    this.updateLocalStorage(todos)    
    this.setState({
      todos: todos,
    });
  }

  removeTodo(id) {
    let todos = this.state.todos
    todos = todos.filter((todo, index) => index !== id)
    this.updateLocalStorage(todos)
    this.setState({
      todos
    });
  }

  doneTodo(id) {
    let todos = this.state.todos
    let doneTodos = this.state.doneTodos
    doneTodos.push(todos[id])
    todos = todos.filter((todo, index) => index !== id)
    this.updateLocalStorage(todos,doneTodos)
    this.setState({
      todos,
      doneTodos
    });

  }
  updateLocalStorage(todos,doneTodos=this.state.doneTodos){
    let curr_user = this.state.curr_user
    let all_users = JSON.parse(localStorage['users_todos'])
    let user_data = all_users[curr_user]
    user_data.todos = todos
    user_data.doneTodos = doneTodos
    all_users[curr_user] = user_data    
    localStorage['users_todos'] = JSON.stringify(all_users)
 
  }
  logOut(){
    localStorage.removeItem('currUser')
    this.props.history.push("/login")
  }
  render() {
    return (
      <div className="TodoListPage">

      <div style={{paddingBottom: "45px",margin: "18px 27px"}}>
        <button className="btn btn-primary" style={{float:"right"}} onClick={this.logOut}>Logout</button>
        </div>
        <h1 type>Orange Task</h1>

        <div className="todo-wrapper">
          <Header header={"Current"} />
          <TodoInput todoText="" addTodo={this.addTodo} />
          <ul>
            {
              this.state.todos.map((todo, index) => {
                return <TodoItem todo={todo} key={index} id={index} removeTodo={this.removeTodo} updateTodo={this.updateTodo} doneTodo={this.doneTodo}/>
              })
            }
          </ul>
          <Header header={"Finished"} />
          <ul>
            {
              this.state.doneTodos.map((todo, index) => 
                <div key={index} className="todoWrapper">
                  {todo}
                </div>
              )
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default TodoListPage;
