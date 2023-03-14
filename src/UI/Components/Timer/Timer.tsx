import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { Context } from '../../../Context/ContextWrapper';
import Service from '../../../Service/Service';

export const Timer = () => {
    const [iter, setIter] = useState<number>(0)
    const [localTime, setLocalTime] = useState<number>(0)
    const [timeStart, setTimeStart] = useState<string>("")
    const [activate, setActivate] = useState<number>(1) 
    const {phase, getPhase, transact, getTransact} = useContext(Context)

    useEffect(() => {
        (async() => {
            const time = await Service.systemTime();
            const timeStarty = await Service.timeStart();
            const date = new Date(timeStarty*1000)
            setTimeStart(date.toLocaleTimeString());
            setLocalTime(+time);
        })()
    }, [phase])

    useEffect(() => {
        const interval = setInterval(() => setIter(iter+1), 1000)
        setLocalTime(localTime + 1)
        if(localTime > 300 && localTime < 900){
            getPhase(2)
        }
        else if(localTime > 900){
            getPhase(3)
        }
        return () => clearInterval(interval);
    }, [iter])

    useEffect(() => {
        (async() => {
            if(phase == 2 && activate < 2){
                const activ = await Service.activatePrivProv();
                setActivate(2)
                getTransact(transact+1)
            }
            else if(phase == 3 && activate < 3){
                const activ = await Service.activatePublProv();
                setActivate(3)
                getTransact(transact+1)
            }
            console.log(activate)
        })()
    }, [phase])

    const boostTimeHandler = async() =>{
        const boost = await Service.boostTime();
        const time = await Service.systemTime();
        setLocalTime(+time);
    }

  return (
    <div>
        <p className='text-center' style={{fontSize: "1.6rem"}}>Сейчас: {localTime}</p>
        <p className='text-center' style={{fontSize: "1.6rem"}}>Время старта системы: {timeStart}</p>
        {phase == 1 ? <p className='text-center' style={{fontSize: "1.6rem"}}>Сейчас seed фаза</p> : phase == 2 ? <p className='text-center' style={{fontSize: "1.6rem"}}>Сейчас private фаза</p> : phase == 3 ? <p className='text-center' style={{fontSize: "1.6rem"}}>Сейчас public фаза</p> : undefined}
        <Button variant="primary" style={{width: "100%"}} onClick={() => boostTimeHandler()}>
        Ускорить время
        </Button>
    </div>
  )
}
