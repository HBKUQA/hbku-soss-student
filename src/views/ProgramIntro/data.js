import poster from '../../assets/images/video-poster.png'
import avatar from '../../assets/images/professor-avatar.png'
import videoUrl from '../../assets/videos/welcome.mp4'
export const professorData = {
  avatar,
  name: 'noha k. Salim',
  phone: '+97450696765',
  disponibilityDays: 'Monday Tuesday Wednesday Saturday Sunday',
  disponibilityTime: '8:00 am - 3:30 pm',
  email: 'sasupport@hbku.edu.qa',
  description:
    'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque ultricies justo sed feugiat tempus. Integer venenatis in justo nec iaculis. Vivamus eget vehicula ante. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi tempus consectetur enim, at rhoncus nunc convallis viverra. Aenean aliquam lobortis aliquet. Ut malesuada ut dui ac facilisis. Vivamus mattis est justo, eget pharetra nunc accumsan non. Praesent vitae augue pretium, dignissim dui nec, fermentum est. Donec semper neque at justo mattis ultricies. Duis eu eleifend lorem. Suspendisse condimentum ex quis mauris interdum varius. Donec ultricies libero at condimentum consequat.',
}

export const cards = [
  {
    title: 'Includes',
    items: [
      { type: 'text', icon: 'fas fa-plus', text: 'Lorem ipsum dolor sit amet.' },
      { type: 'text', icon: 'fas fa-plus', text: 'Lorem ipsum dolor sit amet.' },
      { type: 'text', icon: 'fas fa-plus', text: 'Lorem ipsum dolor sit amet.' },
      { type: 'text', icon: 'fas fa-plus', text: 'Lorem ipsum dolor sit amet.' },
    ],
  },
  {
    title: 'More info',
    items: [
      { type: 'text', icon: 'fas fa-plus', text: 'Lorem ipsum dolor sit amet.' },
      { type: 'text', icon: 'fas fa-plus', text: 'Lorem ipsum dolor sit amet.' },
      { type: 'text', icon: 'fas fa-plus', text: 'Lorem ipsum dolor sit amet.' },
      { type: 'text', icon: 'fas fa-plus', text: 'Lorem ipsum dolor sit amet.' },
    ],
  },
]

export const cardsRelated = [
  {
    title: 'Related',
    items: [
      {
        type: 'article',
        thumbnail: poster,
        text: 'Lorem ipsum dolor sit amet.',
        title: 'Lorem ipsum',
      },
      {
        type: 'article',
        thumbnail: poster,
        text: 'Lorem ipsum dolor sit amet.',
        title: 'Lorem ipsum',
      },
      {
        type: 'article',
        thumbnail: poster,
        text: 'Lorem ipsum dolor sit amet.',
        title: 'Lorem ipsum',
      },
      {
        type: 'article',
        thumbnail: poster,
        text: 'Lorem ipsum dolor sit amet.',
        title: 'Lorem ipsum',
      },
    ],
  },
]
export const requirements =
  'You only need to use the latest version of your web browser to avoid any technical issue. A notebook and pen, please ! Or Download the videos for traveling !'
export const description =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tristique, ante vel finibus molestie, ante augue scelerisque lectus, nec tempor risus ligula non augue. In diam nulla, iaculis ut commodo nec, congue at purus. Sed sagittis pharetra nisi semper volutpat.'
export const outcomes = {
  title: 'Virtual orientation outcomes',
  items: [
    'You will be able to identify the areas related to your role as HBKU student.',
    'You will understand further the university environment.',
    'You will be able to identify the facilities and services offered by each HBKU entity.',
    'You will be capable to understand how to upgrade your skills.',
    'You will be familiar the student policy concepts.',
    'You will be able to identify the university leadership and core values.',
    'You will understand how to engage at student’s life.',
  ],
}
export const programTopData = {
  video: { label: 'Introduction', url: videoUrl, poster },
  title: 'Virtual Student Orientation',
  text: 'The virtual Student Orientation will help you to become familiar with the university and its resources, and each student can complete the orientation at their own pace.',
  primaryAction: { text: 'Start the orientation now', link: '/program/1/1' },
  secondaryAction: { text: 'Orientation website', link: '/program/1' },
}

export const orientation = {
  title: 'Orientation program',
  items: [
    { link: '/program/1/1', title: 'Welcome Note by HBKU Leadership', time: 675 },
    { link: '/program/1/2', title: 'What you should known about HBKU', time: 1211 },
    { link: '/program/1/3', title: 'The Student Services at HBKU', time: 1211 },
    { link: '/program/1/4', title: 'How to engage in student life ?', time: 1211 },
    { link: '/program/1/5', title: 'Research activities at HBKU', time: 1211 },
    { link: '/program/1/6', title: 'Next steps', time: 1211 },
  ],
}
