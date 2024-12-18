import { useState } from "react"



const App = () => {
  //function App() {
  const [image, setImage] = useState(null)

  const uploadImage = (e) => {
    //console.log(e.target.files)
    const formData = new FormData()
    formData.append('fike', e.target.files[0])
    setImage(e.target.files[0])
    e.target.value = null
    
  }

  return (
    <div className="app">
      {image && <img src={URL.createObjectURL(image)} />}
      <label htmlFor="files">upload an image</label>
      <input onChange={uploadImage} id="files" accept="image/*" type="file" />
    </div>
  );
}

export default App
