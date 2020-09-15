import React from 'react';
import './EnterName.css';


class EnterName extends React.Component {
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
            <div className="EnterName">
                <div className="col-sm-12">
                    EnterNamePage
                </div>
            </div>
        );
    }

}

export default EnterName;
