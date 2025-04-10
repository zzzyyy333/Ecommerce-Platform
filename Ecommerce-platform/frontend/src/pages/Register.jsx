import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

export default function Register() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  
  const onSubmit = (data) => {
    console.log('注册数据:', data)
    // TODO: 对接后端注册API
  }

  return (
    <div className="register-container">
      <h2>用户注册</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            {...register('phone', {
              pattern: {
                value: /^1[3-9]\d{9}$/,
                message: '手机号格式错误'
              }
            })}
            placeholder="手机号（可选）"
          />
          {errors.phone && <span className="error">{errors.phone.message}</span>}
        </div>

        <div className="form-group">
          <input
            {...register('email', {
              required: '邮箱必填',
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: '邮箱格式错误'
              }
            })}
            placeholder="邮箱"
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <input
            {...register('password', {
              required: '密码必填',
              minLength: { value: 6, message: '密码至少6位' }
            })}
            type="password"
            placeholder="设置密码"
          />
          {errors.password && <span className="error">{errors.password.message}</span>}
        </div>

        <div className="form-group">
          <input
            {...register('confirmPassword', {
              validate: value => 
                value === watch('password') || '两次密码不一致'
            })}
            type="password"
            placeholder="确认密码"
          />
          {errors.confirmPassword && 
            <span className="error">{errors.confirmPassword.message}</span>}
        </div>

        <button type="submit">立即注册</button>
        <div className="third-party-login">
          <button type="button" className="wechat-login">
            微信注册
          </button>
          <button type="button" className="alipay-login">
            支付宝注册
          </button>
        </div>
        <div className="login-link">
          已有账号？<Link to="/login">立即登录</Link>
        </div>
      </form>
    </div>
  )
}