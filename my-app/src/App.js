import React from 'react';
import './App.css';
import EnterEducation from './EnterEducation';
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
        this.handlePrevious = this.handlePrevious.bind(this)

        this.state = {name:"", currentState: STATE.ENTERNAME}
    }

    handleNameChange(event) {
        console.log(event.target)
        this.setState({name:event.target.value})
    }

    handleNameSubmit() {
        this.setState({currentState:STATE.ENTEREDUCATION})
    }

    handlePrevious() {
        this.setState({currentState:STATE.ENTERNAME})
    }

    render() {
        console.log(this.state)
        if (this.state.currentState == STATE.ENTERNAME) {
            return (
                <EnterName name={this.state.name} handleNameChange={this.handleNameChange} handleNameSubmit={this.handleNameSubmit}/>
            );
        } else {
            return (
                <EnterEducation name={this.state.name} handlePrevious={this.handlePrevious}/>
            );
        }
    }

}

export default App;
