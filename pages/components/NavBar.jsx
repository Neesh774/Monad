import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import {MoonIcon, SunIcon} from '@heroicons/react/outline'
const navigation = [
  { name: 'About', href: '#about', current: false, color: "logoGreen" },
  { name: 'Newsletter', href: '#newsletter', current: false, color: "pink" },
  { name: 'Discord', href: '#discord', current: false, color: "blue" },
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
	const [active, setActive] = useState(false);
  const [darkMode, setDark] = useState(false);
	const handleClick = () => {
		setActive(!active);
	};
  const switchTheme = () => {
    setDark(!darkMode);
  }
	return (
		<header className='relative flex items-center h-16 bg-white dark:bg-darkHeaderBg'>
      <div className='relative flex items-center justify-between'>
          <Link href='/' passHref> 
            <div className='flex items-center pl-5'>
              <div className='text-3xl lg:block h-8 w-auto font-logo'>Monad</div>
              <img src={'/MonadLogo.png'} alt='Monad Logo' className='block h-8 w-auto pl-1'/>
            </div>
          </Link>
        </div>
        <div className='sm:hidden'>
          <button onClick={handleClick} name='menu' className='items-center p-2 rounded-md text-gray-400 hover:text-gray hover:bg-gray-700'>
            <svg
              width={48}
              height={48}
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
        </div>
        <div className='hidden sm:block m-auto'>
          {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  `text-textGray transition-all duration-500 ease-in-out focus:shadow-outline hover:text-${item.color}`,
                  'px-3 py-2 rounded-md text-lg font-regular font-text'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </a>
            ))
          }
      </div>
      <span className="sm:ml-3 mx-4 flex">
          <button
            type="button"
            className="px-3"
            onClick={switchTheme}
          >
            {darkMode? <MoonIcon className="-ml-1 mr-1 h-5 w-5 text-textGray hover:text-black transition-all duration-500 ease-in-out" aria-hidden="true"/> : <SunIcon className="-ml-1 mr-1 h-5 w-5 text-textGray hover:text-black transition-all duration-500 ease-in-out" aria-hidden="true"/>}
          </button>
          <button
            type="button"
            className="hidden sm:block items-center px-4 py-2 border border-transparent transition-all duration-500 ease-in-out rounded-md shadow-sm text-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 font-logo"
          >
            Login
          </button>
        </span>
		</header>
	);
}