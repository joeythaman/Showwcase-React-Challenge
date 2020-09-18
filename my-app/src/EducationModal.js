import React from 'react';
import './EducationModal.css';
import styled from 'styled-components'
import $ from 'jquery'

var Button = styled.button`
  display: inline-block;
  border-radius: 9px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 7rem;
  background: transparent;
  border: 2px solid;

  background: ${props => props.primary ? "palevioletred" : "white"};
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
  color: ${props => props.inputColor || "palevioletred"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

const TextArea = styled.textarea.attrs(props =>
    ({className: (props.size ? "col-sm-"+props.size : ""),
    rows: "5",}))`
  padding: 0.5em;
  color: ${props => props.inputColor || "palevioletred"};
  background: papayawhip;
  border: none;
  border-radius: 3px
`;



class EducationModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {college:"",degree:"None",start:"",end:"", field:"", description: ""}

        this.handleUniversityChange = this.handleUniversityChange.bind(this);
        this.handleSelectDegree = this.handleSelectDegree.bind(this);
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUniversityChange(event) {
        var val = event.target.value;
        this.setState({college:val})
        var targ = event.target;
        console.log("handleUniversityChange")
        $.get("http://universities.hipolabs.com/search?name="+val).done((response) => {
            console.log("http://universities.hipolabs.com/search?name="+val)
            console.log(response)
            console.log(targ.value)
            console.log(val)
            if (targ.value == val && response.length > 0) {
                var newVal = val
                for (const collegeData of response) {
                    console.log(collegeData)
                    if (collegeData["name"].substring(0,val.length).toLowerCase() === val.toLowerCase()) {
                        newVal = collegeData["name"]
                        break
                    }
                }
                console.log(newVal)
                this.setState({college:newVal}, () => {
                    targ.setSelectionRange(val.length,newVal.length)
                })
            }
        })
    }

    handleStartChange(event) {
        this.setState({start:event.target.value})
    }

    handleEndChange(event) {
        this.setState({end:event.target.value})
    }

    handleFieldChange(event) {
        this.setState({field:event.target.value})
    }

    handleSelectDegree(event) {
        this.setState({degree:event.target.value})
    }

    handleDescriptionChange(event) {
        this.setState({description:event.target.value})
    }

    handleSubmit(event) {

        event.preventDefault();
        console.log("SUBMIT")
    }

    render() {
        console.log(this.state)
        return (
            <div className="EducationModal">
                <form className="box-body"
                onSubmit={this.handleSubmit}
                noValidate>

                    <div className="row">
                        <label for="college" className="col-sm-2 text-right" style={{textAlign:"center"}}>College: </label>
                        <Input size="6" name="college" placeholder="Your name" value={this.state.college} onChange={e => this.handleUniversityChange(e)}/>

                        <label for="degree" className="col-sm-2 text-right" style={{textAlign:"center"}}>Degree: </label>
                        <select onSelect={e => this.handleSelectDegree(e)} className="col-sm-2">
                            <option value="None">None</option>
                            <option value="High School">High School</option>
                            <option value="Associate's">Associate's</option>
                            <option value="Bachelor's">Bachelor's</option>
                            <option value="Master's">Master's</option>
                            <option value="Doctor's">Doctor's</option>
                            <option value="Postgraduate">Postgraduate</option>
                        </select>
                    </div>
                    <div className="row">
                        <label for="field" className="col-sm-2 text-right" style={{textAlign:"center"}}>Field of Study: </label>
                        <Input size="2" name="field" placeholder="Field of Study" value={this.state.field} onChange={e => this.handleFieldChange(e)}/>

                        <label for="start" className="col-sm-2 text-right" style={{textAlign:"center"}}>Start: </label>
                        <Input size="2" name="start" placeholder="MM/YY" value={this.state.start} onChange={e => this.handleStartChange(e)}/>

                        <label for="end" className="col-sm-2 text-right" style={{textAlign:"center"}}>End <i>(projected or real)</i>: </label>
                        <Input size="2" name="end" placeholder="MM/YY" value={this.state.end} onChange={e => this.handleEndChange(e)}/>
                    </div>
                    <div className="row">
                        <label for="description" className="col-sm-12 text-left" style={{textAlign:"center"}}>Description: </label>
                        <TextArea size="12" name="description" placeholder="Describe your experience!" value={this.state.description} onChange={e => this.handleDescriptionChange(e)}/>
                    </div>
                    <Button primary type="submit">Add Education</Button>
                </form>
            </div>
        );
    }
}

export default EducationModal;