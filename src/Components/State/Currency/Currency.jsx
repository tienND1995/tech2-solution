import React, { Component } from 'react'
import UsdVnd from './UsdVnd'
import VndUsd from './VndUsd'

export class Currency extends Component {
  constructor(props) {
    super()
    this.state = {
      usd: 1,
      vnd: 24,
    }
  }

  handleUsdVnd = (value) => {
    const usd = value
    const vnd = usd * 24
    this.setState({
      usd: usd,
      vnd: vnd,
    })
  }

  handleVndUsd = (value) => {
    const vnd = value
    const usd = (vnd / 24).toFixed(2)
    this.setState({
      usd: usd,
      vnd: vnd,
    })
  }

  render() {
    const { usd, vnd } = this.state
    return (
      <div className="container">
        <UsdVnd onUsd={this.handleUsdVnd} usd={usd} />
        <VndUsd onVnd={this.handleVndUsd} vnd={vnd} />
      </div>
    )
  }
}

export default Currency
