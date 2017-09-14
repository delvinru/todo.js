import React from 'react';
import _ from 'lodash';
import Item from './Item';

export default class Items extends React.Component{

    renderItems(){    
        return _.map(this.props.value, (todo, index) => <Item key={index}
        {...todo} {...this.props} />);
    }
    
    render(){
        return (
            <div className="todo-list">
                {this.renderItems()}
            </div>
        )
    }
}