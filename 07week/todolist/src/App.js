import React, { Component } from 'react';
import './App.css';
import List from './List'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import uniqueId from 'lodash/uniqueId'

class App extends Component {

  state = {
    inputValue: '',
    list: [] //list of items on the to-do list
  }

  handleInputChange = (e) => {
    this.setState ({inputValue: e.target.value});
  }

  //add new task from input on enter press
  handleKeyDown = (e) => {
    if(e.keyCode === 13) this.handleAddClick()
  }

  //creates a new task and adds it to the list
  handleAddClick = () => {
    if(this.state.inputValue) {
      const newList = this.state.list.slice();
      //react-dnd will not work properly unless each draggable item has a unique key
      const id = uniqueId('task_');
      //task is the name for a to-do list item in this program
      const newTask = {
        inputValue: this.state.inputValue,
        isChecked: false,
        id: id
      }
      newList.push(newTask);
      this.setState({
        list: newList,
        inputValue: ''
      });
    }

  }

  handleClearListClick = () => {
    this.setState({list:[]});
  }

  handleUncheckAllClick = () => {
    const newList = this.state.list.slice()
    newList.forEach(item => item.isChecked = false)
    this.setState({list: newList})
  }

  //this function is used to allow child components to change this list state
  changeList = (newList) => {
    this.setState({list: newList});
  }

  render() {
    return (
      <div className="checklist">
        <h2>Checklist App</h2>
        {/*input box*/}
        <input
          type='text'
          value={this.state.inputValue}
          onChange = {(e)=> this.handleInputChange(e)}
          onKeyDown = {(e)=> this.handleKeyDown(e)}
        />
        {/*add button*/}
        <input
          type='submit'
          value ='Add'
          onClick={this.handleAddClick}/>
        {/*clear list button*/}
        <input
          type='submit'
          value ='Clear List'
          onClick={this.handleClearListClick}/>
        {/*uncheck all button*/}
        <input
          type='submit'
          value ='Uncheck All'
          onClick={this.handleUncheckAllClick}/>
        {/*list of tasks*/}
        <List
          list = {this.state.list}
          changeList = {this.changeList}
        />
      </div>
    );
  }
}


export default DragDropContext(HTML5Backend)(App);
