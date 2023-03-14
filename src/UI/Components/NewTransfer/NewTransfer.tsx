import React, { FC, useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Context } from '../../../Context/ContextWrapper'
import { IProps } from '../../../Interfaces/Component.interface'
import Service from '../../../Service/Service'

export const NewTransfer: FC<IProps> = ({address}) => {

    const {transact, getTransact} = useContext(Context)

    const transferHandler = async(e: any) => {
        e.preventDefault()
        const {target} = e;
        const data = await Service.newTransfer(target[0].value, target[1].value, target[2].value, address)
        getTransact(transact+1)
    }
  return (
    <Form onSubmit={transferHandler} style={{width: "40%"}}>
        <p className='text-center' style={{fontSize: "1.7rem"}}>Вход</p>
      <Form.Group className="mb-3 text-center">
        <Form.Label>Адрес получателя</Form.Label>
        <Form.Control type="text" placeholder="Введите адрес" />
      </Form.Group>

      <Form.Group className="mb-3 text-center">
        <Form.Label>Количество токенов</Form.Label>
        <Form.Control type="number" placeholder="Введите количество" />
      </Form.Group>

      <Form.Group className="mb-3 text-center">
        <Form.Label>Тип токенов</Form.Label>
        <Form.Select aria-label="Default select example">
            <option value="0">Seed</option>
            <option value="1">Private</option>
            <option value="2">Public</option>
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit" style={{width: "100%"}}>
        Submit
      </Button>
    </Form>
  )
}
