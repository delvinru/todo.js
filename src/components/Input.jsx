import React from 'react';
import _ from 'lodash';

class Input extends React.Component{

    constructor(props){
        super(props);
        this.addList = this.addList.bind(this);
        this.state = {
            error : null
        }
    }

    renderError(){
        if(!this.state.error) {return null}

        this.refs.createInput.placeholder = this.state.error;
    }

    addList(event){
        event.preventDefault();

        const createInput = this.refs.createInput;
        const task = createInput.value;
        const validateInput = this.validateInput(task);  

        if(validateInput){
            this.setState({ error : validateInput});
            this.refs.createInput.value = '';
            return;
        }

        this.setState({ error: null })
        this.props.createTask(task);
        this.refs.createInput.value = '';
        this.refs.createInput.placeholder = 'Введите заметку';
    }

    validateInput(task){
        if (!task){
            return "Пожалуйстa, введите заметку"
        } else if(_.find(this.props.todos, todo => todo.task === task)){
            return "Заметка уже была введена"
        } else {
            return null;
        }
    }

    render(){
        return(
            <form className="todo-wrapper" onSubmit={this.addList}>
                <input 
                    type="text" 
                    className="todo-input" 
                    placeholder="Введите заметку" 
                    ref="createInput"
                    autoFocus
                />
                <button 
                    className="todo-btn" 
                    title="Save"
                >
                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                </button>
                {this.renderError()}
            </form>
        )
    }
}

export default Input;