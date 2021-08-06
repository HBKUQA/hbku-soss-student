import hbkuUniv from '../../assets/images/hbku-bg-1.png'

function Hayakom() {
  return (
    <section>
      <div className='container'>
        <div className='hayakom'>
          <img src={hbkuUniv} alt='hayakom at hbku' />
          <div className='description'>
            <h1>
              Hayakom
              <br /> at HBKU!
            </h1>
            <p>
              This year we have designed a unique online orientation experience to help guide you
              through the upcoming months. The Virtual Student Orientation will help you become
              familiar with the university and its resources, and each student can complete the
              orientation at their own pace. Our first semester students, and our community as a
              whole, are now continuing a decade-old legacy of commitment and innovation in
              education and research, dedicated to solving critical challenges facing Qatar and the
              world.
            </p>
            <div>
              <a href='https://www.hbku.edu.qa/en'>Read more</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Hayakom
