import { useState } from "react"



const App = () => {
  //function App() {
  const [image, setImage] = useState(null)
  const [value, setValue] = useState("")
  const [response, setResponse] = useState("")
  const [error, setError] = useState("")

  const surpriseOptions = [
    'Does the image have a Dinosaur?',
    'Is the image fabulously pink?',
    'Does the image have funny phaces?'
  ]

  const impressing = () => {
    const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)]
    setValue(randomValue)
  }

  const uploadImage = async (e) => {
    //console.log(e.target.files)
    const formData = new FormData()
    formData.append('fike', e.target.files[0])
    setImage(e.target.files[0])
    e.target.value = null
    try {
      const options = {
        method: 'POST',
        body: formData
      }
      const respose = await fetch('http://localhost:8000/upload', options)
      const data = respose.json()
      console.log(data)
    } catch (err) {
      console.log(err)
      setError("Something didn't work! Please try again.")
    }
  }
  console.log(value)

  const analyzeImage = async () => {
    setResponse("")
    if (!image) {
      setError("Error! Must have an image!")
      return
    }
    try {

      const options = {
        method: "POST",
        body: JSON.stringify({
          message: value
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
      const response = await fetch("http://localhost:8000/openai", options)

      console.log(response)

    } catch (err) {
      console.log(err)
      setError("Something didn't work! Please try again.")

    }
  }

  const clear = () => {
    setImage(null)
    setValue("")
    setResponse("")
    setError("")
  }

  return (
    <div className="app">
      <section className="search-section">
        <div className="image-container">
          {image && <img src={URL.createObjectURL(image)} />}
        </div>
        <p className="extra-info">
          <span>
            <label htmlFor="files">upload an image</label>
            <input onChange={uploadImage} id="files" accept="image/*" type="file" />
          </span>
          Ask me about the Image.
        </p>
        <p>
          What do you want to know about the image ?
          <button className="impressing" onClick={impressing} disabled={response}>Impressing me</button>
        </p>
        <div className="input-container">
          <input
            value={value}
            placeholder="What is in the image..."
            onChange={e => setValue(e.target.value)}
          />
          {(!response && !error) && <button onClick={analyzeImage}>Ask Open AI</button>}
          {(response || error) && <button onClick={clear}>Clear</button>}
        </div>
        {error && <p>{error}</p>}
        {response && <p className="answer">{response}</p>}
      </section>


    </div>
  );
}

export default App
