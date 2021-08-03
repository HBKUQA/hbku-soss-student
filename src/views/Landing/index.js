import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProgramTopBar from './ProgramTopBar'
import Description from './Description'
import axios from 'axios'
import { BASE_URL } from '../../params'
import { Link } from 'react-router-dom'
import { professorData } from './data'
import Professor from './Professor'
import { useState } from 'react'
import { useEffect } from 'react'

const outcomes = 'Hayakom at HBKU!'

function CoursInfo(props) {
  return (
    <div className='container'>
      <div className='cours-info-container'>
        <div className='cours-info'>
          <div className='video-container'>
            <video controls poster={props.video.poster} autoPlay>
              <source src={props.video.url}></source>
            </video>
          </div>
          <div className='cours-info-description'>
            <h3>{props.video.label}</h3>
            <div className='actions'>
              <Link to={props.primaryAction.link} className='btn btn-primary hover-outline'>
                {props.primaryAction.text}
              </Link>
            </div>
            {props.includes.map((e, k) => (
              <div className='description-list' key={k}>
                <i className={e.icon + ' me-2'}></i>
                <span>{e.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const formatTime = total => {
  const format = i => i.toString().padStart(2, '0')
  const s = total % 60
  total = parseInt((total - s) / 60)
  const m = total % 60
  total = parseInt((total - m) / 60)
  return `${format(total)}:${format(m)}:${format(s)} hours`
}

function Landing() {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [items, setItems] = useState([])
  const [programs, setPrograms] = useState(0)

  let url = '/api/home'
  const nid = data?.nid
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

    axios
      .get('/api/programs')
      .then(res => {
        setPrograms(res.data.length)
      })
      .catch(() => null)
  }, [url])

  useEffect(() => {
    if (nid)
      axios
        .get(`/api/program/${nid}/chapters`)
        .then(res =>
          setItems(
            res.data.map(e => ({
              link: `/program/${nid}/${e.nid}`,
              title: e.title,
              time: parseInt(e?.field_video_duration),
            }))
          )
        )
        .catch(() => null)
  }, [nid])

  if (loading) return <></>
  if (error) return <></>

  const outcomesList = data?.field_outcomes?.split?.('$$$') ?? []
  const programTopData = {
    video: {
      label: '',
      url: BASE_URL + data?.field_introduction,
      poster: BASE_URL + data?.field_thumbnail,
    },
    title: data?.title,
    text: data?.field_highlight,
    primaryAction: {
      text: 'Start your orientation',
      link: `/programs`,
    },
    secondaryAction: { text: 'Orientation website', link: `/program/${data?.nid}` },
    includes: [
      {
        icon: 'fas fa-stopwatch',
        text: `${formatTime(items.map(e => e.time).reduce((a, b) => a + b, 0))} of videos`,
      },
      { icon: 'fas fa-chart-pie', text: `${programs} chapters` },
      { icon: 'fas fa-mobile-alt', text: 'Access on desktop & mobile' },
      { icon: 'fas fa-info-circle', text: 'Limited access during the orientation period' },
    ],
  }
  return (
    <main className='landing-page'>
      <Header />
      <ProgramTopBar title={programTopData.title} text={programTopData.text} />
      <CoursInfo {...programTopData} />
      <div className='container my-5 landing-container'>
        <div className='main-frame'>
          <h2>{outcomes}</h2>
          <Description description={data?.field_description} list={outcomesList} />
          <Description
            title='Orientation program'
            description={data?.field_requirements}
            list={outcomesList}
          />
          <Professor {...professorData} />
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default Landing
