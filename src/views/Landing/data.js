import poster from '../../assets/images/video-poster.png'
import avatar from '../../assets/images/icon-qataris.png'
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
    items: Array.from({ length: 4 }).map(() => ({
      type: 'article',
      thumbnail: poster,
      text: 'Lorem ipsum dolor sit amet.',
      title: 'Lorem ipsum',
    })),
  },
]
