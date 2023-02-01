import React from 'react'
import Navbar from '../components/Bar/Navbar'
import Sidebar from '../components/Bar/Sidebar'


const layout = ({children}) => {
  return (
    <React.Fragment>
        <Navbar/>
        <div className="columns mt-6" style={{minHeight: "100vh"}}>
            <div className="column is-2"><Sidebar/></div>
            <div className="column has-background-light">
                <main>{children}</main>
            </div>
        </div>
    </React.Fragment>
  )
}

export default layout