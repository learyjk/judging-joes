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
        <section className='w-full bg-white border-b border-slate-400 mb-4'>
          <div className='container max-w-xl w-full'>
            <div className='flex items-center justify-between mb-4'>
              <div>
                <Link to={'/'}>
                  <p className='text-5xl font-display font-bold tracking-tight text-red-700 hover:text-red-700 transition-colors duration-300 mb-1'>Judging Joe's</p>
                </Link>
                <p className='text-sm tracking-widest uppercase'>Open source TJ Snack Reviews</p>
              </div>

              <motion.button whileTap={{ scale: 0.8 }} onClick={user ? logout : login} className='w-14 p-2 mt-2 hover:text-red-800 hover:brightness-110'>
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
