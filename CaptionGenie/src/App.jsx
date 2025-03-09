import { BrowserRouter  , Routes , Route} from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage';
import AboutPage from './Pages/AboutPage/AboutPage.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import LoginPage from './Pages/LoginPage/LoginPage.jsx';
import SigninPage from './Pages/SigninPage/SinginPage.jsx';
const App = () =>{
  return(
    <>
    <BrowserRouter>
    <Navbar/>
    
      <Routes >
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/about' element={<AboutPage/>}/>
      </Routes>
    </BrowserRouter>
  </>
  )}

  export default App;