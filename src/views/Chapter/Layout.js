import { Children, cloneElement, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

function Layout({ programId, chapterId, children }) {
  const [nextUrl, setNextUrl] = useState('')

  const videoRef = useRef()
  const documentRef = useRef()
  const sideBarRef = useRef()

  const updatePosition = () => {
    const sidebarDOM = sideBarRef?.current
    const videoDOM = videoRef?.current
    const status = sidebarDOM?.className === 'toogled'
    const box = videoDOM?.getClientRects()?.[0]
    const sideBarStart = box?.x + box?.width

    if (window.innerWidth > 768) {
      if (sidebarDOM) sidebarDOM.style.left = status ? `${sideBarStart}px` : '100%'
    } else {
      if (sidebarDOM) sidebarDOM.style.left = status ? `0px` : '100%'
    }
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      updatePosition()
    })
    return () => {
      window.removeEventListener('resize', updatePosition)
    }
  }, [])

  const { data: list = [] } = useQuery('get-programs-list', () =>
    axios.get('/api/programs').then(res => res.data.map(e => e.nid))
  )
  const nextProgram = list[list.indexOf(id) + 1]

  useEffect(() => {
    axios
      .get(`/api/program/${nextProgram}/chapters`)
      .then(res => {
        setNextUrl(`/program/${nextProgram}/${res.data?.[0]?.nid}`)
      })
      .catch(() => null)
  }, [nextProgram])

  return (
    <>
      <Header />
      {Children.map(children, child => {
        return cloneElement(child, {
          nextUrl,
          programId,
          chapterId,
          videoRef,
          documentRef,
          sideBarRef,
          updatePosition,
        })
      })}
      <Footer />
    </>
  )
}

export default Layout
