import thumbnail from '../../assets/images/course-thumbnail.png'
const description =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tristique, ante vel.'
export const programTopData = {
  title: 'My Orientation Program',
  category: 'Courses',
  icon: 'fas fa-user-graduate',
  breadCrumb: [
    { text: 'Home page', link: '/' },
    { text: 'Categorie 1', link: '/' },
    { text: 'Categorie 1.1', link: '/' },
    { text: 'Courses', link: '/' },
  ],
}
export const courses = [
  {
    thumbnail,
    acchivement: '50',
    title: 'Introduction',
    description,
    primary: '/program/1/1',
    secondary: '/program/1',
    locked: false,
  },
  {
    thumbnail,
    acchivement: '0',
    title: 'University technologies services',
    description,
    primary: '/program/1/1',
    secondary: '/program/1',
    locked: true,
  },
  {
    thumbnail,
    acchivement: '0',
    title: 'Facilities & Hawayti Card',
    description,
    primary: '/program/1/1',
    secondary: '/program/1',
    locked: true,
  },
  {
    thumbnail,
    acchivement: '0',
    title: 'Academic Advisory session',
    description,
    primary: '/program/1/1',
    secondary: '/program/1',
    locked: true,
  },
  {
    thumbnail,
    acchivement: '0',
    title: 'Engagement and Student life',
    description,
    primary: '/program/1/1',
    secondary: '/program/1',
    locked: true,
  },
]
