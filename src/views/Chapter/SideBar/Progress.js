function Progress({ percent }) {
  return (
    <div className='py-3'>
      <div className='progress'>
        <div className='progress-bar' style={{ width: `${percent}%` }}></div>
        <span className='progress-label'>{percent.toFixed(0)}%</span>
      </div>
    </div>
  )
}

export default Progress
