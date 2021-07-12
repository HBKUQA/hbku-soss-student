import Header from '../../components/Header'
import ProgramTopBar from './ProgramTopBar'
import Footer from '../../components/Footer'

import { professorData, cards, outcomes, programTopData, description, requirements } from './data'
import Card from './Card'
import Professor from './Professor'

function ProgramIntro() {
  return (
    <>
      <Header />
      <ProgramTopBar {...programTopData} />
      <div className='container'>
        <div className='is-grid front-grid'>
          <div className='card-container'>
            {cards.map((e, k) => (
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
          <div>
            <h2>{outcomes.title}</h2>
            <ul className='checks'>
              {outcomes.items.map((e, k) => (
                <li key={k}>{e}</li>
              ))}
            </ul>

            <h2>Requirements</h2>
            <p>{requirements}</p>

            <h2>Description</h2>
            <p>{description}</p>
            <ul className='checks is-grid has-2 gap-y-0'>
              {outcomes.items.map((e, k) => (
                <li key={k}>{e}</li>
              ))}
            </ul>
            <Professor {...professorData} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ProgramIntro
