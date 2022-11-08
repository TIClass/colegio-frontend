import { useCountdown } from '../../hooks/useCountdown';
import ShowCountdownTimer from './ShowCountDownTimer'

function CountdownTimer({ targetDate }) {
    const [days, hours, minutes, seconds] = useCountdown(targetDate);

    if (days + hours + minutes + seconds <= 0) {
      return <div></div>;
    } else {
      return (
        <ShowCountdownTimer
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      );
    }
}

export default CountdownTimer;
