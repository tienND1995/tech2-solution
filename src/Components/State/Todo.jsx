import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Todo.scss'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { v4 as uuidv4 } from 'uuid'
console.log('v4', uuidv4)

export class Todo extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      todoList: [],
    }
  }

  handleChange = (e) => {
    const name = e.target.value
    this.setState({
      name: name,
    })
  }

  handleAddName = (e) => {
    e.preventDefault()

    const todo = {
      id: this.state.todoList.length + 1,
      name: this.state.name,
      isCompleted: false,
    }

    if (this.state.name.trim() !== '') {
      this.setState({
        name: '',
        todoList: this.state.todoList.concat(todo),
      })

      e.target.reset()
      toast.success('Thêm thành công !')
    } else {
      toast.error('Vui lòng nhập thông tin')
    }
  }

  handleRemoveName = (id) => {
    window.confirm('Bạn có chắc chắn muốn xóa')
    const data = [...this.state.todoList]

    data.forEach((todo, index) => {
      todo.id === id && data.splice(index, 1)
    })

    this.setState({
      todoList: data,
    })
    toast.success('Xoá thành công !')
  }

  handleChecked = (status, id) => {
    const data = [...this.state.todoList]
    data.forEach((todo) => {
      todo.id === id && (todo.isCompeleted = status)
    })

    this.setState({
      todoList: data,
    })
  }
  render() {
    const { todoList } = this.state
    const { name } = this.state

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h2 className="my-5">Danh sách công việc</h2>
            <div className="todo-list">
              {todoList.map(({ id, name, isCompeleted }) => {
                return (
                  <div
                    className={`todo-item mb-3 d-flex ${
                      isCompeleted ? 'completed' : ''
                    }`}
                    key={id}
                  >
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        this.handleChecked(e.target.checked, id)
                      }}
                    />
                    <span className="mx-3">{name}</span>
                    <span
                      onClick={() => {
                        this.handleRemoveName(id)
                      }}
                    >
                      Xóa{' '}
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="form mt-5">
              <form action="" onSubmit={this.handleAddName}>
                <div className="input-group w-50">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Tên công việc..."
                    onChange={this.handleChange}
                    name={name}
                  />
                  <button type="submit" className="btn btn-info text-danger">
                    Thêm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <ToastContainer />
      </div>
    )
  }
}

export default Todo
