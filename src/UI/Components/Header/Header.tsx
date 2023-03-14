import React, { useContext } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import {Link} from "react-router-dom"
import { Context } from '../../../Context/ContextWrapper'

export const Header = () => {

    const {user, logout} = useContext(Context);

  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/Home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/Home">Главная</Link>
            {
                user.wallet ? <Link to="/Login" onClick={logout}>Выход</Link> : 
                <>
                <Link to="/Register">Регистрация</Link>
                <Link to="/Login">Вход</Link>
                </>
            }
          </Nav>
        </Container>
      </Navbar>
  )
}
