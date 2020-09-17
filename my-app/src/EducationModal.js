import React from 'react';
import './EnterName.css';
import styled from 'styled-components'
import Modal from 'react-modal';

var Button = styled.a`
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



class EducationModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {college:"",suggestedColleges:[]}

        this.handleUniversityChange = this.handleUniversityChange.bind(this);
    }

    handleUniversityChange(event) {
        var val = event.target.value;
        this.setState({college:val})
        $.get("http://universities.hipolabs.com/search?name="+val).done((response) => {
            this.setState({suggestedColleges:response});
            if (event.target.value == val) {
                this.setState({college:response[0]["name"]})
            }
        })
    }

    render() {
        console.log(this.state)
        return (
            <div className="EducationModal">
                <div className="box-body">
                    <div className="col-sm-12" style={{textAlign:"center"}}>
                        <input type="text" placeholder="Your name" value={this.props.name} onChange={e => this.props.handleNameChange(e)}></input>
                    </div>
                </div>
            </div>
        );
    }
}

export default EducationModal;