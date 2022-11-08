import { Container, Row, Col, Button, Card, InputGroup, Alert} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

import 'katex/dist/katex.min.css'
import Latex from 'react-latex-next'

function Feedback(props) {
  const renderLatext = (text) => {
    if (text != undefined) {
        return(<Latex strict>{text}</Latex>)
    }
  }

  const getAlternative = (item, index, answer) => {
    if (item.correct_answer) {
      if (answer == item.alternative) {
        return(
          <div className="d-block" key={index}>
            <InputGroup className="mb-3 inputGroup">
              <Form.Check type='radio' id={`default-radio-`+index} name="questionquiz_respuesta"
                label={renderLatext(item.alternative)} className="inputradio correct correct_answer" value={item.id}
              defaultValue={item.id} disebled/>
            </InputGroup>
          </div>
        )
      } else {
        return(
          <div className="d-block" key={index}>
            <InputGroup className="mb-3 inputGroup">
              <Form.Check type='radio' id={`default-radio-`+index} name="questionquiz_respuesta"
                label={renderLatext(item.alternative)} className="inputradio incorrect" value={item.id}
              defaultValue={item.id} disebled/>
            </InputGroup>
          </div>
        )
      }


    } else {
      if (answer == item.alternative) {
        return(
          <div className="d-block" key={index}>
            <InputGroup className="mb-3 inputGroup">
              <Form.Check type='radio' id={`default-radio-`+index} name="questionquiz_respuesta"
                label={renderLatext(item.alternative)} className="inputradio correct_answer" value={item.id}
              defaultValue={item.id} disebled/>
            </InputGroup>
          </div>
        )
      } else {
        return(
          <div className="d-block" key={index}>
            <InputGroup className="mb-3 inputGroup">
              <Form.Check type='radio' id={`default-radio-`+index} name="questionquiz_respuesta"
                label={renderLatext(item.alternative)} className="inputradio" value={item.id}
              defaultValue={item.id} disebled/>
            </InputGroup>
          </div>
        )
      }
    }


  }
  return (
    <Card>
      <Row className='m-0'>
        <Col md='6' className='p-0'>
          <Card style={{border:'0 solid',borderRadius:'0'}}>
            <Card.Body>
              <p>Enunciado</p>
              <p>{renderLatext(props.enunciate)}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md='6' className='p-0'>
          <Card style={{border:'0 solid',borderRadius:'0',borderLeft:'1px solid rgba(0,0,0,.125)',borderTop:'1px solid rgba(0,0,0,.125)'}}>
            <Row>
              <Col md="12">
                <Card style={{border:'0 solid',borderRadius:'0',borderBottom:'1px solid rgba(0,0,0,.125)'}}>
                  <Card.Body>
                  <p>Alternativas</p>
                  <div className="card-text alternativas">
                    <div className="list-group item radio-toolbar">
                    {props?.alternatives?.map((item,index) => {
                      return(getAlternative(item, index, props.answer))
                    })}
                    </div>
                  </div>

                  </Card.Body>
                </Card>
              </Col>
              <Col md="12">
                <Card style={{border:'0 solid',borderRadius:'0'}}>
                  <Card.Body>
                    <p>Explicación</p>
                    {renderLatext(props.explanation)}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <style global jsx>{`
        .inputradio.correct_answer.form-check .form-check-label {
          background: #a3e692;
        }
        .inputradio.correct.form-check .form-check-label {
          border: 6px solid green;
        }
        .inputradio.incorrect_answer.form-check .form-check-label {
          background: #ff9c9c;
        }
        .inputradio.incorrect.form-check .form-check-label {
          border: 6px solid #dc3545;
        }
        .btn-resp {
          border-radius: 20px !important;
        }
        .powered-logo-footer{
          width: 70px;
          height: 35px;
          background-size: 70px 50px;
          margin: auto;
        }
        .alert {
            -webkit-border-radius: 20px!important;
            -moz-border-radius: 20px!important;
            border-radius: 20px!important;
        }
        .inputGroup {
        	 background-color: #fff;
        	 display: block;
        	 margin: 10px 0;
        	 position: relative;
        }
         .inputGroup label {
        	 padding: 12px 30px;
        	 width: 100%;
        	 display: block;
        	 text-align: left;
        	 color: #3C454C;
        	 cursor: pointer;
        	 position: relative;
        	 z-index: 2;
        	 transition: color 200ms ease-in;
        	 overflow: hidden;
        }
         .inputGroup label:before {
        	 width: 10px;
        	 height: 10px;
        	 content: &#39;
        	&#39;
        	;
        	 background-color: #3d86c6 !important;
        	 position: absolute;
        	 left: 50%;
        	 top: 50%;
        	 transform: translate(-50%,-50%) scale3d(1,1,1);
        	 transition: all 300ms cubic-bezier(0.4,0.0,0.2,1);
        	 opacity: 0;
        	 z-index: -1;
        }

         .inputGroup input {
        	 width: 32px;
        	 height: 32px;
        	 order: 1;
        	 z-index: 2;
        	 position: absolute;
        	 right: 30px;
        	 top: 50%;
        	 transform: translateY(-50%);
        	 cursor: pointer;
        	 visibility: hidden;
        }
         .inputGroup .custom-control-label {
        	 border-radius: 20px !important;
        	 border: 1px solid #ebedf0;
        }
         .inputGroup .custom-control-label:before {
        	 background-color: #3d86c6 !important;
        }
         .inputGroup .custom-control-label:after {
        	 background-color: #3d86c6 !important;
        }
         .inputGroup .custom-control-input:checked~.custom-control-label::before {
        	 color: #fff;
        	 border-color: #3d86c6 !important;
        	 background-color: #3d86c6 !important;
        }

        .alternativas {
        	 display: block;
        	 margin-top: 20px;
        }
         .alternativas .item {
        	 width: 100%;
        	 display: inline-block;
        	 margin-top: 0px;
        }
        .alternativas .form-check {
            display: block;
            min-height: 1.5rem;
            padding-left: 0 !important;
            margin-bottom: 0.125rem;
        }
         .alternativas .item input {
        	 opacity: 0;
        	 position: absolute;
        	 display: none;
        }
         .alternativas .item label {
        	 border: 1px solid #dadada;
        	 padding: 10px;
        	 border-radius: 6px;
        	 background: #fff;
        	 transition: 0.4s;
        	 width: 100%;
        }
         .alternativas .item label img {
        	 width: 100%;
        	 margin: 10px 0;
        }




      `}</style>
    </Card>
  );
}

  export default Feedback;
