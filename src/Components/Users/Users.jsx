import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Users.scss'
import Modal from 'react-bootstrap/Modal'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import config from '../../Config.json'
const { SERVER_API } = config

// !_____________________________

export class Users extends Component {
  constructor() {
    super()
    this.state = {
      userList: [],
      errors: {
        name: '',
        email: '',
      },
      user: {
        name: '',
        email: '',
        status: true,
      },

      modal: false,
      event: null,
      currentId: null,
    }
  }

  componentDidMount() {
    this.getUser()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.event !== this.state.event) {
      this.getUser()
      this.setState({
        event: '',
      })
    }
  }

  // render list user
  getUser = async () => {
    const res = await fetch(`${SERVER_API}/users`)
    const users = await res.json()

    if (res.ok) {
      this.setState({
        userList: users,
      })
    }
  }

  // add user
  postUser = async (data) => {
    const res = await fetch(`${SERVER_API}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      toast.success('🦄 Thêm thành công!')
      this.dispatchName('add')
    }
  }

  // update user
  patchUser = async (data, id) => {
    const res = await fetch(`${SERVER_API}/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      toast.success('🦄 Cập nhật thành công!')
      this.dispatchName('update')
    }
  }

  // remove user
  removeUser = async (id) => {
    const res = await fetch(`${SERVER_API}/users/${id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      toast.success('🦄 Hải, Quay xe!')
      this.dispatchName('remove')
    }
  }

  // * handle remove
  handleRemove = (id) => {
    alert('Em muốn chia tay sao ?')
    this.removeUser(id)
  }

  // dispatch name
  dispatchName = (event) => {
    this.setState({
      event: event,
    })
  }

  // * dispatch boolean modal
  dispatchModal = (state) => {
    this.setState({
      modal: state,
    })
  }

  showModal = (state) => {
    this.dispatchModal(state)
  }

  hideModal = (state) => {
    this.dispatchModal(state)
    this.setState({
      errors: {
        name: '',
        email: '',
      },

      user: {
        name: '',
        email: '',
        status: true,
      },

      currentId: null,
    })
  }

  // * handle change value
  handleChange = (name) => {
    const data = { ...this.state.user }
    const value = document.querySelector(`#form [name=${name}]`).value

    name !== 'status'
      ? (data[`${name}`] = value)
      : (data[`${name}`] = Number(value) === 1 ? true : false)

    this.setState({
      user: data,
    })
  }

  // * handle submit form
  hanldeFormSubmit = (e) => {
    e.preventDefault()
    const { name, email } = this.state.user
    const errors = {}

    if ((typeof name === 'string') & (name.trim() === '')) {
      errors.name = 'Vui lòng nhập tên'
    }
    if ((typeof email === 'string') & (email.trim() === '')) {
      errors.email = 'Vui lòng nhập email'
    }

    if (Object.keys(errors).length) {
      this.setState({
        errors: errors,
      })
    }

    const data = { ...this.state.user }

    if (Object.keys(errors).length === 0) {
      if (this.state.currentId === null) {
        this.postUser(data)
      } else {
        this.patchUser(data, this.state.currentId)
      }

      this.hideModal(false)
    }
  }

  // *show modal edit
  handleShowEdit = (id) => {
    this.showModal(true)
    this.setState({
      currentId: id,
    })

    const { userList } = this.state
    const data = { ...this.state.user }
    if (userList.length) {
      userList.forEach((user) => {
        if (user.id === id) {
          data.name = user.name
          data.email = user.email
          data.status = user.status
        }
      })
    }

    this.setState({
      user: data,
    })
  }

  render() {
    const { userList, errors, user, currentId } = this.state
    const { name, email, status } = user

    return (
      <div className="container">
        <h1 className="my-5">Quản lý người dùng</h1>

        <button
          onClick={() => {
            this.showModal(true)
          }}
          type="button"
          className="mb-3 btn btn-primary"
        >
          Thêm mới
        </button>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col" width="7%">
                STT
              </th>
              <th scope="col" width="7%">
                Check
              </th>
              <th scope="col">Tên</th>
              <th scope="col">Email</th>
              <th scope="col">Trạng thái</th>
              <th scope="col" width="7%">
                Sửa
              </th>
              <th scope="col" width="7%">
                Xóa
              </th>
            </tr>
          </thead>
          <tbody>
            {userList.length > 0 &&
              userList.map(({ name, email, status, id }, index) => {
                return (
                  <tr key={id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>
                      {status ? (
                        <span className="btn btn-success">Kích hoạt</span>
                      ) : (
                        <span className="btn btn-primary">Chưa kích hoạt</span>
                      )}
                    </td>
                    <td>
                      <a
                        onClick={() => {
                          this.handleShowEdit(id)
                        }}
                        href="#"
                        className="btn btn-warning"
                      >
                        Sửa
                      </a>
                    </td>
                    <td>
                      <a
                        href="#"
                        className="btn btn-danger"
                        onClick={() => {
                          this.handleRemove(id)
                        }}
                      >
                        Xóa
                      </a>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        <button type="button" className="btn btn-danger">
          Xóa đã trọn (0)
        </button>

        <Modal
          show={this.state.modal}
          onHide={() => {
            this.hideModal(false)
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {!currentId ? 'Thêm công việc mới' : 'Sửa công việc '}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.hanldeFormSubmit} id="form">
              <div className="mb-3">
                <label htmlFor="">Tên</label>
                <input
                  type="text"
                  className={
                    errors.name ? 'form-control is-invalid' : 'form-control'
                  }
                  placeholder="Tên..."
                  name="name"
                  value={name}
                  onChange={() => {
                    this.handleChange('name')
                  }}
                />
                <div className="invalid-feedback">{errors.name}</div>
              </div>

              <div className="mb-3">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  className={
                    errors.email ? 'form-control is-invalid' : 'form-control'
                  }
                  placeholder="Email..."
                  name="email"
                  value={email}
                  onChange={() => {
                    this.handleChange('email')
                  }}
                />
                <div className="invalid-feedback">{errors.email}</div>
              </div>

              <div className="mb-3">
                <span>Trạng thái</span>
                <select
                  className="form-select"
                  onChange={() => {
                    this.handleChange('status')
                  }}
                  name="status"
                >
                  {status ? (
                    <option selected value="1">
                      Kích hoạt
                    </option>
                  ) : (
                    <option value="1">Kích hoạt</option>
                  )}
                  {status ? (
                    <option value="0">Chưa kích hoạt</option>
                  ) : (
                    <option selected value="0">
                      Chưa kích hoạt
                    </option>
                  )}
                </select>
              </div>

              <button type="submit" className="btn btn-success">
                Lưu
              </button>
            </form>
          </Modal.Body>
        </Modal>

        <ToastContainer />
      </div>
    )
  }
}

export default Users
