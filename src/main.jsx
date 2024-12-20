// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { ChakraProvider } from '@chakra-ui/react'


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <ChakraProvider>
//       <App />
//       </ChakraProvider>
//   </StrictMode>,
// )

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { body } from 'framer-motion/client'
import{ mode} from '@chakra-ui/theme-tools'
import { color } from 'framer-motion'
import { BrowserRouter } from 'react-router-dom/dist/index.js'


const styles = {
  global: (props) => ({
    body: {
      bg: mode("gray.100", "#000")(props),
      color: mode("gray.100", "whiteAlpa.900")(props)
    }
  })
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}
// j. extend the theme
const theme =extendTheme({config,styles})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ChakraProvider theme={theme}>
      <App/>
      </ChakraProvider>
      </BrowserRouter>
  </React.StrictMode>
);
