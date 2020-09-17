import React from 'react';
import './EnterName.css';
import styled from 'styled-components'
import ReactModal from 'react-modal';
import EducationModal from './EducationModal';

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



class EnterEducation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {education:[], showModal:false}
        this.onOpenModal = this.onOpenModal.bind(this)
    }

    onOpenModal() {
        this.setState({showModal:true})
    }

    render() {
        console.log(this.state)
        return (
            <div className="EnterEducation">
                <div className="row">
                    <div className="col-sm-4">
                        sidebar
                    </div>
                    <div className="col-sm-8">
                    <h2 style={{textAlign:"center"}}>Welcome to {this.props.name}'s education page</h2>
                    <div style={{textAlign:"center"}}>
                        <Button onClick={this.onOpenModal}>
                            Add Education
                        </Button>
                    </div>

                    {this.renderEducations}

                    <div style={{textAlign:"center"}}>
                        <Button onClick={this.props.handlePrevious}>
                            Previous
                        </Button>
                    </div>
                    </div>
                </div>

                <ReactModal 
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                >
                    <EducationModal/>
                </ReactModal>
            </div>
        );
    }
}

export default EnterEducation;
