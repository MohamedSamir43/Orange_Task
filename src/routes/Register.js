import React from 'react';
import { Button, Input } from 'antd';
import '../CSS/RegisterPage.css';
import mainLogo from'../Images/logo_image.png';

class Register extends React.Component {
  state = {
    username: '',
    password: '',
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

  }

  onSubmit = async () => {
    let flag = true
    Object.keys(this.state).map((key) => {
        if (this.state[key] == '')
          flag = false
      }
    )
    if (flag) {
      let curr_users = (localStorage['users'] ? JSON.parse(localStorage['users']) : [])
      curr_users.push({
        username: this.state.username,
        password: this.state.password
      })
      let users_todos = (localStorage['users_todos'] ? JSON.parse(localStorage['users_todos']) : {})
      users_todos[curr_users.length-1] = {todos:[],doneTodos:[]}
      localStorage['users_todos'] = JSON.stringify(users_todos)
      localStorage['users'] = JSON.stringify(curr_users)
      this.props.history.push('/login');
    }
  }

  render() {
    return (
      <div>
      <div style={{paddingBottom: "45px",margin: "18px 27px"}}>
      <img src={mainLogo} style={{float:"left" , height:200 ,width:200, margin:10 }}  alt="logo"/>
      </div>
      <div style={{margin: "10% auto",width: "50%"}}>
      <h1 type>Register</h1>
        <Input
          name='username'
          placeholder='Username'
          type="text"
          onChange={e => this.onChange(e)}
          value={this.state.username}/>
        <Input
          name='password'
          placeholder='Password'
          type='password'
          onChange={e => this.onChange(e)}
          value={this.state.password}/>
        <br />
        <Button className="registerPageButton"  onClick={() => this.onSubmit()} type="primary">Register</Button>
      </div>
      </div>
    );
  }
}

export default Register;