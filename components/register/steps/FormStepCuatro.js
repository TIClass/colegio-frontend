
import { Form, Container, Button, Row, Col, Card} from 'react-bootstrap';
import styles from '../../../styles/Home.module.scss';
import variables from '../../../styles/variables.module.scss';

import { useEffect, useState} from 'react';
import axios from 'axios';
import { getCookie} from 'cookies-next';

function FormStepCuatro(props) {
  const [terms, setTerms] = useState(props?.userObj?.terms_conditions);

  const token = getCookie('cookie-usertoken');
  const useToken = token ? `Bearer ${token}` : `Token ${process.env.TOKEN_GENERIC_API}`

  const axiosTermsConditions = (url) => {
    axios.get(url, { headers: { Authorization: useToken } })
          .then(res => setTerms(true))
          .catch(err => err)
  }

  useEffect(() => {
  }, [])

  const getTermsConditions = (check) => {
    const urlTermsConditions = `${process.env.API_URL}api/v1/user/students-user-parent/?kind=${'terms-conditions'}`
    axiosTermsConditions(urlTermsConditions);
    props.setUserObj({...props?.userObj, ['terms_conditions']:true})
    return true
  }

  const checkedTerms = () => {
    if (props?.userObj?.terms_conditions) {
      return "checked"
    }
    else{
      return ""
    }
  }

  return (
    <div>
      <Container className='mt-4'>
        <h2 className='text-center mb-2' style={{marginBottom:'2px'}}>Términos y condiciones</h2>
        <Card className='mb-2'>
          <Card.Body>
            <Card.Text className="terminos">
            <p className='text-justify'>
            Los Términos y Condiciones generales que a continuación se establecen regulan el uso de la aplicación de www.ticlass.com (en adelante “la aplicación"), el cual es puesto a disposición de los usuarios de la web.
            El acceso y uso de los servicios queda condicionado a la aceptación y cumplimiento de estos Términos y Condiciones. Al acceder o usar los servicios, el usuario es consciente de la aplicación de estas Condiciones. La sola utilización de la aplicación le atribuye la condición de usuario (en adelante, el "usuario") de la aplicación y expresa la aceptación plena y sin reservas de todos y cada uno de sus Términos y Condiciones que se encuentren publicados al acceder al portal www.ticlass.com. En consecuencia, partir de lo expuesto, se sugiere al usuarios que los visite periódicamente. Las violaciones a los Términos y Condiciones otorgan a la aplicación el derecho de suspender o terminar la prestación del servicio al usuario que las haya realizado, por acción u omisión.
            </p>
            <br></br>
            <br></br>
            <h3 style={{fontSize:'16px', fontWeight:'normal',lineHeight:'1.5'}} className='p-0 m-0'>Propiedad intelectual</h3>
            <h4 style={{fontSize:'15px', fontWeight:'normal',lineHeight:'1.5'}} className='p-0 m-0'>El usuario se obliga a no:</h4>
            <p className='p-0 m-0'>Publicar o compartir materiales que sean ilícitamente pornográficos o indecentes, o que contengan actos extremos de violencia.</p>
            <p className='p-0 m-0'>Propugnar la intolerancia o el odio contra de personas o grupos de personas en función de su raza, religión, etnia, sexo, identidad sexual, preferencia sexual, discapacidad o trastorno.</p>
            <p className='p-0 m-0'>Infringir la ley de cualquier forma, incluidos el almacenamiento, la publicación o el uso compartido de material que sea fraudulento, difamatorio o engañoso.</p>
            <p className='p-0 m-0'>Infringir la privacidad o los derechos de otras personas.</p>
            <br></br>
            <br></br>
            <p>www.ticlass.com respeta los derechos de propiedad intelectual de otros autores y se espera que los usuarios de la aplicación respeten los derechos de propiedad intelectual que surjan en el contexto del uso del resente sitio.</p>
            <br></br>
            <br></br>
            <h3 style={{fontSize:'16px', fontWeight:'normal',lineHeight:'1.5'}} className='p-0 m-0'>Cuentas de pago</h3>
            <p className='p-0 m-0'>
              Facturación. El usuario puede añadir funcionalidades de pago a tu cuenta (con lo que se convertirá en una "Cuenta de pago"). La facturación es de forma automática a partir de la fecha en que el usuario pase a tener una “Cuenta de pago” y en cada fecha de renovación sucesiva hasta que el usuario la cancele. El usuario será responsable de pagar los impuestos aplicables.
            </p>
            <p className='p-0 m-0'>
              Sin reembolsos. El usuario puede cancelar su “Cuenta de pago” en cualquier momento, pero no se efectuarán reembolsos.
            </p>
            <p className='p-0 m-0'>
              Reducciones de funcionalidades. La “Cuenta de pago” seguirá activa hasta que el usuario se de de baja en el servicio por medio de los canales habilitados para este propósito, o sea cancelada por la infracción de estas Condiciones. Si el usuario no paga su “Cuenta nos reservamos el derecho para suspenderla o reducir las funcionalidades a los niveles de las cuentas gratuitas.
            </p>
            <p className='p-0 m-0'>
              Cambios. Las tarifas vigentes pueden ser modificadas, pero avisaremos por adelantado de estos cambios mediante un mensaje a la dirección de correo asociada a la cuenta del usuario.w
            </p>
            <br></br>
            <br></br>
            <h3 style={{fontSize:'16px', fontWeight:'normal',lineHeight:'1.5'}} className='p-0 m-0'>Datos personales</h3>
            <p className='p-0 m-0'>
              Recolección y uso de información. Recolectamos y utilizamos la información que se describe a continuación para proporcionar nuestros servicios y para medirlos y mejorarlos de manera continua.
            </p>
            <p className='p-0 m-0'>
              <b>Información recogida durante el registro:</b>
              &nbsp;cuando el usuario crea o edita una cuenta en la aplicación, nos facilita información personal tal como su nombre, apodo, fecha de nacimiento, género, clave de acceso y dirección de email.
            </p>
            <br></br>
            <p className='p-0 m-0'>
              <b>Información adicional:</b>
              &nbsp;puede que el usuario nos facilite información personal para hacerla pública, tal como una breve biografía, su ubicación, su sitio web o una fotografía. Puede que el usuario nos facilite información para personalizar su cuenta. Podríamos usar la información de contacto del usuario para enviarle información sobre nuestros servicios o para fines de marketing. Podríamos usar la configuración de su cuenta para anular la suscripción a las notificaciones de www.ticlass.com. Podemos utilizar la información del usuario para ayudar a otros a encontrar su perfil, incluso a través de servicios de terceros y aplicaciones de cliente. Si el usuario conecta su cuenta de www.ticlass.com con su cuenta de otro servicio para compartir publicaciones entre www.ticlass.com y el otro servicio, dicho servicio podrá enviarnos la información de registro o de perfil en el servicio, así como cualquier información que el usuario autorice. Esta información permite compartir publicaciones, nos ayuda a mejorar nuestros servicios, sin perjuicio que la entrega de esta información adicional es absolutamente opcional.
            </p>
            <br></br>
            <p className='p-0 m-0'>
              <b>Enlaces:</b>
              &nbsp;www.ticlass.com puede conservar información sobre cómo el usuario interactúa con enlaces a través de nuestros servicios, incluidas nuestras notificaciones por email, servicios de terceros y aplicaciones de cliente, redirigiendo clics o por otros medios. Ello se hace con el fin de mejorar nuestros servicios, proveer publicidad más relevante y poder compartir estadísticas agregadas de clics como por ejemplo cuántas veces se ha pinchado en un determinado enlace.
            </p>
            <br></br>
            <p className='p-0 m-0'>
              <b>Cookies:</b>
              &nbsp;como muchos sitios web, utilizamos cookies y tecnologías similares para recopilar datos adicionales sobre uso del sitio web y para mejorar nuestros servicios. Una cookie es un pequeño archivo de datos que es transferido al disco duro de su computadora; www.ticlass.com puede usar tanto cookies de sesión como cookies de persistencia con el fin de entender mejor cómo interactúa el usuario con nuestros servicios, monitorizar el uso agregado por parte de nuestros usuarios y el enrutamiento de tráfico web en nuestros servicios, así como personalizar y mejorar nuestros servicios. La mayoría de navegadores de Internet aceptan cookies automáticamente. El usuario puede cambiar la configuración de su navegador para que deje de aceptar cookies o para que le pregunte antes de aceptar una cookie de los sitios web que visitas. Sin embargo, nuestros servicios pueden no funcionar correctamente si el usuario deshabilita las cookies.
            </p>
            <br></br>
            <p className='p-0 m-0'>
              <b>Datos de registro:</b>
              &nbsp;nuestros servidores registran automáticamente la información ("Datos de registro") que se crea a partir del uso que el usuario hace de los servicios. La Información de Registro puede incluir información como su dirección IP, tipo de navegador, sistema operativo, la página web de procedencia, páginas web visitadas, ubicación, su proveedor de servicios de telefonía móvil, identidad del aparato y de la aplicación, términos de búsqueda e información de cookies. Recibimos información de Registro cuando el usuario interactúa con nuestros servicios, por ejemplo, cuando visita nuestros sitios web, se suscribe a nuestros servicios, interactúa con nuestras notificaciones por correo electrónico, utiliza su cuenta de www.ticlass.com para autenticarse ante un sitio web o aplicación de terceros o visita un sitio web de tercero que incluye un botón o widget de www.ticlass.com. Utilizamos Información de Registro para proporcionar nuestros servicios y para medirlos, personalizarlos y mejorarlos. Si no se ha hecho con anterioridad, por ejemplo, según se describe a continuación para los Datos de Widgets, borraremos la Información de Registro o eliminaremos identificadores comunes, como por ejemplo el nombre de usuario, dirección IP completa o dirección de correo electrónico, al cabo de 18 meses.
            </p>
            <br></br>
            <br></br>
            <p className='p-0 m-0'>
              Cesión y revelación de información. No revelamos los datos personales de los usuarios, excepto en las limitadas circunstancias descritas a continuación.
            </p>
            <br></br>
            <p className='p-0 m-0'>
              <b>Proveedores de Servicios:</b>
              &nbsp;contratamos a proveedores de servicios para llevar a cabo funciones y para la prestación de servicios tanto en Chile, los Estados Unidos como fuera de ellos. Podemos compartir los datos personales con dichos proveedores de servicios con arreglo a obligaciones de confidencialidad compatibles con esta cláusula de Datos Personales, y a condición de que los terceros utilicen los datos personales únicamente por nuestra cuenta y conforme a nuestras instrucciones.
            </p>
            <br></br>
            <p className='p-0 m-0'>
              Normas imperativas y daños: salvo que se establezca otra cosa en la presente cláusula de Datos Personales, podemos conservar o revelar la información del usuario si consideramos que es razonablemente necesaria para cumplir con una ley, reglamento o requerimiento legal; para proteger la seguridad de cualquier persona; para tratar problemas de fraude, de seguridad o técnicos; o para proteger los derechos o la propiedad de www.ticlass.com.
            </p>
            <br></br>
            <p className='p-0 m-0'>
              <b>Transferencias entre empresas:</b>
              &nbsp;En caso de que www.ticlass.com se vea afectada por un concurso, fusión, adquisición, reorganización o venta de activos, su información puede ser vendida o transferida como parte de dicha situación. Lo declarado en esta cláusula de Datos Personales aplicará a la información que se transfiera a la nueva entidad.
            </p>
            <br></br>
            <p className='p-0 m-0'>
              <b>Información que no es privada o personal:</b>
              &nbsp;podemos compartir o revelar información del usuario que no sea privada, información agregada y otras informaciones que no constituyan datos personales, como la información pública del perfil de usuario.
            </p>
            <br></br>
            <p className='p-0 m-0'>
              <b>Modificación de su información personal:</b>
              &nbsp;Para todos los usuarios registrado de nuestros servicios, ponemos a su disposición herramientas y posibilidades de configuración de cuenta para acceder o modificar la información personal que nos ha facilitado el usuario y que se encuentra asociada a su cuenta.
            </p>
            <br></br>
            <br></br>
            <h3 style={{fontSize:'16px', fontWeight:'normal',lineHeight:'1.5'}} className='p-0 m-0'>Privacidad en Facebook</h3>
            <p className='p-0 m-0'>
              www.ticlass.com no transmitirá, comercializará, ni publicará la información de los usuarios obtenida a través de Facebook. Esta información es utilizada de manera interna para la autentificación del sitio mediante la cuenta de Facebook. Para lo anterior solo se guardará el ID del usuario de Facebook, de manera de poder asociarlo a la cuenta de www.ticlass.com permitiendo la autentificación del sitio y la obtención de datos básicos de perfil como lo son el nombre, imagen de perfil y correo electrónico asociado.
            </p>
            <br></br>
            <p className='p-0 m-0'>
              Además se utilizará, en caso de que el usuario lo requiera, el ID para publicar en el muro del usuario el resultado de alguna evaluación.
            </p>
            <br></br>
            <br></br>
            <h3 style={{fontSize:'16px', fontWeight:'normal',lineHeight:'1.5'}} className='p-0 m-0'>Renuncia y Limitación de Responsabilidad</h3>
            <p className='p-0 m-0'>
              Se recomienda a todo usuario de la aplicación que lea esta sección con atención, ya que en ella se limita la responsabilidad de www.ticlass.com y sus compañías matrices, sociedades filiales, sociedades afiliadas, empresas vinculadas, administradores, directivos, empleados, agentes, representantes, socios y licenciantes (en adelante, de forma conjunta, las "Entidades de www.ticlass.com"). Cada uno de los subapartados siguientes aplica tan solo hasta el máximo permitido por la ley aplicable. La normativa de algunos países no permite la exclusión de garantías implícitas o la limitación de la responsabilidad contractual y, por ello, el contenido de esta sección puede resultar al usuario no aplicable. El contenido de esta sección no limita los derechos de los que el usuario pudiese ser titular y cuya limitación no esté autorizada por ley.
            </p>
            <br></br>
            <p className='p-0 m-0'>
              Los Servicios Están Disponibles "EN LAS CONDICIONES ACTUALES". El acceso y uso de los servicios o de cualquier contenido se realizará bajo su propia responsabilidad. Por la presente el usuario reconoce y acepta que los servicios se prestarán "EN LAS CONDICIONES ACTUALES" ("as is") y "SUJETOS A LA PROPIA DISPONIBILIDAD" ("as available") de los servicios. Sin perjuicio de lo anterior y en la mayor amplitud que permita la ley aplicable, las entidades de www.ticlass.com excluyen el reconocimiento de toda garantía y condición, ya sean expresas o explícitas, de calidad comercial, adecuación para un determinado propósito o vulneración.
            </p>
            <br></br>
            <p className='p-0 m-0'>
              Las Entidades de www.ticlass.com no ofrecen garantía alguna y declinan toda responsabilidad por lo siguiente:
            </p>
            <p className='p-0 m-0'>
              el carácter completo, preciso, disponible, puntual, seguro y fiable de los servicios o del contenido; cualquier daño a sus sistemas informáticos, la pérdida de datos o cualquier otro daño que resulte del acceso o uso de los servicios o de cualquier contenido; la supresión o la falta de almacenamiento o transmisión de cualquier contenido y cualesquiera comunicaciones a través de los servicios; y la idoneidad de los servicios para satisfacer las necesidades del usuario, su disponibilidad o su prestación de forma ininterrumpida, segura o libre de errores. Ninguna indicación o información, ya sea oral o escrita, que se haya obtenido de las Entidades de www.ticlass.com, dará lugar a una garantía distinta de las previstas aquí de forma expresa.
            </p>
            <br></br>
            <p className='p-0 m-0'>
              Enlaces. Es posible que los servicios contengan enlaces a las páginas web o fuentes de terceros ajenos a www.ticlass.com. Por la presente el usuario reconoce y acepta que las Entidades de www.ticlass.com no son responsables por:
            </p>
            <br></br>
            <p className='p-0 m-0'>
              la disponibilidad y exactitud de tales páginas web o fuentes; o el contenido, los productos o los servicios presentes o disponibles en tales páginas web o fuentes. Los enlaces a tales páginas web o fuentes no implican la aprobación por parte de las Entidades de www.ticlass.com de tales páginas web o fuentes ni del contenido, productos o servicios ofertados desde tales páginas web o fuentes. Por la presente, el usuario acepta y asume responsabilidad exclusiva por todo riesgo derivado del uso de tales páginas web o fuentes.
            </p>
            <p className='p-0 m-0'>
              Limitación de la Responsabilidad. Con la mayor amplitud que permita la ley aplicable, las entidades de www.ticlass.com no serán responsables por ningún daño indirecto, incidental, especial, consecuente o punitivo, o cualquier lucro cesante, en el que haya podido incurrirse de forma directa o indirecta, o cualquier pérdida de uso, fondo de comercio, o cualquier otra pérdida intangible como resultado deSu acceso o uso o incapacidad para acceder o utilizar los servicios.
              Cualquier conducta o contenido generado por un tercero a través de los servicios, incluyendo, sin limitación alguna, toda conducta difamatoria, ofensiva o ilegal de otros usuarios o terceras partes.
              Cualquier contenido obtenido a través de los servicios.
              El acceso, uso o cambio no autorizado de sus transmisiones o comunicaciones.
            </p>
            <p className='p-0 m-0'>
              En ningún caso la indemnización total que deban pagar las entidades de www.ticlass.com podrá superar la cantidad abonada por el usuario a www.ticlass.com en los últimos seis meses por la prestación de los servicios que dieron origen a su reclamación.
            </p>
            <p className='p-0 m-0'>
              Las limitaciones de esta subsección son de aplicación en relación con toda responsabilidad, independientemente de que ésta derive de garantía, contrato, normativa, daño extracontractual (incluso por negligencia) o cualquier otra fuente de responsabilidad, incluso aunque se haya informado a las entidades de wwww.ticlass.com de que tal perjuicio pudiese materializarse e incluso aunque cualquier reparación aquí prevista resultase insatisfactoria en relación con su propósito esencial.
            </p>
            <br></br>
            <br></br>
            <h3 style={{fontSize:'16px', fontWeight:'normal',lineHeight:'1.5'}} className='p-0 m-0'>Ley Aplicable y Foro de dudas</h3>
            <p className='p-0 m-0'>
              Estos Términos y Condiciones y cualquier acción relacionada con las mismas se regirán de conformidad con lo dispuesto por la ley en Chile, sin que resulte de aplicación los principios de conflicto de leyes de su estado o país de residencia. Por la presente, el usuario acepta que toda reclamación, procedimiento o litigio que surja en relación con los Servicios se someterá de manera irrevocable a los tribunales situados en la ciudad de Santiago de Chile y, asimismo, por la presente se somete a la jurisdicción y sede de distintos tribunales y renuncia también a plantear cualquier excepción de forum non conveniens.
            </p>
            <br></br>
            <p className='p-0 m-0'>
              En el caso en que el usuario sea una entidad gubernamental de carácter estatal o local de Chile que usa los Servicios en su condición de tal y no pueda someterse a la normativa aplicable o al foro previsto en las cláusulas anteriores, se considerará que tales cláusulas no le son de aplicación.
            </p>
            <br></br>
            <br></br>
            <h3 style={{fontSize:'16px', fontWeight:'normal',lineHeight:'1.5'}} className='p-0 m-0'>Integridad del Contrato</h3>
            <p className='p-0 m-0'>
              Estos Términos y Condiciones constituyen de forma única y exclusiva el contrato entre el usuario y www.ticlass.com en relación con los servicios (excluyendo cualquier otro servicio para el que el usuario haya celebrado con www.ticlass.com un acuerdo separado o que expresamente complemente o reemplace a estos Términos y Condiciones) y estos Términos y Condiciones derogan y reemplaza cualquier acuerdo anterior entre el usuario y www.ticlass.com en relación con los servicios.
            </p>
            <br></br>
            <p className='p-0 m-0'>
              Ninguna persona física o jurídica podrá ser beneficiaria de estas Condiciones salvo por lo que respecta a los miembros que conforman www.ticlass.com.
            </p>
            <p className='p-0 m-0'>
              Los Términos y Condiciones podrán ser modificados, total o parcialmente, por www.ticlass.com, y dichos cambios tendrán vigencia a partir del momento mismo en que sean publicados o insertados en el sitio www.ticlass.com o desde que sean notificados al usuario por cualquier medio. A partir de lo expuesto, se sugiere que los visite periódicamente. La versión más reciente estará siempre disponible en www.ticlass.com/publico/terminosCondiciones.
            </p>
            <p>
              Si a nuestra entera discreción la revisión de los Términos y Condiciones es substantiva se la notificaremos al usuario a través de una actualización por medio de redes sociales o a través del envío de un correo electrónico vinculado a su cuenta. Una vez que las revisiones sean efectivas, el acceso continuado y el uso de los servicios conformarán la aceptación implícita de los Términos y Condiciones revisados.
            </p>
            </Card.Text>

            <Form>
            <Form.Group className=" mt-2 d-flex align-items-center" controlId="userNotiWhatsApp">
              <Form.Check
                type='checkbox'
                className='me-2'
                id="selectNotification"
                defaultChecked={terms}
                disabled={terms}
                onChange={e => {
                  setTerms(e.target.checked)
                  getTermsConditions(e.target.checked)
                  }
                }
                />
              <Form.Label className='m-0'>
                <span style={{display:'block', fontSize:'small', fontWeight:'200'}}>Acepto los términos y condiciones</span>
              </Form.Label>
            </Form.Group>
            </Form>
          </Card.Body>
        </Card>
        <style global jsx>{`
        .terminos {
          height: 400px;
          overflow: scroll;
        }
      `}</style>
      </Container>
    </div>
  );
}

export default FormStepCuatro;
