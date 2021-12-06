import React from "react"
import { Link } from "react-router-dom"

const Blog = ({blog}) => {
    ////////////////////
    // Style Objects
    ////////////////////
    const div = {
        textAlign: "center",
        border: "3px solid",
        margin: "10px auto",
        width: "80%"
}

return (
    <div style={div}>
        <Link to={`/blog/${blog.id}`}>
            <h1>{blog.subject}</h1>
        </Link>
        <h2>{blog.details}</h2>
    </div> 
    )
}

export default Blog;