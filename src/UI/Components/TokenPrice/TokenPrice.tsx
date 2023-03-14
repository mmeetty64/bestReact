import React, { FC, useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Context } from '../../../Context/ContextWrapper'
import { IProps } from '../../../Interfaces/Component.interface'
import Service from '../../../Service/Service'

export const TokenPrice: FC<IProps> = ({ address }) => {

    const { user } = useContext(Context)
    const [tokenPrice, setTokenPrice] = useState<number>(0)

    useEffect(() => {
        (async () => {
            const priceData = await Service.viewTokenPrice()
            setTokenPrice(priceData)
        })()
    }, [tokenPrice])

    const changePriceHandler = async (e: any) => {
        e.preventDefault()
        const { target } = e;
        const data = await Service.changePrice(target[0].value, address)
        setTokenPrice(target[0].value)
    }

    return (
        <div>
            <p className='text-center' style={{ fontSize: "1.6rem" }}>Цена токена: {tokenPrice / 10 ** 18}</p>
            {user.role == 4 ? <>
                <Form onSubmit={changePriceHandler} style={{ width: "100%" }}>
                    <p className='text-center' style={{ fontSize: "1.7rem" }}>Изменить цену токена</p>

                    <Form.Group className="mb-3 text-center">
                        <Form.Label>Новая цена</Form.Label>
                        <Form.Control type="text" placeholder="Введите новую цену" />
                    </Form.Group>

                    <Button variant="primary" type="submit" style={{ width: "100%" }}>
                        Submit
                    </Button>
                </Form>
            </>: undefined}
        </div>
    )
}
