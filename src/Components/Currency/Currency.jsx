import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Currency.css'

export class Currency extends Component {
  constructor() {
    super()
    this.state = {
      value: {
        usd: 1,
        vnd: 24,
      },
      name: {
        nameUsd: 'usd',
        nameVnd: 'vnd',
      },
    }
  }

  handleOnChange = (e) => {
    const data = { ...this.state.value }

    if (e.target.name === 'usd') {
      data[e.target.name] = e.target.value
      data.vnd = e.target.value * 24
    } else {
      data[e.target.name] = e.target.value
      data.usd = e.target.value / 24
    }

    this.setState({ value: data })
  }

  // handleClick = () => {
  //   const inputElement = document.querySelectorAll('.form-control')
  //   const dataName = { ...this.state.name }
  //   const dataValue = { ...this.state.value }

  //   if (inputElement[0].name === 'vnd') {
  //     dataValue.usd = 1
  //     dataValue.vnd = 24

  //     console.log(dataValue)
  //   }
  //   if (inputElement[0].name === 'usd') {
  //     dataValue.vnd = 1
  //     dataValue.usd = 1 / 24

  //     console.log(dataValue)
  //   }

  //   // update name
  //   for (let index = 0; index < inputElement.length; index++) {
  //     const element = inputElement[index]

  //     if (element.name === 'usd') {
  //       dataName.nameUsd = 'vnd'
  //       dataName.nameVnd = 'usd'

  //       break
  //     } else {
  //       dataName.nameUsd = 'usd'
  //       dataName.nameVnd = 'vnd'

  //       break
  //     }
  //   }

  //   this.setState({
  //     name: dataName,
  //   })

  //   this.setState({
  //     value: dataValue,
  //   })
  // }


  render() {
    const { value, name } = this.state
    const { vnd, usd } = value
    const { nameUsd, nameVnd } = name

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form className="mt-5">
              <div className="row">
                <h2 className="mb-5 text-danger">Chuyển đổi tiền tệ</h2>
                <div className="col-xs-12 col-sm-12 col-md-5 text-center">
                  <div
                    className="form-group"
                    id="from_coin"
                    style={{ marginBottom: 20 }}
                  >
                    <div className="input-group">
                      <div className="input-group-addon">
                        <a href="#" title={nameUsd} className="currency-icon">
                          <span className={`cur-icon ${nameUsd}`} />
                          <span> {nameUsd} </span>
                        </a>
                      </div>
                      <input
                        type="text"
                        className="form-control input-coin input-lg text-right"
                        name={nameUsd}
                        onChange={this.handleOnChange}
                        value={usd}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-2 text-center">
                  <button
                    type="button"
                    id="swap_button"
                    className="btn btn-lg btn-primary"
                  >
                    <strong>⇄</strong>
                  </button>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-5 text-center">
                  <div
                    className="form-group"
                    id="to_coin"
                    style={{ marginBottom: 20 }}
                  >
                    <div className="input-group">
                      <div className="input-group-addon">
                        <a href="#" title={nameVnd} className="currency-icon">
                          <span className={`cur-icon ${nameVnd}`} />
                          <span> {nameVnd} </span>
                        </a>
                      </div>
                      <input
                        type="text"
                        className="form-control input-coin input-lg text-right"
                        name={nameVnd}
                        onChange={this.handleOnChange}
                        value={vnd}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="convert_text"
                style={{
                  color: '#002272',
                  fontWeight: 600,
                  fontSize: 22,
                  wordBreak: 'break-all',
                }}
                className="text-center"
              >
                {usd} {nameUsd} = <span style={{ color: '#f00' }}>{vnd}</span>{' '}
                {nameVnd}
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Currency
