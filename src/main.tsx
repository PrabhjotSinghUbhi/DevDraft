import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home.tsx'
import { About, Login, Contact, PostPage, SignUp, Missing, PostForm, EditPost } from './components/index.ts'
import { Provider } from 'react-redux'
import store from './store/store.ts'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/post/:id' element={<PostPage />} />
      <Route path='/add-post' element={<PostForm />} />
      <Route path='/edit-post/:id' element={<EditPost />} />
      <Route path='*' element={<Missing />} />
    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
