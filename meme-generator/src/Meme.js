import React, { useEffect, useState } from 'react'

export default function Meme() {
  const [allMemes, setAllMemes] = useState([])

  function getRandomMemeImgData() {
    if (allMemes.length === 0) {
      return { url: "", name: "" }
    }
    const randomIndex = Math.floor(Math.random() * allMemes.length)
    const { url, name } = allMemes[randomIndex]
    return { url, name }
  }

  const [meme, setMeme] = useState({ ...getRandomMemeImgData(), topText: "", bottomText: "" })

  function updateMeme() {
    setMeme(prevMeme => ({ ...prevMeme, ...getRandomMemeImgData() }))
  }

  function handleChange(e) {
    setMeme(prevMeme => ({ ...prevMeme, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    (async () => {
      const res = await fetch('https://api.imgflip.com/get_memes')
      const memes = await res.json()
      setAllMemes(memes.data.memes)
    })()
  }, [])

  return (
    <main>
      <input
        name='topText'
        className='input-top'
        placeholder='Shut up'
        onChange={handleChange}
        value={meme.topText}
      />
      <input
        name='bottomText'
        className='input-botom'
        placeholder='and take my money'
        onChange={handleChange}
        value={meme.bottomText}
      />
      <button className='purple-gradient' onClick={updateMeme}>Get a new meme image</button>
      <div className='meme'>
        <img className='meme-img' src={meme.url} alt={meme.name} />
        <h3 className='meme-text top'>{meme.topText}</h3>
        <h3 className='meme-text bottom'>{meme.bottomText}</h3>
      </div>
    </main>
  )
}
