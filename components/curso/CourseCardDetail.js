import {Card, Button} from 'react-bootstrap';
import styles from '../../styles/Home.module.scss';
import variables from '../../styles/variables.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function CourseCardDetail(props) {
   const btnWhatsApp = (number, product_name) => {
     let name = product_name.trim().replace(' ', '+')
     let url = `https://api.whatsapp.com/send?phone=${number}&text=👋+Hola!,+necesito+más+información+del+curso+*${name}*,+me+puedes+ayudar?`;
     window.open(url, '_blank');
   }
    return(
      <div>
        <Card className={'mb-4 ' +styles["shadow-md"]+' '+styles["roundedbtn"]}>
          <Card.Img variant="top" src={props.image} />
          <Card.Body className='body-card'>
            <h4 style={{color:variables.primaryColor}}>{props.namePack}</h4>
            <p className='mb-0'>{props.desc}</p>
            <br></br>

            <Button variant="warning" className={"text-white "+ styles['float-right']+' '+styles["roundedbtn"] } onClick={e => btnWhatsApp(props?.sellerNumber.seller_number, props?.namePack)}>
            <FontAwesomeIcon
                icon={faWhatsapp}
                className='me-1'
                style={{ fontSize: 14,}}
              />
              Obtener ayuda con un asesor
            </Button>
            <br></br>
            <br></br>
            <hr></hr>
            <h6 className='pt-4'>Este curso incluye:</h6>
            {props.packCourse?.map(packcourse => (
              <p key={packcourse.id}>{packcourse.course_data.include}</p>
            ))}
          </Card.Body>
        </Card>
        <style global jsx>{`
        .btn-red {
          color: ${variables.whiteColor};
            a:hover{
              color: ${variables.blackColor};
            }
        }
      `}</style>
      </div>
    )
}

export default CourseCardDetail;
