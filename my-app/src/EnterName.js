import React from 'react';
import './EnterName.css';
import styled from 'styled-components'

var Button = styled.button`
  display: inline-block;
  border-radius: 9px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 7rem;
  background: transparent;
  border: 2px solid;
  user-select: none;

  background: white;
  color: ${props => props.disabled ? "gray" : "palevioletred"};
  cursor: ${props => props.disabled ? "auto" : "pointer"};

  &:hover {
    ${props => props.disabled ? 
    `color: gray;
    text-decoration: none;` :
    `color: red;`
  }
`

const Input = styled.input.attrs(props =>
    ({className: (props.size ? "col-sm-"+props.size : ""),
    type: "text",}))`
  padding: 0.5em;
  color: ${props => props.inputColor || "palevioletred"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

class EnterName extends React.Component {
    constructor(props) {
        super(props)
        this.handleNameSubmit = this.handleNameSubmit.bind(this);
    }

    handleNameSubmit() {
        console.log("asdf")
        if (this.props.name!=="") {
            this.props.handleNameSubmit()
        }
    }

    render() {
        console.log(this.state)
        return (
            <div className="EnterName">
                    <h2 style={{textAlign:"center"}}>Hi there! Welcome to your education showcase</h2>
                    <h2 style={{textAlign:"center"}}>Type your name and click "Enter" below to begin!</h2>
                    <div style={{textAlign:"center"}}>
                        <Input placeholder="Your name" value={this.props.name} onChange={e => this.props.handleNameChange(e)}/>
                    </div>
                    <div style={{textAlign:"center"}}>
                        <Button disabled={this.props.name===""} onClick={this.handleNameSubmit}>
                            Enter
                        </Button>
                    </div>
            </div>
        );
    }
}

export default EnterName;
