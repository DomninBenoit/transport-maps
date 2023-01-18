import "./style.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { Provider } from "react-redux";
//import { store } from "../../services/redux/reducer";
import Home from "../../Pages/Home";

function App() {
  return (
    //<Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
    //</Provider>
  );
}

export default App;
