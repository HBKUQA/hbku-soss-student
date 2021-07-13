function Filter(props) {
  return (
    <div className='filter'>
      <div className='filter-buttons'>
        {/* <button className='btn big-text btn-outline-primary'>
          <i className='fas fa-sliders-h me-2'></i>filter
        </button>
        <button className='btn big-text btn-outline-primary'>
          Categories <i className='fas fa-caret-down ms-2'></i>
        </button>
        <button className='btn big-text btn-link'>Reset</button> */}
      </div>
      <div className='input-group bordred outline-primary'>
        <input type='search' placeholder='Search' />
        <span className='input-group-icon'>
          <i className='fas fa-search'></i>
        </span>
      </div>
    </div>
  )
}

export default Filter
