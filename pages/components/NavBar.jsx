import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useTheme } from 'next-themes'
import {Disclosure} from '@headlessui/react'
import {MoonIcon, SunIcon, XIcon, MenuIcon} from '@heroicons/react/outline'
const navigation = [
  { name: 'About', href: '#about' },
  { name: 'Newsletter', href: '#newsletter' },
  { name: 'Discord', href: '#discord' },
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [darkMode, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const {theme, setTheme} = useTheme()

	const toggleMenu = () => {
    setMenuOpen(!menuOpen)
	};
  const switchTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    setDark(!darkMode);
    console.log(darkMode);
  }
	return (
    <Disclosure as="nav" className="bg-gray-300 dark:bg-lightGray">
      {({ open }) => (
        <>
          <header className='relative flex items-center h-16 bg-white dark:bg-darkHeaderBg'>
            <div className='relative flex items-center justify-between lg:pl-32 md:pl-20'>
              <Link href='/' passHref> 
                <div className='flex items-center pl-4'>
                  <div className='text-3xl lg:block h-8 w-auto font-logo'>Monad</div>
                  <img src={'/MonadLogo.png'} alt='Monad Logo' className='block h-8 w-auto pl-1'/>
                </div>
              </Link>
            </div>
            <div className='hidden sm:block m-auto'>
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    `text-textGray dark:text-white transition-all duration-500 ease-in-out focus:shadow-outline hover:underline`,
                    'px-3 py-2 rounded-md text-lg font-regular font-text'
                  )}
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden sm:flex lg:pr-32 md:pr-20 pr-4">
                <button
                  type="button"
                  className="pr-3 text-textGray dark:text-white hover:text-black dark:hover:text-gray-500 block"
                  onClick={switchTheme}
                >
                  {darkMode? <MoonIcon className="h-5 w-5 transition-all duration-500 ease-in-out" aria-hidden="true"/> : <SunIcon className="h-5 w-5 transition-all duration-500 ease-in-out" aria-hidden="true"/>}
                </button>
                <button
                  type="button"
                  className="inline min-w-0 items-center px-4 py-2 transition-all duration-500 ease-in-out rounded-md shadow-sm text-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 font-logo"
                >
                  Sign In
                </button>
            </div>
            <div className='sm:hidden ml-auto px-4'>
              <Disclosure.Button onClick={toggleMenu} className='items-center rounded-md'>
                <span className="sr-only">Open main menu</span>
                {open? <XIcon className="text-gray-400 dark:text-white hover:text-gray-300 dark:hover:text-gray-500 block h-6 w-6"/> : <MenuIcon className="text-gray-400 dark:text-white hover:text-gray-300 dark:hover:text-gray-500 block h-6 w-6"/>}
              </Disclosure.Button>
            </div>
          </header>
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    'bg-gray-300 dark:bg-lightGray text-textGray dark:text-white',
                    'block px-3 py-2 text-base font-medium'
                  )}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex justify-between px-3 pt-2">
                <button
                  type="button"
                  className="inline min-w-0 items-center px-4 py-2 transition-all duration-500 ease-in-out rounded-md shadow-sm text-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 font-logo"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className="pr-3 text-textGray dark:text-white hover:text-black dark:hover:text-gray-500 block"
                  onClick={switchTheme}
                >
                  {darkMode? <MoonIcon className="h-5 w-5 transition-all duration-500 ease-in-out" aria-hidden="true"/> : <SunIcon className="h-5 w-5 transition-all duration-500 ease-in-out" aria-hidden="true"/>}
                </button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
	);
}