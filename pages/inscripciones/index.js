import styles from '../../styles/Home.module.scss';
import { Container, Card, Alert, Row, Col, Form, Button} from 'react-bootstrap';  
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function Inscripciones(props) {

  return (   
    <section>
      <section id='intensivo'>
        <Container fluid>
            <Row style={{flexWrap:'wrap', marginRight:'-15px', marginLeft:'-15px'}}>            
              <Col md={{ span: 6, offset: 3 }} className='text-center'>
                <div className='m-4'> 
                  <Image src="/logos/img/logo-colegio-ticlass.svg" alt="TIClass" width={200} height={71} 
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
              <Col md="3" className='hide-mobile' style={{marginTop: '130px'}}>
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
              <Col md='4' className='hide-mobile'>
              <img src="/inscripciones/woman-1.png" alt="TIClass"  style={{ maxWidth:'33%',height:'auto',verticalAlign:'middle',position:'absolute',bottom:'0'}}></img>                               
                {/* <Image src="/inscripciones/woman-1.png" alt="TIClass" width={396} height={536} style={{position:'absolute',bottom:'0', maxWidth:'100%',height:'auto'}}/>      */}
              </Col>
              <Col xs="12" sm='12' md='12' lg='4' xl="4">
                <div className='top-form' >
                  <Card style={{backgroundColor:'rgb(255,57,70)'}} className={styles["roundedbtn"]+' p-4'}>
                    <Card.Body>
                      <div className='text-center'>
                        <Image src="/logos/img/escudo-ticlass.png" alt="TIClass" width={40} height={40} className='my-3'/>     
                        <h3 className='text-white' style={{marginBottom:'20px',lineHeight:'2.375rem', fontSize:'1.7rem'}}>Necesito más <br></br> información</h3>
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
                        <Form.Select className='mb-5'>
                          <option>Selecciona tu comuna</option>
                        </Form.Select>   
                        <div className='d-flex justify-content-center'>
                          <Form.Check 
                            type='radio'
                            id='student'
                            label='Soy estudiante'
                            className='text-white'
                          />                                              
                        </div>                      
                        <div className='d-flex justify-content-center mb-4'>
                          <Form.Check 
                            type='radio'
                            id='parent'
                            label='Soy apoderado'
                            className='text-white'
                          />                                              
                        </div>                      
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
                </div>                
              </Col>
              <Col md='4'className='hide-mobile'>
                <img src="/inscripciones/laptop2.png" alt="TIClass"  style={{ maxWidth:'35%',height:'auto',verticalAlign:'middle',marginLeft:'-30px',position:'absolute',bottom:'0'}}></img>                                   
                {/* <Image src="/inscripciones/laptop2.png" alt="TIClass" width={426} height={523} style={{position:'absolute',bottom:'0', maxWidth:'100%',height:'auto'}}/>      */}
              </Col>
              <div className='display-mobile'>
                <Row>
                <Col md='6' xs='6' className='display-mobile'>                
                <img src="/inscripciones/woman-1.png" alt="TIClass" style={{ maxWidth:'100%',height:'auto',verticalAlign:'middle'}}></img>                               
              </Col>
              <Col md='6' xs='6' className='display-mobile'>
                <img src="/inscripciones/laptop2.png" alt="TIClass" style={{ maxWidth:'110%',height:'auto',verticalAlign:'middle',marginLeft:'-30px', bottom:'0'}}></img>                                   
              </Col>
                </Row>              
              </div>              
            </Row>
        </Container>
      </section>
      <section className='aprendizaje' style={{background:'white'}}>
        <Container className='text-center'>          
          <Image src="/logos/img/escudo-ticlass.png" alt="TIClass" width={45} height={45} className='my-4'/>                         
          <br></br>
          <h3 className='text-center' style={{color:'#555',letterSpacing:'2px', fontWeight:'800', fontSize:'35px'}}
          >Colegio TIClass, aprendizaje <br></br> para todos</h3>
          <div style={{height:'3px',width:'100px',backgroundColor:'red',margin:'20px auto'}}></div>
          <Col md='12'>
            <Row>
              <Col md="6" className='text-center hide-mobile'>                
                <img src="/inscripciones/woman-2.png" alt="TIClass"  style={{ maxWidth:'85%',height:'auto',verticalAlign:'middle',marginTop:'-100px',marginLeft:'-30px', bottom:'0'}}></img>                                   
              </Col>
              <Col xs="12" sm='12' md='12' lg='5' xl="5" className='mt-5' style={{color:'#777', lineHeight:'28px',textAlign:'left'}}>
                <div className='ms-4 text-aprendizaje'>
                  <span>Somos una comunidad de aprendizaje online que brinda una educación flexible y de calidad. Tenemos cupos para completar los estudios desde 7º Básico hasta 4° Medio, donde los estudiantes podrán compartir e interactuar con distintos estudiantes del país.</span>
                  <br></br>
                  <Button variant='warning' className={'text-white mt-4 mb-4 '+styles["roundedbtn"]} 
                  >Quiero inscribirme</Button>
                </div>                
              </Col>
              <Col md="12" xs="12" className='display-mobile'>
                <img src="/inscripciones/woman2-mobile.png" alt="TIClass"  style={{ maxWidth:'100%',height:'auto',verticalAlign:'middle',marginLeft:'-30px', bottom:'0'}}></img>                                   
              </Col>
            </Row>
          </Col>          
        </Container>         
      </section>
      <section style={{backgroundColor:'#2376df', padding:'48px 0'}}> 
        <Container>
          <Row className='mt-4 mb-4'>
            <Col xs="12" sm='12' md='2' lg='1' xl="1" className='text-center'>
              <Image src="/logos/img/escudo-ticlass.png" alt="TIClass" width={68} height={68} style={{marginTop:'30px', margin:'0 auto 20px auto'}}/>     
            </Col>
            <Col md='7' className='text-white text-aprendizaje'>
              <h3 style={{fontWeight:'800',fontSize:'20px'}}>¿Estas listo para una nueva experiencia de educación?</h3>
              <span>Colegio nativamente online. Metodología única con resultados comprobados. Tenemos horarios flexibles, para que puedas educarte sin afectar tu vida personal.</span>
            </Col>
            <Col md='1' className='text-center hide-mobile'>
              <Image src="/inscripciones/arrow.png" alt="TIClass" width={130} height={56} style={{maxWidth: '130px', marginTop: '10px'}}/>     
            </Col>
            <Col md="3" className='text-aprendizaje'>              
            <Button variant='danger' className={'text-white mt-4 ms-4 '+styles["roundedbtn"]} style={{ fontSize: 19,}}>     
              <FontAwesomeIcon
                icon={faWhatsapp}
                className='me-1'                
                />             
                CONTACTAR ASESOR
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='ofrecemos pt-5' style={{backgroundColor: '#f6f6f6'}}>
        <Container>
          <Row>
            <Col md="6" className='mt-5'>
              <h3 className='mb-4' style={{color:'#555',letterSpacing:'2px', fontWeight:'800', fontSize:'35px'}}>
                ¿Qué ofrecemos para tí<br></br>y tu comodidad?
              </h3>
              <span style={{lineHeight:'26px',color:'#777'}} >
                Nuestro propósito es disminuir la deserción escolar y generar oportunidades de desarrollo a las personas mediante educación de alta calidad y accesible.
                Para esto implementamos innovadoras metodologías de aprendizaje con la ayuda de la tecnología. Colegio TIClass es la educación que hoy necesita el mundo.
              </span>
              <br></br>
              <Button variant="warning" className={'text-white mt-4 mb-4 '+styles["roundedbtn"]} style={{border:'0'}}>
                Quiero inscribirme
              </Button>             
            </Col>
            <Col md="6">                   
              <img src="/inscripciones/man-2.png" alt="TIClass"  style={{ width:'100%',height:'auto'}}></img>                                                        
              {/* <Image src="/inscripciones/man-2.png" alt="TIClass" width={525} height={489}/>      */}
            </Col>            
          </Row>
        </Container>
      </section>
      <section style={{background:'white'}} className='pb-4'>
        <Container className='text-center'>
          <Image src="/logos/img/escudo-ticlass.png" alt="TIClass" width={55} height={55} style={{marginTop:'30px'}}/>     
          <Row className='mb-4'>
            <Col xs="12" sm='12' md='6' lg='3' xl="3">
              <Image src="/inscripciones/elearning.png" alt="TIClass" width={90} height={88} style={{marginTop:'30px'}}/>     
              <br></br>
              <br></br>
              <span>
                <strong>Estudiar</strong>
                <br></br>
                Estudiar con nosotros desde donde estés con pagar matrícula y con menos mensualidades que los colegios tradicionales y mucha flexibilidad para que estudies a tu ritmo.
              </span>
            </Col>
            <Col xs="12" sm='12' md='6' lg='3' xl="3">
              <Image src="/inscripciones/chat.png" alt="TIClass" width={90} height={85} style={{marginTop:'30px'}}/>     
              <br></br>
              <br></br>
              <span>
                <strong>Aprender</strong>
                <br></br>
                Te enseñamos todos los contenidos y habilidades que serán evaluados en tus exámenes libres con lecciones en video, evaluaciones, un calendario de actividades semanales.                     
              </span>
            </Col>
            <Col xs="12" sm='12' md='6' lg='3' xl="3">
              <Image src="/inscripciones/teaching.png" alt="TIClass" width={90} height={92} style={{marginTop:'30px'}}/>     
              <br></br>
              <br></br>
              <span>
                <strong>Comunidad</strong>
                <br></br>
                Sé parte de una comunidad de aprendizaje diversa con profesores, ayudantes y estudiantes de todo el país.                     
              </span>
            </Col>
            <Col xs="12" sm='12' md='6' lg='3' xl="3">
              <Image src="/inscripciones/student.png" alt="TIClass" width={90} height={97} style={{marginTop:'30px'}}/>     
              <br></br>
              <br></br>
              <span>
                <strong>Conectarte</strong>
                <br></br>
                Conectarte con personas a lo largo y ancho del país y sé parte de la diversidad de Chile.                     
              </span>
            </Col>
          </Row>
        </Container>
      </section>
      <section style={{background:'#f6f6f6'}}>
        <Container className='text-center'>
          <Image src="/logos/img/escudo-ticlass.png" alt="TIClass" width={55} height={55} className='mb-4' style={{marginTop:'30px'} }/>     
          <br></br>
          <span className='mb-0' style={{fontSize:'20px',color:'#1565c0',fontWeight:'700'}}>Características</span>
          <h3 style={{color:'#555',letterSpacing: '2px', fontWeight:'800', fontSize:'35px'}}>Esto encontrarás en Colegio TIClass.</h3>
          <div style={{height:'3px',width:'100px',backgroundColor:'red',margin:'20px auto'}}></div>
          <Row className='d-flex justify-content-center' style={{color:'#555'}}>
            <Col md="10">
              <Row>
                <Col xs="12" sm='12' md='6' lg='4' xl="4" className='my-5 items'>
                  <Image src="/inscripciones/libro.png" alt="TIClass" width={60} height={60} className='my-4 me-2'/>     
                  <span className='me-0' style={{display:'block'}}>
                    <strong>Todas las asignaturas</strong> 
                    <br></br>                
                    Incluye todas las asignaturas que serán evaluadas en la prueba de transición.                                                            
                  </span>
                </Col>
                <Col xs="12" sm='12' md='6' lg='4' xl="4" className='my-5 items'>
                  <Image src="/inscripciones/calendario.png" alt="TIClass" width={60} height={54} className='my-4 me-2'/>     
                  <span className='me-0' style={{display:'block'}}>
                    <strong>Calendario de estudio</strong> 
                    <br></br>                
                    Planificación del tiempo a dedicar para cada asignatura.
                  </span>
                </Col>
                <Col xs="12" sm='12' md='6' lg='4' xl="4" className='my-5 items'>
                  <Image src="/inscripciones/envivo.png" alt="TIClass" width={60} height={60} className='my-4 me-2'/>     
                  <span className='me-0' style={{display:'block'}}>
                    <strong>Clases en vivo</strong> 
                    <br></br>                
                    Sesiones todas las semanas en las que el estudiante podrá interactuar con sus profesores y compañeros.                     
                  </span>
                </Col>
                <Col xs="12" sm='12' md='6' lg='4' xl="4" className='my-5 items'>
                  <Image src="/inscripciones/horas.png" alt="TIClass" width={60} height={60} className='my-4 me-2'/>     
                  <span className='me-0' style={{display:'block'}}>
                    <strong>Siempre disponible</strong> 
                    <br></br>                
                    Miles de recursos en alta calidad disponibles para estudiar en cualquier momento.                  
                  </span>
                </Col>
                <Col xs="12" sm='12' md='6' lg='4' xl="4" className='my-5 items'>
                  <Image src="/inscripciones/simulacro.png" alt="TIClass" width={60} height={60} className='my-4 me-2'/>     
                  <span className='me-0' style={{display:'block'}}>
                    <strong>Simulacros</strong> 
                    <br></br>                
                    Ensayos con la misma estructura que los que serán evaluadas en la prueba de transición.                     
                  </span>
                </Col>
                <Col xs="12" sm='12' md='6' lg='4' xl="4" className='my-5 items'>
                  <Image src="/inscripciones/laptop.png" alt="TIClass" width={60} height={60} className='my-4 me-2'/>     
                  <span className='me-0' style={{display:'block'}}>
                    <strong>Clases optimizadas</strong> 
                    <br></br>                
                    Lecciones de 5-7 minutos optimizadas para el aprendizaje online.                  
                  </span>
                </Col>                
              </Row>
              <Row className='d-flex justify-content-center'>
              <Col xs="12" sm='12' md='6' lg='4' xl="4" className='my-5 items'>
                  <Image src="/inscripciones/grupos.png" alt="TIClass" width={60} height={60} className='my-4 me-2'/>     
                  <span className='me-0' style={{display:'block'}}>
                    <strong>Grupos de estudio</strong> 
                    <br></br>                
                    Resolución de dudas que son respondidas por la comunidad y nuestros profesores.                  
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      <section style={{background:'white',color:'#555'}}>
        <Container>
          <div className='text-center'>
            <Image src="/logos/img/escudo-ticlass.png" alt="TIClass" width={55} height={55} style={{marginTop:'30px',marginBottom:'20px'}}/>     
            <br></br>
            <h3 style={{fontSize:'30px',fontWeight:'800',letterSpacing:'2px'}}>Nuestra Metodología</h3>
          </div>                  
          <div style={{height:'3px',width:'100px',backgroundColor:'red',margin:'20px auto'}}></div>
          <Row>
            <Col md='4' className='item'>
              <h3 className='my-5' style={{color:'red',fontSize:'30px',fontWeight:'800',letterSpacing:'2px'}}>01</h3>
              <div className='item-content'>
                <span style={{fontSize:'1.1146rem'}}><strong>Flip learning</strong></span>                
                <br></br>
                <br></br>
                <span>                                
                  Nuestra exitosa metodología mezcla momentos de aprendizaje autónomo antes de cada clase, que se desarrollan de forma guiada en la plataforma.                     
                </span>
              </div>              
            </Col>
            <Col md='4' className='item'>
              <h3 className='my-5' style={{color:'red',fontSize:'30px',fontWeight:'800',letterSpacing:'2px'}}>02</h3>
              <div className='item-content'>
                <span style={{fontSize:'1.1146rem'}}><strong>Aprendizaje autónomo</strong></span>                
                <br></br>
                <br></br>
                <span>                                
                  Fomentamos desde el día 0 la autonomía del estudiante y la gestión del tiempo para una óptima experiencia de educación online.                     
                </span>
              </div>              
            </Col>
            <Col md='4' className='item'>
              <h3 className='my-5' style={{color:'red',fontSize:'30px',fontWeight:'800',letterSpacing:'2px'}}>03</h3>
              <div className='item-content'>
                <span style={{fontSize:'1.1146rem'}}><strong>Comunidad de Aprendizaje</strong></span>                
                <br></br>
                <br></br>
                <span>                                
                  Es el corazón de Colegio TIClass, con ello buscamos mejorar el aprendizaje y la convivencia de todas y todos los estudiantes, basado en el Aprendizaje Dialógico.                     
                </span>
              </div>              
            </Col>
            <Col md='12' className='d-flex justify-content-center my-5'>
              <Button variant='danger' className={'text-white '+styles["roundedbtn"]}
              >CONTACTAR ASESOR</Button>
            </Col>
          </Row>
        </Container>
      </section>
      <section style={{backgroundColor:'#ff004f', padding:'48px 0'}}> 
        <Container>
          <Row className='mt-4 mb-4'>
            <Col xs="12" sm='12' md='2' lg='1' xl="1" className='text-center'>
              <Image src="/logos/img/escudo-ticlass.png" alt="TIClass" width={68} height={68} style={{marginTop:'30px', margin:'0 auto 20px auto'}}/>     
            </Col>
            <Col md='7' className='text-white text-aprendizaje'>
              <h3 style={{fontWeight:'800',fontSize:'20px'}}>¿Estas listo para una nueva experiencia de educación?</h3>
              <span>Colegio nativamente online. Metodología única con resultados comprobados. Tenemos horarios flexibles, para que puedas educarte sin afectar tu vida personal.</span>
            </Col>
            <Col md='1' className='text-center hide-mobile'>              
              <Image src="/inscripciones/arrow.png" alt="TIClass" width={130} height={56} style={{maxWidth: '130px', marginTop: '10px'}}/>     
            </Col>
            <Col md="3" className='text-aprendizaje'>
              <Button variant='warning' className={'text-white mt-4 ms-4 '+styles["roundedbtn"]} style={{ fontSize: 19,}}>     
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  className='me-1'                
                  />             
                CONTACTAR ASESOR
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
      <section style={{background:'white',color:'#555'}}>
        <Container className='text-center'>
          <Image src="/logos/img/escudo-ticlass.png" alt="TIClass" width={55} height={55} style={{marginTop:'30px',marginBottom:'20px'}}/>     
          <br></br>
          <h3 style={{fontSize:'30px',fontWeight:'800',letterSpacing:'2px'}}>Tus profesores
          <br></br>hacia el éxito</h3>
          <div style={{height:'3px',width:'100px',backgroundColor:'red',margin:'20px auto'}}></div>
          <Row>
            <Col xs="12" sm='12' md='6' lg='3' xl="3">
              <Image src="/inscripciones/vero.svg" alt="TIClass" width={120} height={120} style={{maxWidth: '130px', marginTop: '10px'}}/>     
              <br></br>
              <span>
                <strong>Verónica Saldaña</strong>
                <br></br>
                Profesora de matemática y física de la Universidad de Chile. Diplomada en currículum y evaluación. Profesora de programación en Desafío Latam.                     
              </span>
            </Col>
            <Col xs="12" sm='12' md='6' lg='3' xl="3">
              <Image src="/inscripciones/fran.svg" alt="TIClass" width={120} height={120} style={{maxWidth: '130px', marginTop: '10px'}}/>     
              <br></br>
              <span>
                <strong>Francisca Melgarejo</strong>
                <br></br>
                Profesora de Lengua y Literatura de la Universidad Alberto Hurtado. Cuenta con más de 5 años de experiencia en educación online y en escuelas.                     
              </span>
            </Col>
            <Col xs="12" sm='12' md='6' lg='3' xl="3">
              <Image src="/inscripciones/meli.svg" alt="TIClass" width={120} height={120} style={{maxWidth: '130px', marginTop: '10px'}}/>     
              <br></br>
              <span>
                <strong>Melissa Mondaca</strong>
                <br></br>
                Profesora de Historia y Geografía de la Universidad Cardenal Silva Henriquez. Cuenta con más de 4 años de experiencia en educación online y más de 10 en preparación PSU. Es Magister en educación.                     
              </span>
            </Col>
            <Col xs="12" sm='12' md='6' lg='3' xl="3">
              <Image src="/inscripciones/nacha.svg" alt="TIClass" width={120} height={120} style={{maxWidth: '130px', marginTop: '10px'}}/>     
              <br></br>
              <span>
                <strong>Ignacia Rocuant</strong>
                <br></br>
                Profesora de Biología de la UAH y bióloga de la Pontificia Universidad Católica. Destacada participante de EducarChile. Cuenta con más de 5 años de experiencia en educación online.                     
              </span>
            </Col>
          </Row>
          <Row className='d-flex justify-content-center'>
            <Col xs="12" sm='12' md='6' lg='3' xl="3">
                <Image src="/inscripciones/nico.svg" alt="TIClass" width={120} height={120} style={{maxWidth: '130px', marginTop: '10px'}}/>     
                <br></br>
                <span>
                  <strong>Nicolás Melgarejo</strong>
                  <br></br>
                  Profesor de Matemática y Física de la Universidad de Chile. Diplomado en emprendimiento e innovación educativa de la UDP. Cofundador de TIClass.                     
                </span>
              </Col>
              <Col xs="12" sm='12' md='6' lg='3' xl="3">
                <Image src="/inscripciones/pato.svg" alt="TIClass" width={120} height={120} style={{maxWidth: '130px', marginTop: '10px'}}/>     
                <br></br>
                <span>
                  <strong>Patricio Román</strong>
                  <br></br>
                  Licenciado en Ciencias mención biología de la Universidad de Chile. Cuenta con más de 4 años de experiencia en educación online y clases particulares de preparación PSU.                     
                </span>
              </Col>
          </Row>
        </Container>

      </section>


      <style global jsx>{`    
          .form-control  {
            border: 1px solid white;
          }
          .form-control::placeholder { 
            color: white;                      
          }
          .top-form {
            border: 0;                        
            margin: 0 20px 0 20px;
            position: relative;
            margin-bottom: 40px;
            display: block;
        }
          
          #intensivo {
            background-image: url(../inscripciones/intensivo-header.jpeg);
            min-height: 1000px;
            position: relative;
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
          .display-mobile {
            display: none;
          }    
          .items{
            display: flex;
            align-items: center;                            
            align-text: left;
          }          
          @media (max-width: 768px){
            #intensivo {
              background-image: url(../inscripciones/intensivo-header.jpeg);
                min-height: auto;
                background-position: bottom center;
                background-size: cover !important;
                background-repeat: no-repeat;     
                background-attachment: fixed;
                overflow: hidden;         
            }    
            .display-mobile {
              display: block;
            }            
            .hide-mobile {
              display: none;
            }   
            .text-aprendizaje {
              text-align: center !important;
            }     
            .items{
              display: block;   
              align-text: center;
            }  
            .item{
              display:flex;                         
            }
            .item-content{
              align-items: center;              
              margin-top: 50px;
              margin-left: 10px;
            }
          }    
          @media (max-width: 960px){
            #intensivo {
              background-image: url(../inscripciones/intensivo-header.jpeg);
                min-height: auto;
                background-position: bottom center;
                background-size: cover !important;
                background-repeat: no-repeat;     
                background-attachment: fixed;
                overflow: hidden;         
            }  
            .card-inscription{
              display: flex;
              justify-content: center;
            } 
            .hide-mobile {
              display: none;
            }   
            .display-mobile {
              display: block;
            }                            
          }   
          @media (max-width: 1140px){
            #intensivo {
              background-image: url(../inscripciones/intensivo-header.jpeg);
                min-height: auto;
                background-position: bottom center;
                background-size: cover !important;
                background-repeat: no-repeat;     
                background-attachment: fixed;
                overflow: hidden;         
            }  
            
          }                               
    
        `}</style>
    </section>     
  )
}