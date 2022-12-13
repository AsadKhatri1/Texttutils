import "./App.css";

import Navbar from "./components/Navbar";
import  Home  from './components/Home'
import  Textform  from './components/Textform'

function App() {
 
  return (
    <>
      <Navbar title="TextTutils" homeText='Home'/>
      {/* <Home owner="Asad"/> */}
      <Textform heading="Enter text to Analyze"/>
    </>
  );
}

export default App;
