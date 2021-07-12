import Header from '../../components/Header'
import ProgramTopBar from './ProgramTopBar'
import Footer from '../../components/Footer'

import {
  professorData,
  orientation,
  cards,
  outcomes,
  programTopData,
  description,
  requirements,
} from './data'
import Card from './Card'
import Professor from './Professor'
import { useState } from 'react'

function Description(props) {
  const [show, setShow] = useState(false)
  const limitList = list => {
    return show ? list : list.slice(0, 4)
  }
  return (
    <>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <ul className='checks is-grid has-2 gap-y-0'>
        {limitList(props.list).map((e, k) => (
          <li key={k}>{e}</li>
        ))}
      </ul>
      <div className='mt-3 text-center'>
        <button onClick={() => setShow(!show)} className='read-more'>
          {show ? 'Hide' : 'Read more'}
        </button>
      </div>
    </>
  )
}

function Cards(props) {
  return (
    <div className='card-container'>
      {props.items.map((e, k) => (
        <div className='card' key={k}>
          <div className='card-header'>{e.title}</div>
          <div className='card-body'>
            {e.items.map((i, ki) => (
              <Card key={ki} {...i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function Orientation(props) {
  const FormatTime = ({ total }) => {
    const format = i => i.toString().padStart(2, '0')
    const s = total % 60
    total = parseInt((total - s) / 60)
    const m = total % 60
    total = parseInt((total - m) / 60)
    return `${format(total)}:${format(m)}:${format(s)} Hours`
  }

  return (
    <div className='orientation'>
      <div className='header'>
        <h2>{props.title}</h2>
        <div>
          <span>
            <i className='fas me-2 fa-stopwatch'></i>
            <FormatTime total={props.items.map(e => e.time).reduce((a, b) => a + b, 0)} /> of videos
          </span>
          <span>
            <i className='fas mx-2 fa-chart-pie'></i> {props.items.length} lessons
          </span>
        </div>
      </div>
      {props.items.map((e, k) => (
        <div key={k} className='lesson'>
          <span className='title'>{e.title}</span>
          <span className='time'>
            <FormatTime total={e.time} />
          </span>
        </div>
      ))}
    </div>
  )
}

function ProgramIntro() {
  return (
    <>
      <Header />
      <ProgramTopBar {...programTopData} />
      <div className='container'>
        <div className='is-grid front-grid'>
          <Cards items={cards} />

          <div>
            <h2>{outcomes.title}</h2>
            <ul className='checks'>
              {outcomes.items.map((e, k) => (
                <li key={k}>{e}</li>
              ))}
            </ul>
            <Orientation {...orientation} />

            <h2>Requirements</h2>
            <p>{requirements}</p>
            <Description title='Description' description={description} list={outcomes.items} />

            <Professor {...professorData} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ProgramIntro
