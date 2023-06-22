import React,{ useState, useEffect } from 'react'
import { GiStopwatch } from 'react-icons/gi'
import { BsHourglassSplit } from 'react-icons/bs'

const Main = () => {
    const [option, setOption] = useState('stopwatch')

    // stopwatch
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);

    // Timer
    const [isTimerRunning, setisTimerRunning] = useState(false)
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    // stopwatch
    useEffect(() => {
        let interval;
        if (running) {
          interval = setInterval(() => {
            setTime((prevTime) => prevTime + 10);
          }, 10);
        } else if (!running) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [running]);  


    //   timer
    useEffect(() => {
        let interval;
        if (isTimerRunning) {
            interval = setInterval(() => {
                if(seconds > 0){
                    setSeconds(seconds - 1)
                }
                if(seconds === 0){
                    if(minutes === 0){
                        if(hours === 0){
                            setisTimerRunning(false)
                        }else{
                            setHours(hours - 1)
                            setMinutes(59)
                            setSeconds(59)
                        }
                    }else{


                        setMinutes(minutes - 1)
                        setSeconds(59)
                    }
                }
            }, 1000);
        } else if (!isTimerRunning) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, seconds, minutes, hours]);
    


    return (     
        <div className='card'>
            <div className='card-header'>
                <div className='stopwatch' onClick={() => setOption('stopwatch')} style={{color: option === 'stopwatch' ? '#7DE5FF' : '#7de5ff5b'  }} >
                    <GiStopwatch/>
                    <p>StopWatch</p>
                </div>
                <div onClick={() => setOption('timer')} style={{color: option === 'timer' ? '#7DE5FF' : '#7de5ff5b'  }} className='timer' >
                    <BsHourglassSplit/>
                    <p>Timer</p>
                </div>   
            </div>
            <div className='line'>
                <div className='line-1' style={{background: option === 'stopwatch' ? '#7DE5FF' : '#7de5ff5b'  }} ></div>
                <div className='line-2' style={{background: option === 'timer' ? '#7DE5FF' : '#7de5ff5b'  }} ></div>
            </div>
            {
                option === 'stopwatch' ? <div className='card-body'>
                    <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}<span className='indicator'>  m  </span></span>
                    <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}<span className='indicator'>  s  </span></span>
                    <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
                </div> : <div className='card-body' >
                    <span>
                        <input id='hours' value={hours} onChange={e => setHours(e.target.value)} name='hours' type='number' />
                        <label className='indicator'>h</label>
                    </span>
                    <span>
                        <input id='minutes' value={minutes} onChange={e => setMinutes(e.target.value)} name='minutes' type='number' />
                        <label className='indicator'>m</label>
                    </span>
                    <span>
                        <input id='seconds' value={seconds} onChange={e => setSeconds(e.target.value)} name='seconds' type='number' />
                        <label className='indicator'>s</label>
                    </span>
                </div>
            }
            
            {
                option === 'stopwatch' ? <div className='card-footer' >
                {
                    running ?  <button className='btn' onClick={() => setRunning(false)}>Stop</button> : <button className='btn'onClick={() => setRunning(true)}>Start</button>
                }
                <button className='btn'  onClick={() => setTime(0)}>Reset</button>  
                </div> : <div className='card-footer' >
                    {
                    isTimerRunning ?  <button className='btn' onClick={() => setisTimerRunning(false)}>Pause</button> : <button className='btn'onClick={() => setisTimerRunning(true)}>Start</button>
                    }
                <button className='btn'  onClick={() => {setHours(0); setMinutes(0); setSeconds(0)}}>Reset</button>
                </div>
            }
            
        </div>
    )
}

export default Main