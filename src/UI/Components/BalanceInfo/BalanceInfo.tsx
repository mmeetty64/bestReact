import React, { FC, useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { IUser } from '../../../Context/Context.Interface';
import { Context } from '../../../Context/ContextWrapper';
import { IProps } from '../../../Interfaces/Component.interface'
import Service from '../../../Service/Service';

export const BalanceInfo: FC<IProps> = ({ address }) => {

    const { user } = useContext(Context)

    const initialState = {
        login: '',
        balance: 0,
        wallet: '',
        role: 0,
        inWhiteList: false,
        seedToken: 0,
        privToken: 0,
        publToken: 0
    }

    const [usery, setUsery] = useState(initialState);

    const infoUserHandler = async (e: any) => {
        e.preventDefault()
        const { target } = e;
        const data = await Service.infoUser(target[0].value, address)
        setUsery(data)
        console.log(user)
        console.log(usery)
    }

    return (
        <div>
            <Form onSubmit={infoUserHandler} style={{ width: "100%" }}>
                <p className='text-center' style={{ fontSize: "1.7rem" }}>Информация об активах пользователя</p>
                <Form.Group className="mb-3 text-center">
                    <Form.Label>Адрес пользователя</Form.Label>
                    <Form.Control type="text" placeholder="Введите адрес" />
                </Form.Group>

                <Button variant="primary" type="submit" style={{ width: "100%" }}>
                    Submit
                </Button>
            </Form>
            {
                usery.wallet ?
                    (
                        <>
                            <p className="text-center" style={{ fontSize: "1.6rem" }}>Логин пользователя: {usery.login}</p>
                            {user.role == 4 ?
                                (
                                    <>
                                        <p className="text-center" style={{ fontSize: "1.6rem" }}>Баланс всех токенов пользователя: {usery.seedToken / 10 ** 12 + usery.privToken / 10 ** 12 + usery.publToken / 10 ** 12}</p>
                                        <p className="text-center" style={{ fontSize: "1.6rem" }}>Баланс seed токенов пользователя: {usery.seedToken / 10 ** 12}</p>
                                    </>
                                ) : undefined}
                            {user.role == 2 || user.role == 4 ? <p className="text-center" style={{ fontSize: "1.6rem" }}>Баланс private токенов пользователя: {usery.privToken / 10 ** 12}</p> : undefined}
                            {user.role == 3 || user.role == 4 ? <p className="text-center" style={{ fontSize: "1.6rem" }}>Баланс public токенов пользователя: {usery.publToken / 10 ** 12}</p> : undefined}
                        </>
                    ) : undefined
            }
        </div>
    )
}
