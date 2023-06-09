import React from 'react'
import {Link} from 'react-router-dom'

const WidgetTags = () => {
    const tags = ['c','css','express','firebase','html','java','javascript','mern','mongodb','mysql','next.js','node.js','php','python','react.js']
  return (
    <div className='widget-tags'>
      <h3>Watched tags</h3>
      <Link to={'/Tags'} className='widget-tags-div'>
        {
            tags.map((tag) => (
                <p key={tag}>{tag}</p>
            ))
        }
      </Link>
    </div>
  )
}

export default WidgetTags
