import 'tailwindcss/tailwind.css'
import NavBar from './components/NavBar.jsx'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar/>
      <Component {...pageProps} />
    </> 
  )
}

export default MyApp
