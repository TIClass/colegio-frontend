
function ShowCountdownTimer({ days, hours, minutes, seconds }) {
  return (    
    <div className="show-counter">                  
      <div className='alert text-center'>
            La clase comienza en:
            <br></br>
            <div className='py-2 mb-0 cuenta'>
              <div className='simple-section'>
                <div>
                  <span className='simple-amount'>{days}</span><br></br><span className='simple-word'>Dia</span>
                </div>
              </div>
              <div className='simple-section'>
                <div>
                  <span className='simple-amount'>{hours}</span><br></br><span className='simple-word'>Horas</span>
                </div>
              </div>
              <div className='simple-section'>
                <div>
                  <span className='simple-amount'>{minutes}</span><br></br><span className='simple-word'>Minutos</span>
                </div>
              </div>
              <div className='simple-section'>
                <div>
                  <span className='simple-amount'>{seconds}</span><br></br><span className='simple-word'>Segundos</span>
                </div>
              </div>
            </div>
          </div>                  
      </div>
  );
}

export default ShowCountdownTimer;

