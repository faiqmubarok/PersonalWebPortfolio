import {RouterProvider} from 'react-router-dom'
import Router from './router/DefaultRouter'
import { ThemeProvider } from './context/ThemeContext';
import { useState, useEffect } from 'react';
import Loader from './common/Loader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {setTimeout(() => {setLoading(false)}, 1000)
  }, [])

  return loading ? 
  <Loader /> : 
  (
    <>
    <ThemeProvider>
     <RouterProvider router={Router} />
    </ThemeProvider>
    </>
  )
}

export default App
