import React from 'react';
import './EnterName.css';
import styled from 'styled-components'
import ReactModal from 'react-modal';
import EducationModal from './EducationModal';

var Button = styled.button`
  display: inline-block;
  border-radius: 9px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 7rem;
  background: transparent;
  border: 2px solid;
  text-align: center;

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

const DisplayBox = styled.div.attrs(props =>
    ({className: (props.size ? "col-sm-"+props.size : ""),}))`
  padding: 0.5em;
  color: ${props => props.inputColor || "palevioletred"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;


class EnterEducation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {education:[], showModal:false, editing:-1, originalModalState:{}}
        this.onOpenModal = this.onOpenModal.bind(this)
        this.addEducation = this.addEducation.bind(this)

        this.getYear = this.getYear.bind(this)
        this.getMonth = this.getMonth.bind(this)
        this.compareEducation = this.compareEducation.bind(this)

        this.editEntry = this.editEntry.bind(this)

        this.renderEducations = this.renderEducations.bind(this)
        this.renderTitles = this.renderTitles.bind(this)
    }

    editEntry(college) {
        for (var i = 0; i < this.state.education.length; i++) {
            if (this.state.education[i].college === college) {
                this.setState({showModal:true,editing:i,originalModalState:this.state.education[i]})
                return
            }
        }
    }

    onOpenModal() {
        this.setState({showModal:true,editing:-1,originalModalState:{}})
    }

    getYear(a) {
        var val = parseInt(a.substring(a.indexOf("/")+1,a.length))
        return val
    }

    getMonth(a) {
        var val = parseInt(a.substring(0,a.indexOf("/")))
        return val
    }

    compareEducation(a, b) {
        if (this.getYear(a["end"]) < this.getYear(b["end"]) || (this.getYear(a["end"]) === this.getYear(b["end"]) && this.getMonth(a["end"]) < this.getMonth(b["end"]))) {
            return 1;
        } else {
            return -1;
        }
    }

    addEducation(data) {
        if (this.state.editing === -1) {
            this.state.education.push(data)
        } else {
            this.state.education[this.state.editing] = data
        }
        this.setState({education:this.state.education.sort(this.compareEducation),showModal:false})
    }

    render() {
        return (
            <div className="EnterEducation container">
                <div className="row">
                    <div className="col-sm-3">
                        {this.renderTitles()}
                    </div>
                    <div className="col-sm-9">
                    <h2 style={{textAlign:"center"}}>Welcome to {this.props.name}'s education page</h2>
                        {this.renderEducations()}
                    <div style={{textAlign:"center"}}>
                        <Button onClick={this.onOpenModal}>
                            Add Education
                        </Button>
                    </div>
                    </div>
                </div>


                <div style={{textAlign:"center",marginTop:"5em"}}>
                    <Button onClick={this.props.handlePrevious}>
                        Previous
                    </Button>
                </div>

                <ReactModal 
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                >
                    <EducationModal addEducation={this.addEducation} originalState={this.state.originalModalState}/>
                </ReactModal>
            </div>
        );
    }

    renderTitles() {
        return this.state.education.map(object => {
            return <div key={object.college}><h3>{object.college}</h3>
            <hr/></div>
        })
    }

    renderEducations() {
        return this.state.education.map(object => {
            return (
                <div className="EducationInfo" key={object.college}>
    
                        <div className="row">
                            <label htmlFor="college" className="col-sm-2 text-right" style={{textAlign:"center"}}>College: </label>
                            <DisplayBox size="6">{object.college}</DisplayBox>
    
                            <label htmlFor="degree" className="col-sm-2 text-right" style={{textAlign:"center"}}>Degree: </label>
                            <DisplayBox size="2">{object.degree}</DisplayBox>
                        </div>
                        <div className="row">
                            <label htmlFor="field" className="col-sm-2 text-right" style={{textAlign:"center"}}>Field </label>
                            <DisplayBox size="2">{object.field}</DisplayBox>
    
                            <label htmlFor="start" className="col-sm-2 text-right" style={{textAlign:"center"}}>Start: </label>
                            <DisplayBox size="2">{object.start}</DisplayBox>
    
                            <label htmlFor="end" className="col-sm-2 text-right" style={{textAlign:"center"}}>End: </label>
                            <DisplayBox size="2">{object.end}</DisplayBox>
                        </div>
                        {object.description ? <div className="row">
                            <label htmlFor="description" className="col-sm-12 text-left" style={{textAlign:"center"}}>Description: </label>
                            <DisplayBox size="12">{object.description}</DisplayBox>
                        </div> : ""}

                        <Button onClick={() => this.editEntry(object.college)}>Edit Data</Button>

                        <hr/>
                </div>)
        })
    }
}

export default EnterEducation;
