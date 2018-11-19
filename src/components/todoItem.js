import React from 'react';
import '../CSS/todoItem.css';
import { Checkbox } from 'antd'
export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.todo,
      isEditing:false
    }
    this.editTodo = this.editTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.toggleState = this.toggleState.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.doneTodo = this.doneTodo.bind(this);
  }
  editTodo() {
    this.toggleState()

  }
  handleChange(e) {
    this.setState({value: e.target.value});
  }

  updateTodo(index,newText) {
    this.toggleState();
    this.props.updateTodo(index,newText);
  }
  removeTodo(id) {
    this.props.removeTodo(id);
  }
  doneTodo(id) {
    this.props.doneTodo(id);
  }
  
  toggleState(){
    const { isEditing } = this.state;
    this.setState({
      isEditing:!isEditing
    })
  }

  renderForm(e){
    return (
     <form onSubmit={this.updateItem}>
      <input type="text" value={this.state.value} onChange={this.handleChange} defaultValue ={this.props.value} />
      <button className="btn btn-primary" onClick={() => this.updateTodo(this.props.id,this.state.value)}>Update</button>
    </form>
    )
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.todo !== this.state.value)
      this.setState({value:nextProps.todo})
  }
  renderItem(e){
    return (
      <div className="todoWrapper">
        <button className="editTodo" onClick={this.editTodo.bind(this)}>edit</button>
        <button className="removeTodo" onClick={(e)=> this.removeTodo(this.props.id) }>remove</button>
        <label>{this.props.todo}</label>
        <Checkbox
          name='done_todo'
          checked={false}
          onChange={(e)=> this.doneTodo(this.props.id) }
          style={{float:"right",width:"5%",marginTop:"12px"}}
        />
        </div>

    )
  }

  render() {
    const { isEditing } = this.state;
    return (
        <section> { isEditing ? this.renderForm() :  this.renderItem() } </section> 
    
    );
  }
}
