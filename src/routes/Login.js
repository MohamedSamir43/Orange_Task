import React from 'react';
import { Button, Input } from 'antd';
import '../CSS/LoginPage.css';
import mainLogo from'../Images/logo_image.png';
import { height } from 'window-size';

class Login extends React.Component {
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
      if (this.state[key] === '')
        flag = false
    }
    )
    if (flag) {
      let curr_users = (localStorage['users'] ? JSON.parse(localStorage['users']) : [])
      let found = -1
      curr_users.map((user, index) => {
        if (user.username === this.state.username && user.password === this.state.password)
          found = index
      })
      if (found !== -1) {
        localStorage['currUser'] = found
        this.props.history.push('/todolistpage');
      }
      else{
        alert("Enter a valid Username and Password")
      }
    }
  }
  
  onRegister(){
    this.props.history.push('/Register');
  }
  render() {
    return (
      <div>
      <div style={{paddingBottom: "45px",margin: "18px 27px"}}>
      <img src={mainLogo} style={{float:"left" , height:200 ,width:200, margin:10 }}  alt="logo"/>
      </div>
      <div style={{margin: "10% auto",width: "50%"}}>
        <h1 type>Orange Task</h1>
        <Input
          name='username'
          placeholder='User name'
          type="text"
          onChange={e => this.onChange(e)}
          value={this.state.username} />
        <Input
          name='password'
          placeholder='Password'
          type='password'
          onChange={e => this.onChange(e)}
          value={this.state.password}/>
        <br />
        <Button className="loginPageButton" onClick={() => this.onSubmit()} type="submit">Login</Button>
        <Button className="loginPageButton" onClick={() => this.onRegister()} type="submit">Register</Button>
      </div>
      </div>
    );
  }
}

export default Login;