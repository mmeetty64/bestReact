import React, { createContext, FC, useState } from 'react'
import { IBalance, IProps, IUser, IValues } from './Context.Interface';

export const Context = createContext({} as IValues);

export const ContextWrapper: FC<IProps> = ({ children }) => {
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

    const initialBalance = {
        balance: 0,
        seedToken: 0,
        privToken: 0,
        publToken: 0
    }

    const [user, setUser] = useState(initialState)
    const [phase, setPhase] = useState(1)
    const [transact, setTransact] = useState(0)
    const [balance, setBalance] = useState(initialBalance)

    const getUser = (user: IUser) => {
        setUser(user);
        console.log(user)
    }

    const getPhase = (phase: number) => {
        setPhase(phase)
    }

    const getTransact = (transact: number) => {
        setTransact(transact)
    }

    const getBalance = (arg0: number, arg1: number, arg2: number, arg3: number) => {
        setBalance({balance: arg0, seedToken: arg1, privToken: arg2, publToken: arg3})
    }

    const logout = () => {
        setUser(initialState)
        setBalance(initialBalance)
    }

    const values = {
        user,
        getUser,
        logout,
        phase,
        getPhase,
        transact,
        getTransact,
        balance,
        getBalance
    }
    return (
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    )
}
