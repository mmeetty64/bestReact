import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Service from '../../Service/Service';

const Register = () => {

    const navigation = useHistory();
    const regUserHandler = async(e: any) =>{
        e.preventDefault()
        const {target} = e;
        const data = await Service.reg(target[1].value, target[2].value, target[0].value);
        navigation.push("/Login");
    }

  return (
    <Form onSubmit={regUserHandler} style={{width: "40%"}}>
        <p className='text-center' style={{fontSize: "1.7rem"}}>Регистрация</p>
      <Form.Group className="mb-3 text-center" controlId="formBasicEmail">
        <Form.Label>Адрес</Form.Label>
        <Form.Control type="text" placeholder="Введите адрес" />
      </Form.Group>

      <Form.Group className="mb-3 text-center" controlId="formBasicEmail">
        <Form.Label>Логин</Form.Label>
        <Form.Control type="text" placeholder="Введите логин" />
      </Form.Group>

      <Form.Group className="mb-3 text-center" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Button variant="primary" type="submit" style={{width: "100%"}}>
        Submit
      </Button>
    </Form>
  )
}
export default Register;