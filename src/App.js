import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import Project from "./project";
function App() {
  return (
    <div>
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/project"/>}/>
          <Route path="/project/*" element={<Project/>}/>
        </Routes>
      </div>
    </HashRouter>
    </div>
  );
}

export default App;
