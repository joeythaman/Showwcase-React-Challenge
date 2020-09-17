import React from 'react';
import './App.css';
import './EnterName.js';
import EnterName from './EnterName.js';

let STATE = {
    ENTERNAME: 1,
    ENTEREDUCATION: 2
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleNameSubmit = this.handleNameSubmit.bind(this)

        this.state = {name:"", currentState: STATE.ENTERNAME}
    }

    handleNameChange(event) {
        console.log(event.target)
        this.setState({name:event.target.value})
    }

    handleNameSubmit() {
        console.log("bruh")
        this.setState({currentState:STATE.ENTEREDUCATION})
    }

    render() {
        console.log(this.state)
        return (
            <EnterName name={this.state.name} handleNameChange={this.handleNameChange} handleNameSubmit={this.handleNameSubmit}/>
        );
    }

}

export default App;
