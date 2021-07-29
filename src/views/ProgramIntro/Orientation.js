import { Link } from 'react-router-dom'

function Orientation({ title, items }) {
  const FormatTime = ({ total }) => {
    const format = i => i.toString().padStart(2, '0')
    const s = total % 60
    total = parseInt((total - s) / 60)
    const m = total % 60
    total = parseInt((total - m) / 60)
    return `${format(total)}:${format(m)}:${format(s)} Hours`
  }

  return (
    <div className='orientation'>
      <div className='header'>
        <h2>{title}</h2>
        <div>
          <span>
            <i className='fas me-2 fa-stopwatch'></i>
            <FormatTime total={items.map(e => e.time).reduce((a, b) => a + b, 0)} /> of videos
          </span>
          <span>
            <i className='fas mx-2 fa-chart-pie'></i> {items.length} lessons
          </span>
        </div>
      </div>
      {items.map((e, k) => (
        <div key={k} className='lesson'>
          <Link to={e.link} className='title'>
            {e.title}
          </Link>
          <span className='time'>
            <FormatTime total={e.time} />
          </span>
        </div>
      ))}
    </div>
  )
}

export default Orientation
