import { Formik } from 'formik'
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../store/slice/authSlice'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'


const Regist = () => {
  const message = useSelector((state) => state.auth.message)
  const loading = useSelector((state) => state.auth.signupIn)
  const status = useSelector((state) => state.auth.status)
  const navigate = useNavigate();
  //console.log(status);
  const [bool, setBool] = React.useState(false)

  const validationSchema = yup.object().shape({
    name: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
    password: yup.string().typeError('Должно быть строкой').required('Обязательное поле'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Пароли не совпадают').required('Обязательное поле')
  })

    const dispatch = useDispatch()
console.log("status: ", status);

React.useEffect(()=>{
  if(bool && status == 200){
    navigate("/login")
    setBool(false)
  }
  console.log(status, bool);
}, [bool, status])

    const handleAuth = (username, password) => {
        dispatch(registerUser({username, password})).then(()=> status == 200 && setBool(true))
        console.log(status, 6);
    }
    
  return (
    <div className='main'>
        {message && status == 400 ? 
          <div className='red' style={status == 400 && {color: "red", padding: "10px 10px"}}>
            {!message.errors? message : message.errors.errors[0].msg}
          </div> 
        : null}
        <Formik
        initialValues={{
          name: '',
          password: '',
          confirmPassword: ''
        }}
        validateOnBlur
        onSubmit={(values) => handleAuth(values.name, values.password)}
        validationSchema={validationSchema}>
        {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => (
              <div>
                <p style={{margin: "10px 0 0 0"}}>
                  <input 
                  type={`text`} 
                  name={`name`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder={'Введите ваше имя'}
                  />
                </p>
                {touched.name && errors.name && <p style={{color: "red"}}>{errors.name}</p>}
                <p style={{margin: "10px 0 0 0"}}>
                  <input 
                  type={`password`} 
                  name={`password`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder={'Введите ваш пароль'}
                  />
                </p>
                {touched.password && errors.password && <p style={{color: "red"}}>{errors.password}</p>}
                <p style={{margin: "10px 0 0 0"}}>
                  <input 
                  type={`password`} 
                  name={`confirmPassword`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  placeholder={'Подтвердите пароль'}
                  />
                </p>
                {touched.confirmPassword && errors.confirmPassword && <p style={{color: "red"}}>{errors.confirmPassword}</p>}
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

export default Regist