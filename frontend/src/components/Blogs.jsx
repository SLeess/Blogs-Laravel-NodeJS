import React from 'react'
import BlogCard from './blogCard'

function Blogs() {
  return (
    <div className="container">
        {/* <div className="row"> */}
          {/* <div className="col-10 mx-auto"> */}
            <div className="d-flex justify-content-between pt-5 mb-4">
              <h4>Blogs</h4>
              <a href="/create" className="btn btn-dark">Create</a>
            </div>
            <div className="row mb-5">
                <BlogCard/>
                <BlogCard/>
                <BlogCard/>
                <BlogCard/>
                <BlogCard/>
                <BlogCard/>
                <BlogCard/>
            </div>
          {/* </div> */}
        {/* </div> */}
      </div>
  )
}

export default Blogs