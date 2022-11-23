import styles from '../../styles/Home.module.scss';
import { Container, Card, Alert, Row, Col, Form, Button} from 'react-bootstrap';  
import Image from 'next/image'

export default function Inscripciones(props) {

  return (    
    <section id='intensivo'>
      <Container fluid>
          <Row style={{flexWrap:'wrap', marginRight:'-15px', marginLeft:'-15px'}}>            
            <Col md={{ span: 6, offset: 3 }} className='text-center'>
              <div className='m-4'> 
                <Image src="/logos/img/logo-natiboo-by-ticlass.svg" alt="TIClass" width={200} height={71} 
                className='powered-logo-footer' />
              </div>  
              <br></br>
              <h1 className='text-center'>Colegio Online Desde<br></br>7° Básico a 4° Medio</h1>              
              <Button variant='danger' className='text-white' style={{fontSize: '1.70rem',fontWeight: '500',borderRadius: '1.125rem 1.125rem 1.125rem 1.125rem'}}
              >Exámenes libres</Button>
              <br></br>
              <span className='text-center title'>Sin límites de edad. Horarios flexibles.
              <br></br>100% Online</span>
              <h2 className='text-center mt-3'>Solicita Cotización</h2>
              <Button variant='warning' size="lg" className='text-white' style={{fontSize: '2.25rem',fontWeight: '500',borderRadius: '1.125rem 1.125rem 1.125rem 1.125rem'}}
              >¡Admisión 2023!</Button>
            </Col>            
            <Col md="3" style={{marginTop: '130px'}}>
              <div className='mb-4 p-2' style={{position:'relative',paddingLeft:'70px',border:'none',backgroundColor:'#fff',borderRadius:'15px'}}> 
                <div className='text-center'style={{top:'-7px',left:'-13px',position:'absolute', height:'78px',textAlign:'center', width:'78px',borderRadius:'39px',background:'rgb(34,150,255)'}}>
                  <Image src="/inscripciones/cup.png" alt="TIClass" width={30} height={30} style={{marginTop:'27px', marginLeft:'25px',display:'block' }}/>     
                </div>  
                <span className='card-text'>95% de nuestros estudiantes aprobaron los Exámenes libres</span>
              </div>    
              <div className='mb-4 p-2' style={{position:'relative',paddingLeft:'70px',border:'none',backgroundColor:'#fff',borderRadius:'15px'}}> 
                <div className='text-center'style={{top:'-7px',left:'-13px',position:'absolute', height:'78px',textAlign:'center', width:'78px',borderRadius:'39px',background:'rgb(34,150,255)'}}>
                  <Image src="/inscripciones/medal.png" alt="TIClass" width={30} height={30} style={{marginTop:'27px', marginLeft:'25px',display:'block' }}/>     
                </div>  
                <span className='card-text'>2.216 estudiantes confiaron en nosotros el 2022</span>
              </div>        
              <div className='mb-4 p-2' style={{position:'relative',paddingLeft:'70px',border:'none',backgroundColor:'#fff',borderRadius:'15px'}}> 
                <div className='text-center'style={{top:'-7px',left:'-13px',position:'absolute', height:'78px',textAlign:'center', width:'78px',borderRadius:'39px',background:'rgb(34,150,255)'}}>
                  <Image src="/inscripciones/star.png" alt="TIClass" width={30} height={30} style={{marginTop:'27px', marginLeft:'25px',display:'block' }}/>     
                </div>  
                <span className='card-text'>+1.300 horas de lecciones en video disponibles</span>
              </div>                  
            </Col>                        
          </Row>          
          <Row className='mt-5'>
            <Col md='4'>
              <Image src="/inscripciones/woman-1.png" alt="TIClass" width={396} height={536} style={{maxWidth:'100%',height:'auto'}}/>     
            </Col>
            <Col md='4'>
              <Card style={{backgroundColor:'rgb(255,57,70)'}}>
                <Card.Body>
                  <div className='text-center'>
                    <Image src="/inscripciones/icon-logo2.png" alt="TIClass" width={40} height={40}/>     
                    <h3 className='text-white' style={{marginTop:'20px',marginBottom:'20px',lineHeight:'2.375rem', fontSize:'1.7rem'}}>Necesito más <br></br> información</h3>
                  </div>                  
                  <Form>
                    <Form.Group className="mb-3" controlId="nombre">                      
                      <Form.Control type="text" placeholder="Nombre" className='text-white' style={{backgroundColor:'rgb(255,57,70)'}}/>                      
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="apellido">                      
                      <Form.Control type="text" placeholder="Apellido" className='text-white' style={{backgroundColor:'rgb(255,57,70)'}}/>                      
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="correo">                      
                      <Form.Control type="text" placeholder="Correo" className='text-white' style={{backgroundColor:'rgb(255,57,70)'}} />                      
                    </Form.Group>    
                    <Form.Group className="mb-3" controlId="correo">                      
                      <Form.Control type="text" placeholder="(Codigo de área) Número" className='text-white' style={{backgroundColor:'rgb(255,57,70)'}} />                      
                    </Form.Group> 
                    <div className='d-flex justify-content-center'>
                      <Button variant="primary" size='lg' type="submit" className={'py-3 px-3 '+styles["roundedbtn"]} style={{border:'0', backgroundColor:'#00CACA'}}>
                        SOLICITAR COTIZACIÓN
                      </Button>                            
                    </div>          
                    <div className='d-flex justify-content-center mt-3'>
                      <Button variant="warning" className={'text-white '+styles["roundedbtn"]} style={{border:'0'}}>
                        Obtener Ayuda Con Un Asesor
                      </Button>                            
                    </div>                    
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col md='4'>
              <Image src="/inscripciones/laptop2.png" alt="TIClass" width={426} height={523} style={{maxWidth:'120%',height:'auto'}}/>     
            </Col>

          </Row>

      </Container>
      <style global jsx>{`
        #intensivo {
          background-image: url(../inscripciones/intensivo-header.jpeg);
          min-height: 1000px;
          background-position: bottom center;
          background-size: 100%;
          background-repeat: no-repeat;
          background-attachment: fixed;
          overflow: hidden;
        }
        #intensivo h1 {
          border-radius: 15px;
          padding: 15px;
          color: #2380f4;
          font-family: 'Hind Siliguri', sans-serif;
          font-weight: 700;
          font-size: 44px;
        }
        #intensivo span.title {
          font-size: 1.6099rem;
          font-weight: normal;
          color: #2380f4;
        }
        #intensivo h2 {
          font-size: 36px;
          font-family: 'M PLUS Rounded 1c', sans-serif;
          font-weight: bolder;
          color: red;
        }         
        .card-text {
          font-weight: bold;
          color: #333;
          display: block;
          padding-left: 70px;
        }      
   
      `}</style>
    </section>
  )
}