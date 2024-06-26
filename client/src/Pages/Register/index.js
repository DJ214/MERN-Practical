import React,{useEffect} from 'react'
import Button from "../../components/Button"
import {Link,useNavigate} from 'react-router-dom'

import { Form, message } from 'antd'
import { RegisterUser } from '../../apicalls/users'

const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values)=>{
    try{
    //   console.log(values);
    //make the post request
        const res = await RegisterUser(values);
        if(res.success){
            message.success(res.message);
        }else{
            message.error(res.message);
        }     
    }catch(err){
      message.error(err.message);
    }    
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

    return (
        <div className="flex justify-center h-screen items-center bg-primary">
        <div className="card p-3 w-400">
          <h1 className="text-xl mb-1">Welcome to test Page! Please Register </h1>
          <hr />
          <Form layout="vertical" className="mt-1" onFinish={onFinish}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: "Please input your first name!" }]}
            >
              <input type="text" />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: "Please input your last name!" }]}
            >
              <input type="text" />
            </Form.Item>
            <Form.Item
              label="Mobile"
              name="mobile"
              rules={[{ required: true, message: "Please input your mobile number!" }]}
            >
              <input type="text" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <input type="email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <input type="password" />
            </Form.Item>
    
            <div className="flex flex-col mt-2 gap-1">
              <Button fullWidth title="REGISTER" type="submit" />
              <Link to="/login" className="text-primary">
                {" "}
                Already have an account? Login
              </Link>
            </div>
          </Form>
        </div>
      </div>
    )
}

export default Register