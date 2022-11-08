import styles from '../../styles/Home.module.scss';
import variables from '../../styles/variables.module.scss';

import {Card, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function BuyCard(props) {
    return(  
      <div>
        <Card className={'mb-4 ' + styles["shadow-md"] +' '+ styles["roundedbtn"]}>          
          <Card.Body className='body-card'>
            <span className={styles["offer"]}>$000.000 CLP </span>
            <h4 style={{color: variables.primaryColor}}>$000.000 CLP</h4>          
            <Button variant="danger" className={"text-white "+styles["roundedbtn"]} style={{width:'100%;'}}>Comprar ahora</Button>         
            <br></br>        
            <hr></hr>
            <Card.Text>
              <strong>¿Necesitas pagar en cuotas? </strong>
              <br></br>
              Comunicate con nosotros haciendo click aqui
              <a>
              <FontAwesomeIcon
                  icon={faWhatsapp}
                  className='ms-1'
                  style={{ fontSize: 14, color: variables.primaryColor}}
                />  
              </a>
            </Card.Text>
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

export default BuyCard;
