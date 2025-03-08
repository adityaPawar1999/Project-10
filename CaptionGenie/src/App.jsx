import { BrowserRouter  , Routes , Route} from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage';
import AboutPage from './Pages/AboutPage/AboutPage.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
const App = () =>{
  return(
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes >
      <Route path='/' element={<HomePage/>}/>
      <Route path='/about' element={<AboutPage/>}/>
      </Routes>
    </BrowserRouter>
  </>
  )}

  export default App;