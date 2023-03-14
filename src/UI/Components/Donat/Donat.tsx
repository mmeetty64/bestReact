import React, { FC, useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Context } from '../../../Context/ContextWrapper'
import { IProps } from '../../../Interfaces/Component.interface'
import Service from '../../../Service/Service'

export const Donat: FC<IProps> = ({address}) => {

    const {transact, getTransact} = useContext(Context)

    const donatHandler = async(e: any) => {
        e.preventDefault()
        const {target} = e;
        const data = await Service.donat(target[0].value, target[1].value, address)
        getTransact(transact+1)
    }
  return (
    <Form onSubmit={donatHandler} style={{width: "40%"}}>
        <p className='text-center' style={{fontSize: "1.7rem"}}>Вознаграждение партнеров проекта</p>
      <Form.Group className="mb-3 text-center">
        <Form.Label>Адрес партнера</Form.Label>
        <Form.Control type="text" placeholder="Введите адрес" />
      </Form.Group>

      <Form.Group className="mb-3 text-center">
        <Form.Label>Количество токенов</Form.Label>
        <Form.Control type="number" placeholder="Введите количество" />
      </Form.Group>

      <Button variant="primary" type="submit" style={{width: "100%"}}>
        Submit
      </Button>
    </Form>
  )
}
