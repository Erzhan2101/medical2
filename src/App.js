import {BrowserRouter as Router, Route} from "react-router-dom"
import Project from "./views/project";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
        <Layout>
            <Route exact path='/'><Project/></Route>
        </Layout>
    </Router>
  );
}

export default App;
