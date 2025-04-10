import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [loginType, setLoginType] = useState('phone')

  const onSubmit = (data) => {
    console.log('登录数据:', data)
    // TODO: 对接后端API
  }

  return (
    <div className="login-container">
      <h2>用户登录</h2>
      <div className="login-types">
        <button 
          className={loginType === 'phone' ? 'active' : ''}
          onClick={() => setLoginType('phone')}
        >
          手机登录
        </button>
        <button
          className={loginType === 'email' ? 'active' : ''}
          onClick={() => setLoginType('email')}
        >
          邮箱登录
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {loginType === 'phone' && (
          <div className="form-group">
            <input
              {...register('phone', { 
                required: '手机号必填',
                pattern: {
                  value: /^1[3-9]\d{9}$/,
                  message: '手机号格式错误'
                }
              })}
              placeholder="请输入手机号"
            />
            {errors.phone && <span className="error">{errors.phone.message}</span>}
          </div>
        )}

        {loginType === 'email' && (
          <div className="form-group">
            <input
              {...register('email', { 
                required: '邮箱必填',
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: '邮箱格式错误'
                }
              })}
              placeholder="请输入邮箱"
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>
        )}

        <div className="form-group">
          <input
            {...register('password', { 
              required: '密码必填',
              minLength: { value: 6, message: '密码至少6位' }
            })}
            type="password"
            placeholder="请输入密码"
          />
          {errors.password && <span className="error">{errors.password.message}</span>}
        </div>

        <button type="submit">登录</button>
        <div className="third-party-login">
          <button type="button" className="wechat-login">
            微信登录
          </button>
          <button type="button" className="alipay-login">
            支付宝登录
          </button>
        </div>
        <div className="register-link">
          还没有账号？<Link to="/register">立即注册</Link>
        </div>
      </form>
    </div>
  )
}