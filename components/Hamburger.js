
import { useState } from "react";
import {RxHamburgerMenu} from "react-icons/rx"
import Sidebar from './Sidebar';

const Hamburger = () => {
  const [clicked,setClicked] = useState(false);
  return (
   <div onClick={()=>setClicked(!clicked)} className="absolute top-[20%]">
   <RxHamburgerMenu className="xs:block md:hidden" onClick={()=>setClicked(!clicked)} />
  {clicked &&  <Sidebar clicked={clicked}/>}
</div>)
}

export default Hamburger
