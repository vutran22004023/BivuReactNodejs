import React from 'react'

export default function CommentFb(props) {
    const {dataHref} = props
  return (
    <div className="fb-comments" data-href={dataHref} data-width="" data-numposts="5"></div>
  )
}
