import React, { FC, useContext, useEffect, useState } from 'react'
import { Button, ListGroup } from 'react-bootstrap';
import { Context } from '../../../Context/ContextWrapper';
import { IProps } from '../../../Interfaces/Component.interface';
import Service from '../../../Service/Service';

interface IReqList{
    name: string;
    wallet: string;
}

export const ApplyReqWL: FC<IProps> = ({address}) => {

    const [reqList, setReqList] = useState<IReqList[]>([])
    const {transact, getTransact} = useContext(Context)

    useEffect(() => {
        (async () => {
            const req: IReqList[] = await Service.viewReqWL();
            setReqList(req)
        })()
    }, [reqList])
    
    const applyReqHandler = async(id: number, answer: boolean) => {
        const apply = await Service.applyReqWL(id, answer, address)
        getTransact(transact+1)
    }
  return (
    <ListGroup as="ol" numbered>
        <p style={{fontSize: "1.6rem"}}>Модерация заявок в вайтлист</p>
        {
            reqList.map((el, idx) => {
                if(el.wallet.includes("000000")) return;
                return <ListGroup.Item key={idx} as="li">
                    Имя: {el.name} || Адрес: {el.wallet}
                    <Button variant="success" style={{marginLeft: "1rem"}} onClick={() => applyReqHandler(idx, true)}>Добавить</Button>
                    <Button variant="danger" style={{marginLeft: "1rem"}} onClick={() => applyReqHandler(idx, false)}>Удалить</Button>
                </ListGroup.Item>
            })
        }
      
    </ListGroup>
  )
}
