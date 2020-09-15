import React from 'react';
import './App.css';
import './EnterName.js';
import EnterName from './EnterName.js';


class App extends React.Component {
    constructor(props) {
      super(props)
        this.state = {upvoted:true}
        this.handleUpvoted = this.handleUpvoted.bind(this)
        this.handleRecent = this.handleRecent.bind(this)
    }

    handleUpvoted() {
        this.setState({upvoted:true})
    }

    handleRecent() {
        this.setState({upvoted:false})
    }

    render() {
        console.log(this.state)
        return (
            <EnterName/>
        );
    }

}

export default App;
