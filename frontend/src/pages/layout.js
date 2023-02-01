import React from 'react'
import Navbar from '../components/bar/Navbar'
import Sidebar from '../components/bar/Sidebar'


const layout = ({children}) => {
  return (
    <React.Fragment>
        <Navbar/>
        <div className="columns mt-6">
            <div className="column is-2"><Sidebar/></div>
            <div className="column has-background-light">
                <main>{children}</main>
            </div>
        </div>
    </React.Fragment>
  )
}

export default layout