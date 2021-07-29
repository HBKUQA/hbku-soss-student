import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProgramTopBar from './ProgramTopBar'
import Orientation from './Orientation'
import Description from './Description'
import axios from 'axios'
import { BASE_URL } from '../../params'

import { professorData, cardsRelated } from './data'
import Cards from './Cards'
import Professor from './Professor'
import { useState } from 'react'
import { useEffect } from 'react'

const outcomes = 'Outcomes'

const getCards = (attachements, loadingAttachements) => {
  if (loadingAttachements) {
    return [
      {
        title: 'Attachments',
        items: [
          {
            type: 'text',
            icon: 'fas fa-spinner fa-spin my-3',
            parentClass: 'text-center',
            text: '',
          },
        ],
      },
    ]
  }

  if (attachements.length === 0) {
    return [
      {
        title: 'Attachments',
        items: [{ type: 'text', parentClass: 'text-start', icon: '', text: 'No attachements' }],
      },
    ]
  }

  return [
    {
      title: 'Attachments',
      items: attachements.map(e => ({
        parentClass: 'text-start',
        type: 'text',
        icon: 'fas fa-download',
        text: (
          <a target='_blank' rel='noreferrer' href={`${BASE_URL}${e.field_attachment}`}>
            {e.title}
          </a>
        ),
      })),
    },
  ]
}

function ProgramIntro(props) {
  const id = props?.match?.params?.id

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [attachements, setAttachements] = useState([])
  const [loadingAttachements, setLoadingAttachements] = useState(true)
  const [items, setItems] = useState([])

  let url = `/api/program/${id}`
  if (props.isLandingPage) url = '/api/home'

  useEffect(() => {
    setLoading(true)
    setData({})
    setAttachements([])
    setError(false)
    setLoadingAttachements(true)
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
    axios
      .get(`/api/program/${id}/attachments`)
      .then(res => {
        setAttachements(res.data)
        setLoadingAttachements(false)
      })
      .catch(() => {
        setAttachements([])
        setLoadingAttachements(false)
      })

    axios
      .get(`/api/program/${id}/chapters`)
      .then(res =>
        setItems(
          res.data.map(e => ({
            id: e.nid,
            link: `/program/${id}/${e.nid}`,
            title: e.title,
            time: parseInt(e?.field_video_duration),
          }))
        )
      )
      .catch(() => null)
  }, [url, id])
  let firstChapter = items[0]?.id

  if (loading) return <></>
  if (error) return <></>

  const cards = getCards(attachements, loadingAttachements)

  const outcomesList = data?.field_outcomes?.split?.('$$$') ?? []
  const programTopData = {
    video: { label: 'Introduction', url: BASE_URL + data?.field_introduction, poster: '' },
    title: data?.title,
    text: data?.field_highlight,
    primaryAction: {
      text: 'Start this chapter now',
      link: `/program/${id}/${firstChapter}`,
    },
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

            <Orientation title='Chapter sections' items={items} />

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
