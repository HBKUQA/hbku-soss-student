import parse from 'html-react-parser'

function SidebarHeader({ title = '', toogler = () => null }) {
  return (
    <div className='header'>
      <div>
        <span>{parse(title)} Chapter Content</span>
        <button className='btn btn-link close-side-bar' onClick={toogler}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            viewBox='0 0 16 16'>
            <path
              fillRule='evenodd'
              d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z'
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default SidebarHeader
