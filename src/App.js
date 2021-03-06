import logo from './logo.svg';
import './App.css';
import AllBlogs from './pages/AllBlogs';
import SingleBlog from './pages/SingleBlog';
import Form from './pages/Form';
import {useState, useEffect} from "react"
import {Route, Routes, Link, useNavigate} from "react-router-dom"


/////////////////
// Style Object
/////////////////
const h1 = {
  textAlign: "center",
  margin: "10px"
}

const button = {
  backgroundColor: "navy",
  display: "block",
  margin: "auto"
}

function App() {

   ///////////////////////////
  // State and Other Variables
  ///////////////////////////

  const navigate = useNavigate()


const url = "https://lgblogs.herokuapp.com/blogs/"

// state to hold list of blogs
const [blogs, setBlogs] = useState([])

// an empty blog for initializing the create form 
const nullBlog = {
  subject: "",
  details: ""
}

const [targetBlog, setTargetBlog] = useState (nullBlog)

//////////////////
// Functions
//////////////////

// function to get list of blogs from API
const getBlogs = async () => {
  const response = await fetch(url)
  const data = await response.json()
  setBlogs(data)
}

// function to add blogs
const addBlogs = async (newBlog) => {
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newBlog)
  })
  // update the list of blogs
  getBlogs()
}
  // to select a blog to edit
  const getTargetBlog = (blog) => {
    setTargetBlog(blog)
    navigate("/edit")
  }

  // update blog for our handleSubmit prop
  const updateBlog = async (blog) => {
    await fetch(url + blog.id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog)
    })

    // update our blogs
    getBlogs()
  }

  const deleteBlog = async (blog) => {
    await fetch(url + blog.id, {
      method: "delete"
    })
    getBlogs()
    navigate("/")
  }

//////////////////
// useEffects
//////////////////

useEffect(() => {
  getBlogs()
}, [])

//////////////////
// Returned JSX
//////////////////


  return (
    <div className="App">
      <h1 style={h1}>My Blog</h1>
      <Link to="/new"><button style={button}>Add New Blog</button></Link>
      <Routes>
        <Route path="/" element={<AllBlogs blogs={blogs}/>}/>
        <Route path="/blog/:id" element={<SingleBlog blogs={blogs} edit={getTargetBlog} deleteBlog={deleteBlog}/>}/>
        <Route path="/new" element={<Form initialBlog={nullBlog} handleSubmit={addBlogs} buttonLabel="Create Blog"/>}/>
        <Route path="/edit" element={<Form initialBlog={targetBlog} handleSubmit={updateBlog} buttonLabel="Update Blog"/>}/>
      </Routes>
    </div>
  );
}

export default App;
