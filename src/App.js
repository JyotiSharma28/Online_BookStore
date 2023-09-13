
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider,  createTheme} from '@material-ui/core'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';   ///we have to import it form website
import MainNavigation from './pages/MainNavigation';
import Header from './pages/Header/Header';
import Footer from './pages/Footer/Footer';
import { createContext } from 'react';
import { AuthWrapper } from './Context/authContext';
import { theme } from './Constant/theme';
import { CartWrapper } from './Context/cart';

// for data provide to all component
// const data={
//   name:'',
//   age:0,
//  }

// export const authContext =createContext(data)

// const values={
//   name:'jty',
//   age:12,
// }
  



function App() {

  const custometheme=createTheme({
    palette:{
      primary:{
        main:'#FFFFFF'
      },
      secondary:{
        main:"#FFFFFF"
      }
    }
  })

  return (
    <BrowserRouter>
     <AuthWrapper>
      <CartWrapper>
        <ThemeProvider  theme={theme}>
            <Header/>
            <div >    
              <MainNavigation />
            </div>
            <Footer/>
         <ToastContainer/>
        </ThemeProvider>
      </CartWrapper>
     </AuthWrapper>
    </BrowserRouter>
  );
}

export default App;
