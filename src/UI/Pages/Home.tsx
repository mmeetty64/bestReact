import React, { useContext, useEffect } from 'react'
import { Context } from '../../Context/ContextWrapper';
import Service from '../../Service/Service';
import { ApplyReqWL } from '../Components/ApplyReqWL/ApplyReqWL';
import { BalanceInfo } from '../Components/BalanceInfo/BalanceInfo';
import { Donat } from '../Components/Donat/Donat';
import { NewTransfer } from '../Components/NewTransfer/NewTransfer';
import { PrivateSale } from '../Components/PrivateSale/PrivateSale';
import { PublicSale } from '../Components/PublicSale/PublicSale';
import { ReqWhiteList } from '../Components/ReqWhiteList/ReqWhiteList';
import { Timer } from '../Components/Timer/Timer';
import { TokenPrice } from '../Components/TokenPrice/TokenPrice';

const Home = () => {

    const {user, balance, getBalance, transact} = useContext(Context)
    
    useEffect(() => {
      (async() => {
        if(user.wallet){
          const bal = await Service.newBalance(user.wallet);
          getBalance(bal[0], bal[1], bal[2], bal[3])
        }
      })()
    }, [transact])

    if(!user.wallet){
        return <p className="text-center" style={{fontSize: "1.7rem"}}>Войдите в аккаунт</p>
    }

  return (
    <div style={{width: "100%",display: "flex",flexDirection: "column", alignItems: "center"}}>
        <Timer/>
        <p style={{fontSize: "1.6rem"}}>Ваш логин: {user.login}</p>
        <p style={{fontSize: "1.6rem"}}>Ваш адрес: {user.wallet}</p>
        <p style={{fontSize: "1.6rem"}}>Ваш баланс: {balance.balance / 10**18}</p>
        <p style={{fontSize: "1.6rem"}}>Ваш баланс токенов: {balance.seedToken / 10**12 + balance.privToken / 10**12 + balance.publToken / 10**12}</p>
        <p style={{fontSize: "1.6rem"}}>У вас {balance.seedToken / 10**12} seed токенов</p>
        <p style={{fontSize: "1.6rem"}}>У вас {balance.privToken / 10**12} private токенов</p>
        <p style={{fontSize: "1.6rem"}}>У вас {balance.publToken / 10**12} public токенов</p>
        <TokenPrice address={user.wallet}/>
        {user.inWhiteList ? <p className="text-center" style={{fontSize: "1.6rem"}}>Вы в вайтлисте!</p> : <ReqWhiteList address={user.wallet}/>}
        {user.role == 2 ? <ApplyReqWL address={user.wallet}/> : undefined}
        {user.role ==3 ? <Donat address={user.wallet}/> : undefined}
        {user.role == 2 || user.role == 3 || user.role == 4 ? <BalanceInfo address={user.wallet}/> : undefined}
        <PrivateSale address={user.wallet}/>
        <PublicSale address={user.wallet}/>
        <NewTransfer address={user.wallet}/>
    </div>
  )
}
export default Home;
