"use client";
import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useTheme } from "next-themes";

import { motion, AnimatePresence } from "framer-motion";

export const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const { theme, setTheme } = useTheme();

  const toggleDarkMode = () => {
    theme == "dark" ? setTheme("light") : setTheme("dark");
  };

  const [toggleDropDown, settoggleDropDown] = useState(false);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setTheme("dark")
    setUpProviders();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link
        href='/'
        className='flex gap-2 flex-center'>
        <Image
          src='/assets/icons/icon-light.svg'
          alt='Suggestra logo'
          width={60}
          height={60}
          className='object-contain'
        />
        <p className='logo_text mt-4 dark:text-gray-100'>Suggestra</p>
      </Link>

      {/* / Desktop Nav */}

      <AnimatePresence>
      <motion.div className='sm:flex hidden'>
        { theme == "light" ? (
          <Image
            className='rounded-full mr-4'
            onClick={toggleDarkMode}
            alt='profile'
            width={37}
            height={37}
            src='/assets/icons/dark.svg'
          />
        ) : (
          <Image
            className='rounded-full mr-4'
            onClick={toggleDarkMode}
            alt='profile'
            width={37}
            height={37}
            src='/assets/icons/sun.svg'
          />
        )}

        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link
              className={ theme == "light" ? `black_btn` : `white_btn`}
              href='/create-prompt'>
              Create Post
            </Link>
            <Link href='/'>
              {" "}
              <button
                onClick={signOut}
                className={ theme == "light" ? `black_btn` : `white_btn`}
                type='button'>
                Sign Out
              </button>
            </Link>

            <Link href='/profile'>
              <Image
                className='rounded-full'
                alt='profile'
                width={37}
                height={37}
                src={session?.user?.image}
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  className='black_btn'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}>
                  Sign In
                </button>
              ))}
          </>
        )}
      </motion.div>
      </AnimatePresence>

      {/* / Mobile Nav */}

      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              className='rounded-full'
              alt='profile'
              width={40}
              height={40}
              src={session?.user?.image}
              onClick={() => settoggleDropDown((prev) => !prev)}
            />

            {toggleDropDown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => settoggleDropDown((prev) => !prev)}>
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => settoggleDropDown((prev) => !prev)}>
                  Create Prompt
                </Link>

                <Link href='/'>
                  <button
                    type='button'
                    onClick={() => {
                      settoggleDropDown(false);
                      signOut();
                    }}
                    className='mt-5 w-full black_btn'>
                    Sign Out
                  </button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  className='black_btn'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}>
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};
