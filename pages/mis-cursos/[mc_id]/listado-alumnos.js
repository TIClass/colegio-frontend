import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../styles/Home.module.scss';
import variables from '../../../styles/variables.module.scss';
import { Container, Row, Col, Badge, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCalendarAlt, faQuestion,faNewspaper } from "@fortawesome/free-regular-svg-icons";
import { faAnchorCircleExclamation, faCheck, faSortDown, faTicket, faX } from '@fortawesome/free-solid-svg-icons';
import LessonCard from '../../../components/curso/LessonCard';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import PropTypes from 'prop-types';

import parse from 'html-react-parser';

import { useEffect, useState} from 'react';
import { getCookie } from 'cookies-next';
import axios from 'axios';
import { useRouter } from 'next/router'
import Link from 'next/link'

import MUIDataTable from "mui-datatables";

export const getServerSideProps = async ({ params, req,res }) => {
  const cookieUserToken = req.cookies['cookie-usertoken'];
  if (cookieUserToken == undefined) {
    return { redirect: { permanent: false, destination: "/accounts/login/?from="+req.url}, props:{},};
  }
  return { props: {}}
}

export default function MyCourseDetail(props) {
  props.onAuthenticationUser();

  const router = useRouter();
  const token = getCookie('cookie-usertoken');
  const useToken = token ? `Bearer ${token}` : `Token ${process.env.TOKEN_GENERIC_API}`

  const [listStudentsObj, setListStudentsObj] = useState([]);
  const [errorlistStudentsObj, setErrorlistStudentsObj] = useState("");
  const [loadedlistStudentsObj, setLoadedlistStudentsObj] = useState(false);
  const [attendanceObj, setAttendanceObj] = useState([]);
  const [errorattendanceObj, setErrorattendanceObj] = useState("");
  const [loadedattendanceObj, setLoadedattendanceObj] = useState(false);
  // const [columnsAttendance, setColumnsAttendance] = useState(false);

  useEffect(() => {
    if (router.asPath !== router.route) {
      const { mc_id } = router.query
      const today = new Date();
      const year = today.getFullYear()
      const url_list_studentes = `${process.env.API_URL}api/v1/ticourse/list-attendance-students/?packcourse_pk=${mc_id}&kind=list-student&year=${year}`
      axiosListStudents(url_list_studentes)
    }
  }, [])

  const axiosListStudents = (url) => {
    axios
      .get(url, { headers: { Authorization: useToken } })
      .then((response) => setListStudentsObj(response.data))
      .catch((error) => setErrorlistStudentsObj(error.message))
      .finally(() => setLoadedlistStudentsObj(true));
    return null
  }

  const axiosAttendance = (url) => {
    axios
      .get(url, { headers: { Authorization: useToken } })
      .then((response) => setAttendanceObj(response.data))
      .catch((error) => setErrorattendanceObj(error.message))
      .finally(() => setLoadedattendanceObj(true));
    return null
  }

  const getAttendence = () => {
    const { mc_id } = router.query
    const today = new Date();
    const year = today.getFullYear()
    const url_attendance = `${process.env.API_URL}api/v1/ticourse/list-attendance-students/?packcourse_pk=${mc_id}&kind=attendance-student&year=${year}`
    return new Promise((resolve, reject) => { resolve(axiosAttendance(url_attendance));});
  }

  const columnsListStudents = [
    {
      name: "first_name",
      label: "Nombre",
    },
    {
      name: "last_name",
      label: "Apellido",
    },
    {
      name: "phone",
      label: "Teléfono",
    },
    {
      name: "email",
      label: "Correo",
    },
    {
      name: "paid",
      label: "Pagado",
      },
  ];

  const columnsAttendance = []

  if (attendanceObj){
    for (var i = 0; i < attendanceObj?.streamings_pks?.length; i++) {
      const name = attendanceObj.streamings_pks[i]
      columnsAttendance.push(
        {
          name: name,
          options: {
            filter: true,
            customBodyRender: (value, tableMeta, updateValue) => {
              if (value === '✓') {
                return parse('<div class="yes">✓</div>');
              }
              if (value === 'x') {
                return parse('<div class="not">x</div>');
              }
              return value;
            }
          }
        }
      )
    }
  }

  const { mc_id } = router.query

  const options = {
    display: true,
    tableId:mc_id,
    search: true,
    filter: false,
    viewColumns: false,
    draggable:false,
    draggableColumns:{
      enable: false
    },
  }

  const dataListStudentsObj = listStudentsObj?.list_student

  return (
    <div>
      <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <title>Home | Colegio</title>
          <meta name="description" content="description de my Colegio" />
          <meta property="og:site_name" content="Colegio.com" />
          <meta property="og:title" content="My Colegio" key="title" />
          <meta property="og:description" content="description de my Colegio" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.Colegio.com" />
          <meta property="og:image" content="img.jpeg" />

          <meta property="fb:app_id" content="111111111" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content="My Colegio" />
          <meta property="twitter:site" content="@Colegio" />
          <meta property="twitter:creator" content="@Colegio" />
          <meta property="twitter:description" content="my Colegio" />
          <meta property="twitter:image" content="img.jpeg" />

          <link rel="canonical" href="https://www.colegio.com/" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className='py-4'>
        <Container>
        <Tab.Container id="left-tabs-example" defaultActiveKey="listStudents">
          <Nav fill variant="tabs">
            <Nav.Item><Nav.Link eventKey="listStudents">Listado de alumnos</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="attendence" onClick={getAttendence}>Asistencia de alumnos</Nav.Link></Nav.Item>
          </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="listStudents">
              {listStudentsObj && dataListStudentsObj &&
                <MUIDataTable
                  className="nombrecolumna"
                  title="Listado de estudiantes"
                  data={dataListStudentsObj}
                  columns={columnsListStudents}
                  options={options}
                />
              }
              </Tab.Pane>
              <Tab.Pane eventKey="attendence">
              {attendanceObj &&
                <MUIDataTable
                  className="nombrecolumna"
                  title="Asistencia"
                  data={attendanceObj.list_student}
                  columns={columnsAttendance}
                  options={options}
                />
              }
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
      </section>
      <style global jsx>{`
        .not {
          color: red;
        }
        .yes {
          color: green;
        }
      `}</style>
    </div>
  )
}
