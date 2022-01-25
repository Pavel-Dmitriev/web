import React, { useEffect } from 'react'

export const MyNotes = () => {
  useEffect(() => {
    document.title = 'My Notes - Notedly'
  })
  return (
    <div>
      <p>These are my notes</p>
    </div>
  )
}
