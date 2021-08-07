import hbkuBg from '../../assets/images/HEAQUARTERS.jpg'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import React from 'react'
function CarouselSpeakers({ children }) {
  const [selected, setSelected] = useState(1)

  const next = useCallback(() => {
    setSelected((selected + 1) % children.length)
  }, [children.length, selected])

  const prev = () => {
    setSelected((children.length + selected - 1) % children.length)
  }

  useEffect(() => {
    const timer = setInterval(next, 10000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className='speaker-carousel-section'>
      <div className='container'>
        <h1>Speakers</h1>
        <div className='speaker-carousel'>
          <div className='speaker-carousel-prev' onClick={prev}></div>
          {React.Children.map(children, (child, key) =>
            React.cloneElement(child, { show: selected === key })
          )}
          <div className='speaker-carousel-next' onClick={next}></div>
        </div>
      </div>
    </section>
  )
}

export function CarouselItem({ name, post, description, image, show }) {
  return (
    <div className={show ? 'speaker-carousel-item active' : 'speaker-carousel-item'}>
      <div className='speaker-carousel-item-texts'>
        <div className='speaker-carousel-item-texts-title'>{parse(name)}</div>
        <div className='speaker-carousel-item-texts-post'>{post}</div>
        <div className='speaker-carousel-item-texts-description'>{description}</div>
        <Link to='/' className='speaker-carousel-item-texts-link'>
          Read more
        </Link>
      </div>
      <div className='speaker-carousel-item-images'>
        <img src={image} alt={name} className='speaker-carousel-item-images-profil' />
        <img src={hbkuBg} alt='hbku-bg' className='speaker-carousel-item-images-bg' />
      </div>
    </div>
  )
}

export function Professors(props) {
  return (
    <div className='container'>
      <div className='speakers-container'>
        {props.data.map((e, k) => {
          return (
            <div className='speakers-card' key={k}>
              <div className='speakers-card-thumb-container'>
                <img src={e.image} alt={e.name}></img>
              </div>
              <div className='speakers-card-body'>
                <h4 className='speakers-name'>{e.name}</h4>
                <div className='speakers-post'>{e.post}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CarouselSpeakers
