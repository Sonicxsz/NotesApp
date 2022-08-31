import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from 'formik'
import * as yup from 'yup'
import { login } from "../../store/slice/authSlice";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const message = useSelector((state) => state.auth.message)
    const token = useSelector((state) => state.auth.token)
    const status = useSelector((state) => state.auth.status)
    const [bool, setBool] = React.useState(false)

    const validationSchema = yup.object().shape({
        name: yup.string().typeError('Должно быть строкой').required('Обязательно'),
        password: yup.string().typeError('Должно быть строкой').required('Обязательно'),
      })
      
      //console.log(token === "undefined")

      React.useEffect(()=> {
        if(status == 200 && token != "undefined" && bool){
          navigate("/")
          setBool(false)
        }
        console.log(token, bool);
      }, [bool, token])

      const signIn = (username, password) => {
        dispatch(login({username, password})).then(()=> status == 200 && setBool(true))
        console.log(token);
      }
      console.log(message, 7);

  return (
    <div className="main">
        {message && status == 400 ? 
          <div className='red' style={status == 400 && {color: "red", padding: "10px 10px"}}>
            {!message.errors? message.message : message.errors.errors[0].msg}
            {console.log(message, 8)}
          </div> 
        : null}
     <Formik
        initialValues={{
          name: '',
          password: ''
        }}
        validateOnBlur
        onSubmit={(values) => signIn(values.name, values.password)}
        validationSchema={validationSchema}>
        {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
              <div>
                <div style={{margin: "10px 0 0 0"}}>
                  <input 
                  type={`text`} 
                  name={`name`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder={`Введите ваше имя`}
                  />
                </div>
                {touched.name && errors.name && <p>{errors.name}</p>}
                <div style={{margin: "10px 0 0 0"}}>
                  <input 
                  type={`password`} 
                  name={`password`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder={`Введите ваш пароль`}
                  />
                </div>
                {touched.password && errors.password && <p>{errors.password}</p>}

                <button
                disabled={!isValid && !dirty}
                onClick={handleSubmit}
                type={`submit`}
                style={{margin: "10px 0 0 0"}}
                >
                  отправить
                  </button>
              </div>
            )}
        </Formik>
    </div>
  )
}

export default Login