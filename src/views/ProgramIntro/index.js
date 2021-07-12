import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProgramTopBar from './ProgramTopBar'
import Orientation from './Orientation'
import Description from './Description'

import {
  professorData,
  orientation,
  cards,
  outcomes,
  programTopData,
  description,
  requirements,
} from './data'
import Cards from './Cards'
import Professor from './Professor'

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
