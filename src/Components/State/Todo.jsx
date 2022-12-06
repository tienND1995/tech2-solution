import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Todo.scss'

export class Todo extends Component {
  constructor() {
    super()
    this.state = {
      todoList: [
        { id: 1, name: 'Công việc 1', isCompeleted: false },
        { id: 2, name: 'Công việc 2', isCompeleted: false },
        { id: 3, name: 'Công việc 3', isCompeleted: true },
      ],
    }
  }
  render() {
    const { todoList } = this.state

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
                    <input type="checkbox" />
                    <span className="mx-3 name-work">{name}</span>
                    <span>Xóa</span>
                  </div>
                )
              })}
            </div>

            <div className="form mt-5">
              <form action="">
                <div className='input-group w-50'>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Tên công việc..."
                  />
                  <button type="submit" className='btn btn-info text-danger'>Thêm</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Todo
