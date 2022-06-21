import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { selectUser, setUser, logoutUser } from '../features/user/userSlice';



function App() {
  //const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const login = async () => {
    await dispatch(setUser())
    //console.log(response)
  }

  const logout = async () => {
    await dispatch(logoutUser())
  }

  console.log('user', user)

  return (
    <AnimatePresence>
      <div>
        <section className='w-full bg-gray-100'>
          <div className='container max-w-lg w-full'>
            <div className='flex items-center justify-between mb-4'>
              <Link to={'/'}>
                <p className='text-5xl font-display'>Judging Joe's!</p>
              </Link>
              <motion.button whileTap={{ scale: 0.8 }} onClick={user ? logout : login} className='w-14 p-2'>
                {user
                  ?
                  (<img src={user.photoURL} className='rounded-full' alt='user avatar' />)
                  :
                  (<FaUserCircle className='w-full h-full' />)
                }
              </motion.button>
            </div>
          </div>
        </section>
        <Outlet />
      </div>
    </AnimatePresence>
  );
}

export default App;
