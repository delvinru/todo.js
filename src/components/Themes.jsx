import React from 'react';

const red = 'themes/red.css';
const black = 'themes/black.css';
const purple = 'themes/purple.css';
const yellow = 'themes/yellow.css';

export default class Themes extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showThemes: false  
        }
    }

    toggle(){
        this.setState({
            showThemes : !this.state.showThemes
        })
    }

    showThemes(){
        if(this.state.showThemes){
            return(
                <div className="color-picker">
                    <div className="red" onClick={this.changeThemes}></div>
                    <div className="black" onClick={this.changeThemes}></div>
                    <div className="yellow" onClick={this.changeThemes}></div>
                    <div className="purple" onClick={this.changeThemes}></div>
                </div>
            )
        }
    }

    changeThemes(event){
        let link = document.createElement('link');
        link.setAttribute('rel','stylesheet');

        let elem = event.target.classList;

        if(elem.contains('red')){

            checkLinks(red);

        } else if(elem.contains('black')){

            checkLinks(black);

        } else if(elem.contains('purple')){

            checkLinks(purple);

        } else if(elem.contains('yellow')){            
            checkLinks(yellow);
        }

        function checkLinks(src){
            let head = document.getElementsByTagName('head')[0];
            let elem = head.lastChild;

            if(elem.tagName !== "LINK"){
                link.setAttribute('href', src);
                head.appendChild(link);
                localStorage.theme = link.getAttribute('href');

            } else if(elem.getAttribute('href') !== src) {

                link.setAttribute('href', src);
                head.replaceChild(link, elem);

                localStorage.theme = link.getAttribute('href');
            } else{
                return false
            }

        }
    }

    setTheme(){
        let link = document.createElement('link');
        let href = localStorage.getItem('theme');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', href);
        // eslint-disable-next-line
        localStorage.theme ? document.getElementsByTagName('head')[0].appendChild(link) : false
        
    }

    render(){
        return(
            <div className="themes-picker" >
                <i className="fa fa-tint fa-3x" aria-hidden="true" onClick={this.toggle.bind(this)}></i>
                {this.showThemes()}
                {this.setTheme()}
            </div>
        )
    }
}