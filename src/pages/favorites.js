import React, { useEffect } from 'react'

export const Favorites = () => {
  useEffect(() => {
    document.title = 'Favorities - Notedly'
  })
  return (
    <div>
      <p>These are my favorites</p>
    </div>
  )
}
