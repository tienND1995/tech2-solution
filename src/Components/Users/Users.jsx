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
      paginate: {
        maxPage: null,
        currenPage: 1,
      },
      listId: [],
    }

    this.perPage = 3
  }

  componentDidMount() {
    const { currenPage } = this.state.paginate
    const { filters } = this.state
    this.getUser(filters, this.perPage, currenPage)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.event !== this.state.event) {
      const { currenPage } = this.state.paginate
      const { filters } = this.state

      this.getUser(filters, this.perPage, currenPage)
      this.setState({
        event: null,
      })
    }
  }

  // render list user
  getUser = async (filters = {}, limit = 3, page = 1) => {
    let url = `${SERVER_API}/users?_limit=${limit}&_page=${page}`
    if (Object.keys(filters).length) {
      url =
        `${SERVER_API}/users?_limit=${limit}&_page=${page}&` +
        new URLSearchParams(filters).toString()
    }

    const res = await fetch(url)
    const users = await res.json()

    if (res.ok) {
      const totalCount = res.headers.get('x-total-count')
      const maxPage = Math.ceil(totalCount / limit)
      const paginate = this.state.paginate
      paginate.maxPage = maxPage

      this.setState({
        userList: users,
        paginate: paginate,
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
      toast.success('???? Th??m th??nh c??ng!')
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
      toast.success('???? C???p nh???t th??nh c??ng!')
      this.dispatchName('update')
    }
  }

  // remove user
  removeUser = async (id) => {
    const res = await fetch(`${SERVER_API}/users/${id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      const paginate = this.state.paginate
      paginate.currenPage = 1

      this.setState({
        paginate: paginate,
      })

      this.dispatchName('remove')
    }
  }

  // * render paginate
  renderPaginate = () => {
    const { paginate } = { ...this.state }
    const { currenPage, maxPage } = paginate

    const goPaginate = (page, classBtn) => {
      classBtn.includes('number') && (paginate.currenPage = page)
      classBtn.includes('prev') && (paginate.currenPage = page - 1)
      classBtn.includes('next') && (paginate.currenPage = page + 1)

      this.setState({
        paginate: paginate,
      })

      this.dispatchName('go paginate')
    }

    const paginateItems = []
    for (let page = 1; page <= maxPage; page++) {
      paginateItems.push(
        <li className="page-item" key={page}>
          <a
            className={`page-link number ${
              page === currenPage ? 'active' : ''
            } `}
            href="#"
            onClick={(e) => {
              e.preventDefault()
              const classBtn = e.target.className
              goPaginate(page, classBtn)
            }}
          >
            {page}
          </a>
        </li>
      )
    }

    return (
      <ul className="pagination">
        <li className="page-item">
          <a
            className={`page-link prev ${currenPage <= 1 ? 'disabled' : ''}`}
            href="#"
            onClick={(e) => {
              e.preventDefault()
              const classBtn = e.target.className
              goPaginate(currenPage, classBtn)
            }}
          >
            Previous
          </a>
        </li>

        {paginateItems}

        <li className="page-item">
          <a
            className={`page-link next ${
              currenPage < maxPage ? '' : 'disabled'
            }`}
            href="#"
            onClick={(e) => {
              e.preventDefault()
              const classBtn = e.target.className
              goPaginate(currenPage, classBtn)
            }}
          >
            Next
          </a>
        </li>
      </ul>
    )
  }

  // handle checked

  // * handle remove
  handleRemove = (id) => {
    Swal.fire({
      title: 'Em suy ngh?? k??? ch??a?',
      text: 'M??nh y??u nhau 10 n??m r???i ????!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok, Chia tay ??i!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeUser(id)
        Swal.fire('H???i!', 'quay xe.', 'success')
      } else {
        Swal.fire('G?? th????', 'Anh c??n n??? em 5tr ch??a tr???.', 'error')
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
    const { filters, paginate } = this.state
    const { currenPage } = paginate

    this.getUser(filters, this.perPage, currenPage)
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
      errors.name = 'Vui l??ng nh???p t??n'
    }
    if ((typeof email === 'string') & (email.trim() === '')) {
      errors.email = 'Vui l??ng nh???p email'
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
    const { userList, errors, user, currentId, modal, listId, paginate } =
      this.state
    const { currenPage, maxPage } = paginate
    const { name, email, status } = user

    return (
      <div className="container">
        <h1 className="my-5">Qu???n l?? ng?????i d??ng</h1>

        <button
          onClick={this.showModal}
          type="button"
          className="mb-3 btn btn-primary"
        >
          Th??m m???i
        </button>

        <form className="mb-3" id="filter" onSubmit={this.handleFormFilter}>
          <div className="row">
            <div className="col-3">
              <select
                className="form-select"
                name="status"
                onChange={this.handleChangeFilter}
              >
                <option value={'all'}>T???t c??? tr???ng th??i</option>
                <option value={'active'}>K??ch ho???t</option>
                <option value={'inactive'}>Ch??a k??ch ho???t</option>
              </select>
            </div>
            <div className="col-7">
              <input
                type="search"
                className="form-control"
                placeholder="Nh???p t??n, email..."
                name="keyword"
                onChange={this.handleChangeFilter}
              />
            </div>
            <div className="col-2 d-grid">
              <button type="submit" className="btn btn-primary">
                T??m ki???m
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
              <th scope="col">T??n</th>
              <th scope="col">Email</th>
              <th scope="col">Tr???ng th??i</th>
              <th scope="col" width="7%">
                S???a
              </th>
              <th scope="col" width="7%">
                X??a
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
                        <span className="btn btn-success">K??ch ho???t</span>
                      ) : (
                        <span className="btn btn-primary">Ch??a k??ch ho???t</span>
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
                        S???a
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
                        X??a
                      </a>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>

        <div className="d-flex justify-content-between mb-3">
          <button type="button" className="btn btn-danger remove-all">
            X??a ???? tr???n {listId.length}
          </button>

          <div id="pagination">{this.renderPaginate()}</div>
        </div>

        <Modal show={modal} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {!currentId ? 'Th??m c??ng vi???c m???i' : 'S???a c??ng vi???c '}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.hanldeFormSubmit} id="form">
              <div className="mb-3">
                <label htmlFor="">T??n</label>
                <input
                  type="text"
                  className={
                    errors.name ? 'form-control is-invalid' : 'form-control'
                  }
                  placeholder="T??n..."
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
                <span>Tr???ng th??i</span>
                <select
                  className="form-select"
                  onChange={this.handleChange}
                  name="status"
                  value={status ? '1' : '0'}
                >
                  <option value="1">K??ch ho???t</option>
                  <option value="0">Ch??a k??ch ho???t</option>
                </select>
              </div>

              <button type="submit" className="btn btn-success">
                L??u
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
