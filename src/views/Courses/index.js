import Header from '../../components/Header'
import Footer from '../../components/Footer'
import TopBar from './TopBar'
import Filter from './Filter'
import CourseList from './CourseList'
import axios from 'axios'
import {useState} from 'react'
import {useEffect} from 'react'
import {BASE_URL, LAST_PROGRAM_ID,SUPER_ADMINS} from '../../params'
import { useSelector } from "react-redux"

const programTopData = {
    title: 'Virtual Student Orientation 2021/22',
    category: '',
    icon: '',
}

function Courses() {
    document.title = programTopData.title + ' - HBKU-SOOS'
    const [courses, setCourses] = useState([])
    const [progress, setProgress] = useState({})
    const [chapters, setChapters] = useState({})
    const userID = useSelector(state => state.User?.user?.uid)

    useEffect(() => {
        axios
            .get('/api/programs')
            .then(res => {
                setCourses(
                    res.data.map(e => {
                        const chapters = e.field_chapters ?? ''
                        return {
                            id: e.nid,
                            thumbnail: BASE_URL + e.field_thumbnail,
                            primary: `/program/${e.nid}/${chapters.split(',')?.[0]}`,
                            title: e.title,
                            isRequired: e.field_is_required === 'On',
                            description: e.field_description,
                            secondary: `/program/${e.nid}`,
                            locked: e.status === '0',
                        }
                    })
                )

                localStorage.setItem(LAST_PROGRAM_ID, res.data[res.data.length - 1].nid)
            })
            .catch(() => {
            })

        axios
            .get('/api/student/progress')
            .then(res => {
                const tmp = {}
                res.data.forEach(e => {
                    tmp[parseInt(e.field_program)] = e.field_process
                })
                setProgress(tmp)
            })
            .catch(() => {
                setProgress({})
            })

        axios
            .get('/api/program/chapters')
            .then(res => {
                const tmp = {}
                res.data.forEach(e => {
                    if (tmp[e.field_program] === undefined) tmp[e.field_program] = []
                    tmp[e.field_program].push(e.nid)
                })
                setChapters(tmp)
            })
            .catch(() => null)
    }, [])

    const requiredCourses = courses.filter(e => e.isRequired)
    return (
        <>
            <Header/>
            <TopBar {...programTopData} />
            <div className='container'>
                <Filter/>

                <CourseList
                    chapters={chapters}
                    items={courses.map(e => {
                        const acchivement = isNaN(progress?.[e.id]) ? '0' : progress?.[e.id]

                        if (!e.isRequired)
                            return {
                                ...e,
                                locked: false,
                                acchivement,
                            }
                        const thisIndex = requiredCourses.findIndex(el => el.id === e.id)
                        const last = requiredCourses?.[thisIndex - 1] ?? {acchivement: '100'}
                        const lastProgress = progress?.[last.id] ?? 0

                        if(SUPER_ADMINS.includes(userID)){
                            return {
                                ...e,
                                locked: false,
                                acchivement,
                            }
                        }

                        return {
                            ...e,
                            locked: last.id !== undefined && parseInt(lastProgress) !== 100,
                            acchivement,
                        }
                    })}
                />
            </div>
            <Footer/>
        </>
    )
}

export default Courses
