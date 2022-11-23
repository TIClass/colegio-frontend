function getLogo(subdomain) {
  let imgLogo = ''
  if(subdomain === 'colegio') {
    imgLogo = '/logos/img/logo-colegio-ticlass.svg'
  }

  if(subdomain === 'cursos') {
    imgLogo = '/logos/img/logo-cursos-ticlass.svg'
  }
  return imgLogo;
}

function getClassLanding(subdomain) {
  let classLanding = ''
  if(subdomain === 'colegio') {
    classLanding = 'landing-home-colegio'
  }

  if(subdomain === 'cursos') {
    classLanding = 'landing-home-cursos'
  }
  return classLanding;
}

module.exports = { getLogo, getClassLanding }
