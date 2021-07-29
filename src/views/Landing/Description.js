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
    </>
  )
}

export default Description
