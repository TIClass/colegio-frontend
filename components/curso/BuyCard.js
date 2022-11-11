import styles from '../../styles/Home.module.scss';
import variables from '../../styles/variables.module.scss';

import { formatPrice } from '../../methods/utils';

import {Card, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function BuyCard(props) {
  const btnWhatsApp = (number, product_name) => {
    let name = product_name.trim().replace(' ', '+')
    let url = `https://api.whatsapp.com/send?phone=${number}&text=👋+Hola!,+necesito+más+información+del+curso+*${name}*,+me+puedes+ayudar?`;
    window.open(url, '_blank');
  }
    const showPrice = (item) => {
      if (item.price == '0.0000') {
        return (
            <div>
              <div className="d-grid gap-2">
                <Button size="lg" variant="danger" className={"text-white "+styles["roundedbtn"]} style={{width:'100%;'}}>Suscríbete Gratis</Button>
              </div>
            </div>)
      } else {
        if(item.offer_price == '0.0000') {
            return (
                <div>
                <h4 style={{color: variables.primaryColor}}>{formatPrice(item.price)}</h4>
                <div className="d-grid gap-2">
                  <Button size="lg" variant="danger" className={"text-white "+styles["roundedbtn"]} style={{width:'100%;'}}>Comprar ahora</Button>
                </div>
                </div>)
        } else {
          return (
              <div>
              <span className={styles["offer"]}>{formatPrice(item.price)}</span>
              <h4 style={{color: variables.primaryColor}}>{formatPrice(item.offer_price)}</h4>
              <div className="d-grid gap-2">
                <Button size="lg" variant="danger" className={"text-white "+styles["roundedbtn"]} style={{width:'100%;'}}>Comprar ahora</Button>
              </div>
              </div>
              )
        }

      }

    }
    return(
      <div>
        <Card className={'mb-4 ' + styles["shadow-md"] +' '+ styles["roundedbtn"]}>
          <Card.Body className='body-card'>
            {props?.subscriptionSet?.map((item, index) => {
              return (showPrice(item))


            })}




            <br></br>
            <hr></hr>
            <Card.Text>
              <strong>¿Necesitas pagar en cuotas? </strong>
              <br></br>
              Comunicate con nosotros haciendo click aqui
              <Button variant="warning" className={"text-white "+' '+styles["roundedbtn"] } onClick={e => btnWhatsApp(props?.sellerNumber.seller_number, props?.namePack)}>
              <FontAwesomeIcon
                  icon={faWhatsapp}
                  className='me-1'
                  style={{ fontSize: 14,}}
                />
                Hablar con un asesor
              </Button>
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
