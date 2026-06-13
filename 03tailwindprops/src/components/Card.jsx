import React from 'react'


function Card({username}) { //function Card(props)
    console.log(username)  //console.log(props)
    return (
        <div className="w-60 rounded-xl m-4 overflow-hidden">
  <img
    src="https://media1.giphy.com/media/z8n8dWgQ0mgEIyzlmV/giphy.gif"
    alt="Giphy"
    className="w-full"
  />

  <div className="glass py-4 px-5">
    <h1 className="font-bold font-mono text-xl">
      {username}
    </h1>
  </div>
</div>
    )
}


export default Card
