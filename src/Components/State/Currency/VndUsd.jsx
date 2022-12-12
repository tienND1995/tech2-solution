import React, { Component } from 'react'

export class VndUsd extends Component {
  constructor(props) {
    super()
  }

  handleChange = (e) => {
    const vnd = e.target.value
    const { onVnd } = this.props
    onVnd(vnd)
  }
  render() {
    const { vnd } = this.props
    return (
      <div className="vnd-usd mt-5 input-group w-25">
        <label htmlFor="">VND</label>
        <input
          onChange={this.handleChange}
          value={vnd}
          className="form-control"
          type="number"
          placeholder="vnd"
        />
      </div>
    )
  }
}

export default VndUsd
