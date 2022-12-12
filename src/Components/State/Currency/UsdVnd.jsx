import React, { Component } from 'react'

export class UsdVnd extends Component {
  constructor(props) {
    super()
  }

  handleChange = (e) => {
    const usd = e.target.value
    const { onUsd } = this.props
    onUsd(usd)
  }

  render() {
    const { usd } = this.props
    return (
      <div className="usd-vnd mt-5 input-group w-25">
        <label htmlFor="">USD</label>
        <input
          onChange={this.handleChange}
          className="form-control"
          type="number"
          placeholder="usd"
          value={usd}
        />
      </div>
    )
  }
}

export default UsdVnd
