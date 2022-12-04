import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export class Login extends Component {
  constructor() {
    super()
    this.state = {
      form: {
        email: '',
        password: '',
      },
      errors: {
        email: '',
        password: '',
      },
    }

    
  }

  handleFormsubmit = (e) => {
    e.preventDefault()

    const { email, password } = this.state.form
    const errors = {}

    if (typeof email === 'string' && email.trim() === '') {
      errors.email = 'Vui lòng nhập email'
    }

    if (typeof password === 'string' && password.trim() === '') {
      errors.password = 'Vui lòng nhập password'
    }

    this.setState({
      errors: errors,
    })

    if(Object.keys(errors).length === 0) {
      this.setState({
        form: {
          email: '',
          password: ''
        }
      })
    }

    console.log('keys',Object.keys(errors))
  }

  handleChangeValue = (e) => {
    const data = { ...this.state.form }
    data[e.target.name] = e.target.value

    this.setState({
      form: data,
    })
  }

  render() {
    const { form, errors } = this.state
    const { email, password } = form

    return (
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-6">
            <form
              noValidate
              className=""
              action=""
              onSubmit={this.handleFormsubmit}
            >
              <div className="mb-3">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  name="email"
                  placeholder="Email..."
                  onChange={this.handleChangeValue}
                  value={email}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors?.email}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.password ? 'is-invalid' : ''
                  }`}
                  name="password"
                  placeholder="Password..."
                  onChange={this.handleChangeValue}
                  value={password}
                />

                {errors.password && (
                  <div className="invalid-feedback">{errors?.password}</div>
                )}
              </div>

              <button type="submit" className="btn btn-success">
                Button
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
