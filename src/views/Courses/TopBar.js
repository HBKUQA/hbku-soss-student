import { Link } from 'react-router-dom'

function TopBar(props) {
  return (
    <div className='topbar' id='top'>
      <div className='container'>
        <ul className='bread-crumb'>
          {props.breadCrumb.map((e, k) => (
            <li key={k}>
              <Link to={e.link}>{e.text}</Link>
            </li>
          ))}
        </ul>
        <h1 className='mb-4'>{props.title}</h1>
        <span className='category'>
          <i className={props.icon}></i>
          <span className='ms-2'>{props.category}</span>
        </span>
      </div>
    </div>
  )
}
export default TopBar
