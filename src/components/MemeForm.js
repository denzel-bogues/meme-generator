import React, { useState, useEffect } from 'react';


function MemeForm() {
  const [meme, setMeme] = useState({
    topText: ' ',
    bottomText: ' ',
    randomImage: ' '
  })
  const [allMemeImages, setAllMemeImages] = useState([])

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(data => setAllMemeImages(data.data.memes))
  }, []);

  function getMeme(e) {
    e.preventDefault();

    const memesArray = allMemeImages;
    const randomNumber = Math.floor(Math.random() * memesArray.length);
    const url = memesArray[randomNumber].url
    setMeme(prevMeme => ({ ...prevMeme, randomImage: url }));
  }

  function handleForm(e) {
    setMeme(prevMeme => {
      return (
        { ...prevMeme, [e.target.name]: e.target.value }
      )
    })
  }
  return (
    <main>
      <form className='meme--form'>

        <input className='form--inputs ' onChange={handleForm} name='topText' value={meme.topText} placeholder='top text' type="text" />

        <input className='form--inputs' onChange={handleForm} name='bottomText' value={meme.bottomText} placeholder='bottom text' type="text" />

        <button onClick={getMeme} className='form--button'>Get a new meme image</button>
      </form>
      <div className='meme'>
        <img className='meme--image' src={meme.randomImage} alt="Image of meme" />
        <h1 className='meme--text top'>{meme.topText}</h1>
        <h1 className='meme--text bottom'>{meme.bottomText}</h1>
      </div>
    </main>
  )
}

export default MemeForm