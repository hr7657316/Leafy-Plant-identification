
import './App.css';
import FileUpload from './Componets/Fileupload';
import Header from './Componets/Header';
import Home from './Componets/Home';
import RecentIdentifications from './Componets/RecentIdentifications';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Header/> 
        <Home/>
        <FileUpload/>
        <RecentIdentifications />
      </div>
    </ThemeProvider>
  );
}

export default App;
