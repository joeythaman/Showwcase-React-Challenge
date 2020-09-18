import React from 'react';
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

let MONTHS = {
    1:"January",
    2:"February",
    3:"March",
    4:"April",
    5:"May",
    6:"June",
    7:"July",
    8:"August",
    9:"September",
    10:"October",
    11:"November",
    12:"December",
}

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
                        <h3>Summary</h3>
                        <hr/>
                        {this.renderTitles()}
                    </div>
                    <div className="col-sm-9">
                    <h2 style={{textAlign:"center"}}>Welcome to {this.props.name}'s education page</h2>
                        {this.renderEducations()}
                    <div style={{textAlign:"center"}}>
                        <Button primary onClick={this.onOpenModal}>
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
            return <div key={object.college}><h4>{object.college}</h4>
            <hr/></div>
        })
    }

    formatDate(date) {
        if (isNaN(this.getMonth(date)) || isNaN(this.getYear(date))) {
            return date
        } else {
            return MONTHS[this.getMonth(date)]+ " 20"+this.getYear(date)
        }
    }

    renderEducations() {
        return this.state.education.map(object => {
            return (
                <div className="EducationInfo" key={object.college}>
                        <DisplayBox size="12">
                            <h3>{object.degree} {object.field} @ {object.college}</h3>
                            <h2>{this.formatDate(object.start)} - {this.formatDate(object.end)}</h2>
                            <div>{object.description}</div>
                        </DisplayBox>

                        <Button onClick={() => this.editEntry(object.college)}>Edit Data</Button>
                        <hr/>
                </div>)
        })
    }
}

export default EnterEducation;
