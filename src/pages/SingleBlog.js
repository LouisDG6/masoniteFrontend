import React from "react"
import {Link, useParams} from "react-router-dom"

const SingleBlog = ({blogs, edit, deleteBlog}) => {
    //get the params from the url
    const params = useParams()
    const id = parseInt(params.id)

    //find the particular blog the user wants to see based on the param
    const blog = blogs.find((b) => b.id === id)
    console.log(blog)

    ////////////////////
    // Style Object
    ////////////////////
    const div = {
        textAlign: "center",
        border: "3px solid green",
        width: "80%",
        margin: "30px auto"
    }

    return <div style={div}>
        <h1>{blog?.subject}</h1>
        <h2>{blog?.details}</h2>
        <button onClick={() => deleteBlog(blog)}>Delete</button>
        <button onClick={() => edit(blog)}>Edit</button>
        <Link to="/">
            <button>Return</button>
        </Link>
    </div>
}

export default SingleBlog;