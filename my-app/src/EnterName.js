import React from 'react';
import './EnterName.css';
import styled from 'styled-components'

const Button = styled.a`
  display: inline-block;
  border-radius: 9px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 7rem;
  background: transparent;
  border: 2px solid;

  background: ${props => props.disabled ? "white" : "white"};
  color: ${props => props.disabled ? "gray" : "palevioletred"};
  cursor: ${props => props.disabled ? "auto" : "pointer"};

  ${props => props.disabled ? "" :
    `&:hover {
        color: red;
    }`
  }
`

class EnterName extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.state)
        return (
            <div className="EnterName">
                <div className="col-sm-12">
                    <h2 style={{textAlign:"center"}}>Hi there! Welcome to your education showcase</h2>
                    <h2 style={{textAlign:"center"}}>Type your name and click "Enter" below to begin!</h2>
                    <div style={{textAlign:"center"}}>
                        <input type="text" placeholder="Your name" value={this.props.name} onChange={e => this.props.handleNameChange(e)}></input>
                    </div>
                    <div style={{textAlign:"center"}}>
                        <Button disabled={this.props.name==""} onClick={this.props.handleNameSubmit}>
                            Enter
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default EnterName;
