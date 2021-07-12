import { Component } from 'react'
import logo from '../../assets/svg/logo_text_color.svg'
import PropTypes from 'prop-types'
class Carousel extends Component {
  state = { show: 0, timer: 5000 }
  timer = null
  componentDidMount() {
    this.timer = setInterval(this.next, this.state.timer)
  }

  next = () => {
    const items = this.props.items ?? []

    let newOne = this.state.show + 1
    if (newOne >= items.length) newOne = 0
    this.setState({ show: newOne })
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  setShow = show => this.setState({ show })

  render() {
    const items = this.props.items ?? []
    const { show } = this.state
    return (
      <div className='auth-carousel-container'>
        <img src={logo} alt='hbku-log' className='logo' />
        <div className='auth-carousel'>
          {items.map((e, k) => {
            return (
              <img
                key={k}
                src={e}
                alt=''
                className={`carousel-item${show === k ? ' active' : ''}`}
              />
            )
          })}
          <div className='carousel-indices'>
            {items.map((_, k) => (
              <i
                onClick={() => this.setShow(k)}
                key={k}
                className={`fas fa-circle${show === k ? ' active' : ''}`}></i>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

Carousel.propTypes = {
  items: PropTypes.array.isRequired,
}
export default Carousel
