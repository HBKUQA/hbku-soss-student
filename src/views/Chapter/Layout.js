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
        })
      })}
      <Footer />
    </>
  )
}

export default Layout
