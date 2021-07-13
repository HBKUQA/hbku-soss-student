import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProgramTopBar from './ProgramTopBar'
import Orientation from './Orientation'
import Description from './Description'
import axios from 'axios'
import { BASE_URL } from '../../params'

import { professorData, cards, cardsRelated } from './data'
import Cards from './Cards'
import Professor from './Professor'
import { useState } from 'react'
import { useEffect } from 'react'

const outcomes = 'Virtual orientation outcomes'

function ProgramIntro(props) {
  const id = props?.match?.params?.id

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  let url = `/api/program/${id}`
  if (props.isLandingPage) url = '/api/home'

  useEffect(() => {
    setLoading(true)
    setData({})
    setError(false)
    axios
      .get(url)
      .then(res => {
        setError(false)
        setLoading(false)
        setData(res.data[0])
      })
      .catch(() => {
        setLoading(false)
        setError(true)
      })
  }, [url])
  let firstChapter = data?.field_chapters ?? ''
  firstChapter = firstChapter.split(',')?.[0]

  if (loading) return <></>
  if (error) return <></>

  const outcomesList = data?.field_outcomes?.split?.('$$$') ?? []
  const programTopData = {
    video: { label: 'Introduction', url: BASE_URL + data?.field_introduction, poster: '' },
    title: data?.title,
    text: data?.field_highlight,
    primaryAction: {
      text: 'Start the orientation now',
      link: `/program/${data?.nid}/${firstChapter}`,
    },
    secondaryAction: { text: 'Orientation website', link: `/program/${data?.nid}` },
  }
  return (
    <>
      <Header />
      <ProgramTopBar {...programTopData} />
      <div className='container'>
        <div className='is-grid front-grid'>
          <Cards items={cards} />

          <div className='main-frame'>
            <h2>{outcomes}</h2>
            <ul className='checks'>
              {outcomesList.map((e, k) => (
                <li key={k}>{e}</li>
              ))}
            </ul>

            <Orientation title='Orientation program' parent={data?.nid} />

            <h2>Requirements</h2>
            <p>{data?.field_requirements}</p>
            <Description
              title='Description'
              description={data?.field_description}
              list={outcomesList}
            />

            <Professor {...professorData} />
          </div>
          <Cards isRelated items={cardsRelated} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ProgramIntro
