import React, { useState, useEffect } from 'react'
import BlogCard from './blogCard'

function Blogs() {
  const[blogs, setBlogs] = useState();

  const fetchBlogs = async () => {
    const res = await fetch('http://localhost:8000/api/blog');
    const result = await res.json();
    // console.log(result.data[0].data);
    setBlogs(result.data[0].data);
  }
  
  useEffect(() => {
    fetchBlogs();
  });
  return (
    <div className="container">
        {/* <div className="row"> */}
          {/* <div className="col-10 mx-auto"> */}
            <div className="d-flex justify-content-between pt-5 mb-4">
              <h4>Blogs</h4>
              <a href="/create" className="btn btn-dark">Create</a>
            </div>
            <div className="row mb-5">
                {
                  (blogs) && blogs.map((blog) => {
                    return (<BlogCard blog={blog}/>)
                  })
                }
            </div>
      </div>
  )
}

export default Blogs