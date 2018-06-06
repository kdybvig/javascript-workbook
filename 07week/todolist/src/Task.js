import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import { DropTarget } from 'react-dnd'
import flow from 'lodash/flow'

const ItemTypes = {
  TASK: 'task'
};

const taskSource = {
  //stores the id for taskTarget hover function
  beginDrag(props) {
    const item = {id: props.id}
    return item;
  }
};

const collectSource = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const taskTarget = {
  hover(props, monitor, component) {
    const startId = monitor.getItem().id;
    const endId = props.id;
    //should not try to switch a task with itself
    if (startId === endId) return
    /*
    If the task being hovered over comes first in the list, moves the task being
    dragged to before the task being hovered over. If the task being dragged
    comes first in the list, moves the task being dragged to after the task
    being hovered over.
    */
    props.reorderList(startId, endId)
  }
}

const collectTarget = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
  }
}

class Task extends Component {
  render () {
    //Used ES6 destructuring to create variables
    const { connectDragSource, isDragging, connectDropTarget} = this.props;
    return connectDragSource (connectDropTarget (
      <div
        className= {"list-item "}
        index = {this.props.index}
        style={{opacity: isDragging ? 0: 1}}>
        <input
          type="checkbox"
          checked = {this.props.isChecked}
          index = {this.props.index}
          onClick = {()=>this.props.onBoxClick(this.props.index)}/>
        <p>{this.props.inputValue}</p>
        <button
          className='delete'
          index ={this.props.index}
          onClick={()=>this.props.onDeleteClick(this.props.index)}> x</button>
      </div>
    ))
  }
}

export default flow(
  DragSource(ItemTypes.TASK, taskSource,collectSource),
DropTarget(ItemTypes.TASK, taskTarget, collectTarget))(Task)
