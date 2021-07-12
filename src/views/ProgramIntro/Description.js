import {useState} from "react"

function Description(props) {
  const [show, setShow] = useState(false)
  const limitList = list => {
    return show ? list : list.slice(0, 4)
  }
  return (
    <>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <ul className='checks is-grid has-2 gap-y-0'>
        {limitList(props.list).map((e, k) => (
          <li key={k}>{e}</li>
        ))}
      </ul>
      <div className='mt-3 text-center'>
        <button onClick={() => setShow(!show)} className='read-more'>
          {show ? 'Hide' : 'Read more'}
        </button>
      </div>
    </>
  )
}

export default Description
