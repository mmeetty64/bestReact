import { type } from "os";
import { ReactNode } from "react";

interface IValues{
    user: IUser;
    getUser:(user: IUser) => void;
    logout: () => void;
    phase: number;
    getPhase: (phase: number) => void;
    transact: number;
    getTransact: (transact: number) => void;
    balance: IBalance;
    getBalance: (arg0: number, arg1: number, arg2: number, arg3: number) => void
}

interface IUser{
    login: string;
    balance: number;
    wallet: string;
    role: number;
    inWhiteList: boolean;
    seedToken: number;
    privToken: number;
    publToken: number;
}

interface IBalance{
    balance: number;
    seedToken: number;
    privToken: number;
    publToken: number;
}

interface IProps{
    children: ReactNode;
}
export type{
    IValues,
    IUser,
    IProps,
    IBalance
}