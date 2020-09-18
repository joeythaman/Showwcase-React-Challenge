import React from 'react';
import styled from 'styled-components'

var Button = styled.button`
  display: inline-block;
  border-radius: 9px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 7em;
  background: transparent;
  border: 2px solid;
  text-align: center;

  background: ${props => props.primary && !props.disabled ? "palevioletred" : "white"};
  color: ${props => props.disabled ? "gray" : (props.primary ? "white" : "palevioletred")};
  cursor: ${props => props.disabled ? "auto" : "pointer"};

  ${props => props.disabled ? "" :
    props.primary ?
    `&:hover {
        background: red;
        color: white;
    }`
    :
    `&:hover {
        color: red;
    }`
  }
`

const Input = styled.input.attrs(props =>
    ({className: (props.size ? "col-sm-"+props.size : ""),
    type: "text",}))`
  padding: 0.5em;
  font-size: 20px;
  width: 50%;
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
        if (this.props.name!=="") {
            this.props.handleNameSubmit()
        }
    }

    render() {
        return (
            <div className="EnterName">
                    <h2 style={{textAlign:"center"}}>Hi there! Welcome to your education showcase</h2>
                    <h2 style={{textAlign:"center"}}>Type your name and click "Enter" below to begin!</h2>
                    <div style={{textAlign:"center"}}>
                        <Input placeholder="Your name" value={this.props.name} onChange={e => this.props.handleNameChange(e)}/>
                    </div>
                    <div style={{textAlign:"center"}}>
                        <Button primary disabled={this.props.name===""} onClick={this.handleNameSubmit}>
                            Enter
                        </Button>
                    </div>
            </div>
        );
    }
}

export default EnterName;
