import React, { lazy, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { themeChange } from 'theme-change'
import initializeApp from './app/init';

// Importing pages
const Layout = lazy(() => import('./containers/Layout'))
// Initializing different libraries
initializeApp()


// Check for login and initialize axios


function App() {

  useEffect(() => {
    // 👆 daisy UI themes initialization
    themeChange(false)
  }, [])


  return (
    <>
      <Router>
        <Routes>
          {/* Place new routes over this */}
          <Route path="/app/*" element={<Layout />} />

          <Route path="*" element={<Navigate to={"/app/dashboard"} replace />}/>

        </Routes>
      </Router>
    </>
  )
}

export default App
