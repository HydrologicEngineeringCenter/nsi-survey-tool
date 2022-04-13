import React from 'react';
export default () => {
  const base = process.env.REACT_APP_HOMEPAGE
  return (
    <div className="container">
      <h2>404</h2>
      <p>We couldn't find the page you were looking for...</p>
      <a href={"/" + base}>Go Home</a>
    </div >
  )
}
