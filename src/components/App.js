import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { selectUser, setUser, logoutUser } from "../features/user/userSlice";

function App() {
  //const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const login = async () => {
    await dispatch(setUser());
    //console.log(response)
  };

  const logout = async () => {
    await dispatch(logoutUser());
  };

  return (
    <AnimatePresence>
      <div className="flex min-h-screen flex-col overflow-hidden">
        <div className="mb-12">
          <section className="mb-8 w-full border-b border-slate-400 bg-white">
            <div className="container w-full max-w-xl">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <Link to={"/"}>
                    <p className="mb-1 font-display text-5xl font-bold tracking-tight text-red-700 transition-colors duration-300 hover:text-red-600">
                      Judging Joe's
                    </p>
                  </Link>
                  <p className="text-sm uppercase tracking-widest">
                    Open source TJ Snack Reviews
                  </p>
                </div>

                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={user ? logout : login}
                  className="mt-2 w-14 p-2 hover:text-red-700 hover:brightness-110"
                >
                  {user ? (
                    <img
                      src={user.photoURL}
                      className="rounded-full"
                      alt="user avatar"
                    />
                  ) : (
                    <FaUserCircle className="h-full w-full" />
                  )}
                </motion.button>
              </div>
            </div>
          </section>
          <Outlet />
        </div>
        <div className="mt-auto border-stone-400 bg-stone-800 py-2">
          <p className="text-center text-sm text-stone-200">
            Built with 🍩 by Keegan Leary
          </p>
        </div>
      </div>
    </AnimatePresence>
  );
}

export default App;
