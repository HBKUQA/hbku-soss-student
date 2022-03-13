import React from 'react'
import axios from 'axios'
import { BASE_URL } from '../../params'
import { useQuery } from 'react-query'

function Attachements({ id }) {
  const {
    data = [],
    isLoading,
    isFetching,
  } = useQuery(`get-chapter-${id}-attachements`, () =>
    axios.get(`/api/program/${id}/attachments`).then(res => res.data)
  )

  if (isLoading || isFetching) {
    return (
      <div className='text-center'>
        <i className='fas fa-spinner fa-spin'></i>
      </div>
    )
  }
  if ((data || []).length !== 0) {
    return (
      <>
        <h2>Attachments</h2>
        <ul>
          {(data || []).map((e, k) => (
            <li key={k} className='py-1'>
              <a href={BASE_URL + e.field_attachment} target='_blank' rel='noreferrer'>
                <i className='fas fa-download me-2'></i>
                {e.title}
              </a>
            </li>
          ))}
        </ul>
      </>
    )
  }
  return null
}

export default Attachements
