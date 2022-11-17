import {Card, Row, Col, ButtonGroup,Badge,Button} from 'react-bootstrap';
import styles from '../../styles/Home.module.scss';
import variables from '../../styles/variables.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClock, faFileVideo } from "@fortawesome/free-regular-svg-icons";
import { faDownload, faTicket, faVideo } from '@fortawesome/free-solid-svg-icons';

function LessonCard(props) {
    return(
      <div>
        <Card className={'hand-click mb-4 ' + styles["shadow-md"] +' '+ styles["roundedbtn"]}>
          <div className='position-absolute'>
            <ButtonGroup aria-label="Basic example">
              { props.subject_name_abv ?
              <span>
              <Badge bg="" style={{backgroundColor: props.color}} variant="dot"
            ><a>{props.subject_name_abv}</a></Badge></span> : <div></div>
               }
            </ButtonGroup>
          </div>
          <Card.Body className='mt-3 body-card'>
            <h4 style={{color: props.color}}>{props.name}</h4>
            { props.is_time ?
              <Row>
              <Col md="6" className='d-flex align-items-center'>
                <span><Badge bg="warning">
                  <FontAwesomeIcon
                    icon={faClock}
                    className='me-1'
                    style={{ fontSize: 14,}}
                  />Próximamente</Badge></span>
              </Col>
              <Col md="6">
                <div className='d-flex justify-content-end align-items-center'>
                <small className='text-muted'>
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className='me-1'
                    style={{ fontSize: 14,}}
                  />
                  {props.date_time.split(' ')[0]}</small>
                </div>
                <div className='d-flex justify-content-end align-items-center'>
                <small className='text-muted'>
                  <FontAwesomeIcon
                    icon={faClock}
                    className='me-1'
                    style={{ fontSize: 14,}}
                  />
                  {props.date_time.split(' ')[1]}
                  </small>
                </div>
              </Col>
            </Row> : <div></div>
          }
          { props.isLive?
          <div>
            {props?.files?.map((item,index)=> {
              return(
                <div key={index}>
                  <a href={item?.file_url} download>
                  <FontAwesomeIcon
                  icon={faDownload}
                  className='me-1'
                  style={{ fontSize: 14,}}
                  /> {item.file_name}
                  </a>
                </div>
              )
            })}

          </div>
        :<div></div>
          }
          </Card.Body>
          {props.isLive ?
          <div>
          <div className='text-white text-center' style={{background:variables.blueLightColor}}>
            <a href={props.exit_ticket} target='_blank'>
              <FontAwesomeIcon
                icon={faTicket}
                className='me-1'
                style={{ fontSize: 14,}}
              /> Ticket de salida
            </a>
          </div>
          <div className='text-white text-center' style={{background:variables.tertiaryColor}}>
            <FontAwesomeIcon
              icon={faVideo}
              className='me-1'
              style={{ fontSize: 14,}}
            /> En vivo
          </div>
          </div> :<div></div>
        }
        </Card>
        <style global jsx>{`


        .card .body-card:hover {
          background-color: #f0f0f0;
          border-bottom-right-radius: 20px;
          border-bottom-left-radius: 20px;
        }

      `}</style>
      </div>
    )
}

export default LessonCard;
