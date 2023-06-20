import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import Detail from "./pages/detail"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<Detail />} />
        </Routes>
      </Router>
    </>
  );
}
  
export default App;