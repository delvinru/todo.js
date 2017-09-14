import React from 'react';

export default class Item extends React.Component{
    constructor(props){
        super(props);
        this.onSaveClick = this.onSaveClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.state = {
            isEdited: false
        }

    }

    onSaveClick(event){
        event.preventDefault();
        
        const oldTask = this.props.task;
        const newTask = this.refs.editInput.value;
        if(newTask === ''){
            this.refs.editInput.placeholder = 'Введи что-нибудь'
        } else{
            this.props.saveTask(oldTask, newTask);
            this.setState({ isEdited: false });
        }
        
    }

    onEditClick(event){
        this.setState({isEdited: true});
    }

    onCancelClick(){
        this.setState({isEdited: false});
    }

    renderActionsSection(){

        if(this.state.isEdited){
            return(
                <div className="action">
                    <button className="action-btn" onClick={this.onSaveClick}><i className="fa fa-floppy-o" aria-hidden="true"></i></button>
                    <button className="action-btn" onClick={this.onCancelClick}><i className="fa fa-ban" aria-hidden="true"></i></button>
                 </div>   
            )
        } else if(this.props.isCompleted){
            return (
                <div className="action ">
                    <button className="action-btn" onClick={this.props.deleteTask.bind(this, this.props.task)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                </div> 
            )
        } else {
            return (
                <div className="action">
                    <button className="action-btn" onClick={this.onEditClick}><i className="fa fa-pencil" aria-hidden="true"></i></button>
                    <button className="action-btn" onClick={this.props.deleteTask.bind(this, this.props.task)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                </div> 
            )
        }
    }

    renderTaskSection(){
        const {task, isCompleted} = this.props;
        const taskStyle = {
            textDecoration: isCompleted ? 'line-through' : 'none'
        }

        if (this.state.isEdited){
            return (
                <form onSubmit={this.onSaveClick} className="todo-item-form">
                    <input type="text" defaultValue={task} ref="editInput" className="task-save" autoFocus/>
                </form>
            );
        }

        return(
            <div className="task" ref="task" style={taskStyle} onClick={this.props.toggleTask.bind(this, task)}>{task}</div>
        )
    }

    render(){
        return (
            <div className="todo-item">
                {this.renderTaskSection()}
                {this.renderActionsSection()}
            </div>
        )
    }
}


