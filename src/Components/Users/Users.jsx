import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Users.scss'
import Modal from 'react-bootstrap/Modal'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import config from '../../Config.json'
const { SERVER_API } = config

const Swal = require('sweetalert2')

// !_____________________________

export class Users extends Component {
  constructor() {
    super()
    this.state = {
      userList: [],
      errors: {},
      user: {
        name: '',
        email: '',
        status: false,
      },

      modal: false,
      event: null,
      currentId: null,

      filters: {},
      pagination: {},
      listId: [],
    }
  }

  componentDidMount() {
    this.getUser()
    // this.getUser()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.event !== this.state.event) {
      const { filters, pagination } = this.state
      const { page, limit } = pagination

      this.getUser(filters, limit, page)
      this.setState({
        event: '',
      })
    }
  }

  // render list user
  getUser = async (filters = {}, limit = 3, page = 2) => {
    const { pagination } = this.state
    pagination.limit = limit
    pagination.page = page

    let params = `?_limit=${limit}&_page=${page}`
    let url = `${SERVER_API}/users`
    if (Object.keys(filters).length) {
      params += '&' + new URLSearchParams(filters).toString()
    }

    const res = await fetch(url + params)
    const users = await res.json()

    if (res.ok) {
      const totalCount = res.headers.get('x-total-count')
      const maxPage = Math.ceil(totalCount / limit)
      pagination.maxPage = maxPage

      this.setState({
        userList: users,
        pagination: pagination,
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
      this.dispatchName('remove')
    }
  }

  // * handle click pagination
  handlePagination = (currentPage, classBtn) => {
    const { filters, pagination } = this.state
    const { limit } = pagination

    classBtn.includes('number') && this.getUser(filters, limit, currentPage)
    classBtn.includes('prev') && this.getUser(filters, limit, currentPage - 1)
    classBtn.includes('next') && this.getUser(filters, limit, currentPage + 1)
  }

  // handle checked
  handleChangeChecked = (status, id) => {
    const { listId } = this.state
    if (status) {
      listId.push(id)
    } else {
      listId.forEach((number, index) => {
        number === id && listId.splice(index, 1)
      })
    }

    this.setState({
      listId: listId,
    })

    const btnRemoveAll = document.querySelector('.remove-all')
    listId.length === 0
      ? (btnRemoveAll.disabled = true)
      : (btnRemoveAll.disabled = false)
  }

  handleRemoveAll = () => {
    const { listId } = this.state
    console.log(listId)
  }

  // * handle remove
  handleRemove = (id) => {
    Swal.fire({
      title: 'Em suy nghĩ kỹ chưa?',
      text: 'Mình yêu nhau 10 năm rồi đó!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok, Chia tay đi!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeUser(id)
        Swal.fire('Hải!', 'quay xe.', 'success')
      } else {
        Swal.fire('Gì thế?', 'Anh còn nợ em 5tr chưa trả.', 'error')
      }
    })
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

  showModal = () => {
    this.dispatchModal(true)
  }

  hideModal = () => {
    this.dispatchModal(false)
    this.resetform()
  }

  resetform = () => {
    this.setState({
      errors: {
        name: '',
        email: '',
      },

      user: {
        name: '',
        email: '',
        status: false,
      },

      currentId: null,
    })
  }

  // * handle form filter
  handleFormFilter = (e) => {
    e.preventDefault()
    const { filters, pagination } = this.state
    const { page, limit } = pagination

    this.getUser(filters, limit, page)
  }

  handleChangeFilter = (e) => {
    const filters = { ...this.state.filters }

    if (e.target.name === 'status') {
      if (e.target.value === 'active' || e.target.value === 'inactive') {
        filters.status = e.target.value === 'active' ? true : false
      } else {
        delete filters.status
      }
    }

    if (e.target.name === 'keyword') {
      filters.q = e.target.value
    }

    this.setState({
      filters: filters,
    })
  }

  // * handle change value
  handleChange = (e) => {
    const data = { ...this.state.user }
    const name = e.target.name
    const value = e.target.value
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

      this.hideModal()
    }
  }

  // *show modal edit
  handleShowEdit = (id) => {
    this.showModal()
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
    const { userList, errors, user, currentId, modal, listId, pagination } =
      this.state
    const { page, maxPage } = pagination
    const { name, email, status } = user

    return (
      <div className="container">
        <h1 className="my-5">Quản lý người dùng</h1>

        <button
          onClick={this.showModal}
          type="button"
          className="mb-3 btn btn-primary"
        >
          Thêm mới
        </button>

        <form className="mb-3" id="filter" onSubmit={this.handleFormFilter}>
          <div className="row">
            <div className="col-3">
              <select
                className="form-select"
                name="status"
                onChange={this.handleChangeFilter}
              >
                <option value={'all'}>Tất cả trạng thái</option>
                <option value={'active'}>Kích hoạt</option>
                <option value={'inactive'}>Chưa kích hoạt</option>
              </select>
            </div>
            <div className="col-7">
              <input
                type="search"
                className="form-control"
                placeholder="Nhập tên, email..."
                name="keyword"
                onChange={this.handleChangeFilter}
              />
            </div>
            <div className="col-2 d-grid">
              <button type="submit" className="btn btn-primary">
                Tìm kiếm
              </button>
            </div>
          </div>
        </form>

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
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          this.handleChangeChecked(e.target.checked, id)
                        }}
                      />
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
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          this.handleShowEdit(id)
                        }}
                        className="btn btn-warning"
                      >
                        Sửa
                      </a>
                    </td>
                    <td>
                      <a
                        href="#"
                        className="btn btn-danger"
                        onClick={(e) => {
                          e.preventDefault()
                          this.handleRemove(id)
                        }}
                      >
                        Xóa
                      </a>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>

        <div className="d-flex justify-content-between mb-3">
          <button
            type="button"
            className="btn btn-danger remove-all"
            onClick={this.handleRemoveAll}
            disabled={true}
          >
            Xóa đã trọn {listId.length}
          </button>

          <div id="pagination">
            <ul className="pagination">
              {page > 1 ? (
                <li className="page-item">
                  <a
                    className="page-link prev"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      const currentPage = e.target.innerText
                      const classBtn = e.target.className
                      this.handlePagination(currentPage, classBtn)
                    }}
                  >
                    Previous
                  </a>
                </li>
              ) : (
                ''
              )}

              {maxPage > 0 &&
                Array(maxPage)
                  .fill(1)
                  .map((number, index) => {
                    return (
                      <li className="page-item" key={index}>
                        <a
                          className={
                            page === index + 1
                              ? 'page-link active number'
                              : 'page-link number'
                          }
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            const currentPage = Number(e.target.innerText)
                            const classBtn = e.target.className
                            this.handlePagination(currentPage, classBtn)
                          }}
                        >
                          {index + 1}
                        </a>
                      </li>
                    )
                  })}

              {page < maxPage ? (
                <li className="page-item">
                  <a
                    className="page-link next"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      const currentPage = e.target.innerText
                      const classBtn = e.target.className
                      this.handlePagination(currentPage, classBtn)
                    }}
                  >
                    Next
                  </a>
                </li>
              ) : (
                ''
              )}
            </ul>
          </div>
        </div>

        <Modal show={modal} onHide={this.hideModal}>
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
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
                />
                <div className="invalid-feedback">{errors.email}</div>
              </div>

              <div className="mb-3">
                <span>Trạng thái</span>
                <select
                  className="form-select"
                  onChange={this.handleChange}
                  name="status"
                  value={status ? '1' : '0'}
                >
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

        <ToastContainer />
      </div>
    )
  }
}

export default Users
