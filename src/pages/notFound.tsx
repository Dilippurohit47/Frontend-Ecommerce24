import React from 'react'
import { TbError404Off } from "react-icons/tb";
import { VscError } from "react-icons/vsc";
import { Link } from 'react-router-dom';
const notFound = () => {
  return (
    <div className='container not-found'>
        <TbError404Off/>

        <h1>Page NOt Found</h1>

        <Link to={"/"}><VscError/></Link>
    </div>
  )
}

export default notFound
