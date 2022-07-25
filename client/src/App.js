import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
