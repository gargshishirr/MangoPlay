import React from 'react'

const CreateRoom = ({onClick}) => {
  return (
    <button className="create-room-btn" onClick={onClick}>
      Create Room
    </button>
  )
}

export default CreateRoom;