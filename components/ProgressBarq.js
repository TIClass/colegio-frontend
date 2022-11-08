import { Container, Row, Col, Card, Form, Button} from 'react-bootstrap';  
import { useEffect, useState} from 'react';
import { ProgressBar, Step } from "react-step-progress-bar";

export default function ProgressBarq(props) {    
  //aun esta incompleto
  const [current_fs, setCurrent_fs] = useState('');  
  const [next_fs, setNext_fs] = useState('');  
  const [previous_fs, setPrevious_fs] = useState('');  
  const [opacity, setOpacity_fs] = useState(''); 
  const [stepPercentage, setStepPercentage] = useState('');   

  const MultiStepProgressBar = props => {    
  
    if (props.currentStep === 1) {
      setStepPercentage(0)
      stepPercentage = 0;
    } else if (props.currentStep === 2) {      
      stepPercentage = 50;
    } else if (props.currentStep === 3) {
      setStepPercentage(100)      
    } else {
      setStepPercentage(0)      
    }
  }

  const next = () => {
    setCurrent_fs()
  }
  
  return (
    <Container>
      <Row className='justify-content-center mt-0'>
        <Col md="8">
        <ProgressBar percent={stepPercentage}>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >
            1
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >
            2
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}
          >
            3
          </div>
        )}
      </Step>
    </ProgressBar>

        </Col>
        {/* <Col md="6">
          <Card className='px-0 pt-0'>
            <h2>aaaaaaaaaaa</h2>
            <p>paaaa</p>
            <Row>
              <Col md="12">
                <Form>
                  <ul id='progressbar'>
                    <li className='active' id='account'>Account</li>
                    <li id='personal'>Personal1</li>
                    <li id='payment'>Personal2</li>
                  </ul>
                  <fieldset>
                    <div className='form-card'>
                      <h2 className='fs-title'>Account Info</h2>
                      <Form.Group className="mb-3 d-flex align-items-center" controlId="formName">
                      <Form.Label className='me-4'>
                        <strong>Nombre(*)</strong>
                      </Form.Label>                    
                      <Form.Control type="text" placeholder="Ingresa tu nombre"/>                    
                    </Form.Group>
                    </div>
                    <Button variant="secondary" name='next' className='next action-button' onClick={next}>Siguiente paso</Button>  
                  </fieldset>
                  <fieldset>
                    <div className='form-card'>
                      <h2 className='fs-title'>Personal Info</h2>
                      <Form.Group className="mb-3 d-flex align-items-center" controlId="formName">
                      <Form.Label className='me-4'>
                        <strong>Personal info(*)</strong>
                      </Form.Label>                    
                      <Form.Control type="text" placeholder="Ingresa tu personal info"/>                    
                    </Form.Group>
                    </div>
                    <Button variant="secondary" name='previous' className='previous action-button-previous'>Anterior paso</Button>  
                    <Button variant="secondary" name='next' className='next action-button'>Siguiente paso</Button>  
                  </fieldset>

                  <fieldset>
                    <div className='form-card'>
                      <h2 className='fs-title'>Payment Info</h2>
                      <Form.Group className="mb-3 d-flex align-items-center" controlId="formName">
                      <Form.Label className='me-4'>
                        <strong>Personal info(*)</strong>
                      </Form.Label>                    
                      <Form.Control type="text" placeholder="Ingresa tu personal info"/>                    
                    </Form.Group>
                    </div>
                    <Button variant="secondary" name='previous' className='previous action-button-previous'>Anterior paso</Button>  
                    <Button variant="secondary" name='next' className='next action-button'>Siguiente paso</Button>  
                  </fieldset>                  
                  
                </Form>
              </Col>
            </Row>
          </Card>          
        </Col> */}
      </Row>
      <style global jsx>{`
      .indexedStep {
        color: white;
        width: 20px;
        height: 20px;
        font-size: 12px;
        background-color: rgba(211, 211, 211, 0.8);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .indexedStep.accomplished {
        background-color: rgba(0, 116, 217, 1);
      }
      
      * {
        margin: 0;
        padding: 0;
    }
    
    html {
        height: 100%;
    }
    
    /*Background color*/
    #grad1 {
        background-color: : #9C27B0;
        background-image: linear-gradient(120deg, #FF4081, #81D4FA);
    }
    
    /*form styles*/
    #msform {
        text-align: center;
        position: relative;
        margin-top: 20px;
    }
    
    #msform fieldset .form-card {
        background: white;
        border: 0 none;
        border-radius: 0px;
        box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.2);
        padding: 20px 40px 30px 40px;
        box-sizing: border-box;
        width: 94%;
        margin: 0 3% 20px 3%;
    
        /*stacking fieldsets above each other*/
        position: relative;
    }
    
    #msform fieldset {
        background: white;
        border: 0 none;
        border-radius: 0.5rem;
        box-sizing: border-box;
        width: 100%;
        margin: 0;
        padding-bottom: 20px;
    
        /*stacking fieldsets above each other*/
        position: relative;
    }
    
    /*Hide all except first fieldset*/
    #msform fieldset:not(:first-of-type) {
        display: none;
    }
    
    #msform fieldset .form-card {
        text-align: left;
        color: #9E9E9E;
    }
    
    #msform input, #msform textarea {
        padding: 0px 8px 4px 8px;
        border: none;
        border-bottom: 1px solid #ccc;
        border-radius: 0px;
        margin-bottom: 25px;
        margin-top: 2px;
        width: 100%;
        box-sizing: border-box;
        font-family: montserrat;
        color: #2C3E50;
        font-size: 16px;
        letter-spacing: 1px;
    }
    
    #msform input:focus, #msform textarea:focus {
        -moz-box-shadow: none !important;
        -webkit-box-shadow: none !important;
        box-shadow: none !important;
        border: none;
        font-weight: bold;
        border-bottom: 2px solid skyblue;
        outline-width: 0;
    }
    
    /*Blue Buttons*/
    #msform .action-button {
        width: 100px;
        background: skyblue;
        font-weight: bold;
        color: white;
        border: 0 none;
        border-radius: 0px;
        cursor: pointer;
        padding: 10px 5px;
        margin: 10px 5px;
    }
    
    #msform .action-button:hover, #msform .action-button:focus {
        box-shadow: 0 0 0 2px white, 0 0 0 3px skyblue;
    }
    
    /*Previous Buttons*/
    #msform .action-button-previous {
        width: 100px;
        background: #616161;
        font-weight: bold;
        color: white;
        border: 0 none;
        border-radius: 0px;
        cursor: pointer;
        padding: 10px 5px;
        margin: 10px 5px;
    }
    
    #msform .action-button-previous:hover, #msform .action-button-previous:focus {
        box-shadow: 0 0 0 2px white, 0 0 0 3px #616161;
    }
    
    /*Dropdown List Exp Date*/
    select.list-dt {
        border: none;
        outline: 0;
        border-bottom: 1px solid #ccc;
        padding: 2px 5px 3px 5px;
        margin: 2px;
    }
    
    select.list-dt:focus {
        border-bottom: 2px solid skyblue;
    }
    
    /*The background card*/
    .card {
        z-index: 0;
        border: none;
        border-radius: 0.5rem;
        position: relative;
    }
    
    /*FieldSet headings*/
    .fs-title {
        font-size: 25px;
        color: #2C3E50;
        margin-bottom: 10px;
        font-weight: bold;
        text-align: left;
    }
    
    /*progressbar*/
    #progressbar {
        margin-bottom: 30px;
        overflow: hidden;
        color: lightgrey;
    }
    
    #progressbar .active {
        color: #000000;
    }
    
    #progressbar li {
        list-style-type: none;
        font-size: 12px;
        width: 25%;
        float: left;
        position: relative;
    }
    
    /*Icons in the ProgressBar*/
    #progressbar #account:before {
        font-family: FontAwesome;
        content: "\f023";
    }
    
    #progressbar #personal:before {
        font-family: FontAwesome;
        content: "\f007";
    }
    
    #progressbar #payment:before {
        font-family: FontAwesome;
        content: "\f09d";
    }
    
    #progressbar #confirm:before {
        font-family: FontAwesome;
        content: "\f00c";
    }
    
    /*ProgressBar before any progress*/
    #progressbar li:before {
        width: 50px;
        height: 50px;
        line-height: 45px;
        display: block;
        font-size: 18px;
        color: #ffffff;
        background: lightgray;
        border-radius: 50%;
        margin: 0 auto 10px auto;
        padding: 2px;
    }
    
    /*ProgressBar connectors*/
    #progressbar li:after {
        content: '';
        width: 100%;
        height: 2px;
        background: lightgray;
        position: absolute;
        left: 0;
        top: 25px;
        z-index: -1;
    }
    
    /*Color number of the step and the connector before it*/
    #progressbar li.active:before, #progressbar li.active:after {
        background: skyblue;
    }
    
    /*Imaged Radio Buttons*/
    .radio-group {
        position: relative;
        margin-bottom: 25px;
    }
    
    .radio {
        display:inline-block;
        width: 204;
        height: 104;
        border-radius: 0;
        background: lightblue;
        box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
        cursor:pointer;
        margin: 8px 2px; 
    }
    
    .radio:hover {
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.3);
    }
    
    .radio.selected {
        box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
    }
    
    /*Fit image in bootstrap div*/
    .fit-image{
        width: 100%;
        object-fit: cover;
    }
    `}</style>
    </Container>    
  )
}
