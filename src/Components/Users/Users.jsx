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
      modalAdd: false,
      modalEdit: false,
      errors: {
        nameError: '',
        emailError: '',
      },
      event: null,
      user: {
        name: '',
        email: '',
        status: true,
      },
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

  getUser = async () => {
    const res = await fetch(`${SERVER_API}/users`)
    const users = await res.json()

    if (res.ok) {
      this.setState({
        userList: users,
      })
    }
  }

  // dispatch name
  dispatchName = (event) => {
    this.setState({
      event: event,
    })
  }

  // dispatch boolean
  dispatchModalAdd = (state) => {
    this.setState({
      modalAdd: state,
    })
  }

  showModalAdd = () => {
    this.dispatchModalAdd(true)
  }

  hideModalAdd = () => {
    this.dispatchModalAdd(false)
    this.setState({
      errors: {
        nameError: '',
        emailError: '',
      },
    })
  }

  dispatchModalEdit = (state) => {
    this.setState({
      modalEdit: state,
    })
  }

  showModalEdit = () => {
    this.dispatchModalEdit(true)
  }

  hideModalEdit = () => {
    this.dispatchModalEdit(false)
    this.setState({
      errors: {
        nameError: '',
        emailError: '',
      },
    })
  }

  // * add user
  // handle form add
  hanldeFormAddSubmit = (e) => {
    e.preventDefault()

    const name = e.target.querySelector('[name="name"]').value
    const email = e.target.querySelector('[name="email"]').value
    const select = e.target.querySelector('select')
    const error = {}

    if ((typeof name === 'string') & (name.trim() === '')) {
      error.nameError = 'Vui lòng nhập tên'
    }
    if ((typeof email === 'string') & (email.trim() === '')) {
      error.emailError = 'Vui lòng nhập email'
    }

    if (Object.keys(error).length) {
      this.setState({
        errors: error,
      })
    }

    const status = Number(select.value) === 1 ? true : false
    const data = {
      name: name,
      email: email,
      status: status,
    }

    if (Object.keys(error).length === 0) {
      this.postUser(data)
      this.hideModalAdd()
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

  // * handle change edit value
  handleChangeName = (e) => {
    const data = { ...this.state.user }
    data.name = e.target.value
    this.setState({
      user: data,
    })
  }

  handleChangeEmail = (e) => {
    const data = { ...this.state.user }
    data.email = e.target.value
    this.setState({
      user: data,
    })
  }

  handleChangeStatus = (e) => {
    const data = { ...this.state.user }
    data.status = Number(e.target.value) === 1 ? true : false
    this.setState({
      user: data,
    })
  }

  // todo edit user
  // *show modal edit
  handleShowEdit = (id) => {
    this.showModalEdit()
    this.setState({
      currentId: id,
    })

    const { userList } = this.state
    const dataEdit = { ...this.state.user }
    if (userList.length) {
      userList.forEach((user) => {
        if (user.id === id) {
          dataEdit.name = user.name
          dataEdit.email = user.email
          dataEdit.status = user.status
        }
      })
    }

    this.setState({
      user: dataEdit,
    })
  }

  // *handle submit form edit
  handleFormEditUser = (e) => {
    e.preventDefault()

    const name = e.target.querySelector('[name="name"]').value
    const email = e.target.querySelector('[name="email"]').value
    const select = e.target.querySelector('select')
    const error = {}

    if ((typeof name === 'string') & (name.trim() === '')) {
      error.nameError = 'Vui lòng nhập tên'
    }
    if ((typeof email === 'string') & (email.trim() === '')) {
      error.emailError = 'Vui lòng nhập email'
    }

    if (Object.keys(error).length) {
      this.setState({
        errors: error,
      })
    }

    const data = { ...this.state.user }
    if (Object.keys(error).length === 0) {
      this.patchUser(data, this.state.currentId)
      this.hideModalEdit()
    }
  }

  // * update user
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

  render() {
    const { userList, errors, user } = this.state
    const { nameError, emailError } = errors
    const { name, email, status } = user

    return (
      <div className="container">
        <h1 className="my-5">Quản lý người dùng</h1>

        <button
          onClick={this.showModalAdd}
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
              userList.map(({ id, name, email, status }) => {
                return (
                  <tr key={id}>
                    <th scope="row">{id}</th>
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
                        className="edit btn btn-warning"
                      >
                        Sửa
                      </a>
                    </td>
                    <td>
                      <a href="#" className="remove btn btn-danger">
                        Xóa
                      </a>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>

        <button type="button" className="btn btn-danger">
          Xóa đã trọn (0)
        </button>

        <Modal show={this.state.modalAdd} onHide={this.hideModalAdd}>
          <Modal.Header closeButton>
            <Modal.Title>Thêm công việc mới</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.hanldeFormAddSubmit} id="addUser">
              <div className="mb-3">
                <label htmlFor="">Tên</label>
                <input
                  type="text"
                  className={
                    nameError ? 'form-control is-invalid' : 'form-control'
                  }
                  placeholder="Tên..."
                  name="name"
                />
                <div className="invalid-feedback">{nameError}</div>
              </div>

              <div className="mb-3">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  className={
                    emailError ? 'form-control is-invalid' : 'form-control'
                  }
                  placeholder="Email..."
                  name="email"
                />
                <div className="invalid-feedback">{emailError}</div>
              </div>

              <div className="mb-3">
                <soan>Trạng thái</soan>
                <select className="form-select">
                  <option value="1">Kích hoạt</option>
                  <option value="0">Chưa kích hoạt</option>
                </select>
              </div>

              <button type="submit" className="btn btn-success">
                Lưu
              </button>
            </form>
          </Modal.Body>
        </Modal>

        <Modal show={this.state.modalEdit} onHide={this.hideModalEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Sửa công việc</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id="editUser" onSubmit={this.handleFormEditUser}>
              <div className="mb-3">
                <label htmlFor="">Tên</label>
                <input
                  className={
                    nameError ? 'form-control is-invalid' : 'form-control'
                  }
                  type="text"
                  placeholder="Tên..."
                  name="name"
                  value={name}
                  onChange={this.handleChangeName}
                />
                <div className="invalid-feedback">{nameError}</div>
              </div>

              <div className="mb-3">
                <label htmlFor="">Email</label>
                <input
                  className={
                    emailError ? 'form-control is-invalid' : 'form-control'
                  }
                  type="email"
                  placeholder="Email..."
                  name="email"
                  value={email}
                  onChange={this.handleChangeEmail}
                />
                <div className="invalid-feedback">{emailError}</div>
              </div>

              <div className="mb-3">
                <soan>Trạng thái</soan>
                <select
                  className="form-select"
                  onChange={this.handleChangeStatus}
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
