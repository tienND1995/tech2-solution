import React, { Component } from 'react'

export class Counter extends Component {
  constructor() {
    super()
    this.state = {
      count: 0,
      msg: '',
    }

    console.log('constructor')
  }

  handleText = () => {
    this.setState({
      msg: 'Tech2 Solution',
    })

    console.log('handle text')
  }

  handleIncreaseCount = () => {
    this.setState({
      count: this.state.count + 1,
    })
  }

  handleDecreaseCount = () => {
    this.setState({
      count: this.state.count - 1,
    })
  }

  render() {
    console.log('render')
    const { count, msg } = this.state
    return (
      <div>
        <h1>Count: {count}</h1>
        <h2>{msg}</h2>
        <button onClick={this.handleDecreaseCount}>-</button>
        <button onClick={this.handleIncreaseCount}>+</button>

        <button onClick={this.handleText}>Thay đổi text</button>
      </div>
    )
  }
}

export default Counter
