
import { Link } from 'react-router-dom'
import { FaSearch, FaShoppingBag, FaSignOutAlt, FaSignInAlt, FaUser } from "react-icons/fa"
import { useState } from 'react';
import { User } from '../types/types';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import toast from 'react-hot-toast';
  

interface PropsType {
  user: User | null;
}
const Header = ({user} : PropsType) => {
const [isopen, setisopen] = useState<boolean>(false);

const logouthandler = async () =>{
  try {
    await signOut(auth);
    toast.success("Sign Out Successfully")

    setisopen(false);
  } catch (error) {
    toast.error("Sign out failed")
  }
}

  return (
    <nav className="header">
      <Link onClick={ () =>setisopen(false) } to={"/"}>HOME</Link>
      <Link onClick={ () =>setisopen(false) }  to={"/search"}><FaSearch /></Link>
      <Link  onClick={ () =>setisopen(false) }  to={"/cart"}><FaShoppingBag /></Link>
      {
        user?._id ? (
          <>
            <button onClick={ () =>setisopen((prev) => !prev) }>
              <FaUser />
            </button>
            <dialog open={isopen}>
              <div >
                {
                  user.role === "admin" ? (    <>
                    <Link to='/admin/dashboard'>Admin</Link>
                    <Link to='/orders'>orders</Link>
            

                    </>
                  ) : (
                    <>
                      <button onClick={logouthandler}>{<FaSignOutAlt/>}</button>
                    </>
                  )
                }
              </div>
            </dialog>
          </>
        ) : (
            <Link to={"/login"}><FaSignInAlt /></Link>
          )
      }
    </nav>
  )
}

export default Header
