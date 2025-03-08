import { NavLink } from "react-router-dom"

const Navbar =( ) =>{
    return(
        <>
        <p>this is navbar page</p>
        <NavLink to='/'>HOME</NavLink>
        <br/>
        <NavLink to='/about'>ABOUT</NavLink>
        </>
    )
}
export default Navbar