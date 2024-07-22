import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import NotFound from './pages/NotFoundPage'
import Layout from './layouts'



const router = createBrowserRouter([
  {path:"/",element:<Layout /> , children:[
    {path:"/" , element:<HomePage />},
    {path:"/about" , element:<AboutPage />},
    {path:"*" , element :<NotFound />}
  ]}
])
function App() {

  return (
    <RouterProvider router={router} />

  )
}

export default App
