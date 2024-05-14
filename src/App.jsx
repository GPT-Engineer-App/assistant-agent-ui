import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import AgentRunDetails from "./pages/AgentRunDetails.jsx";
import Navigation from "./components/Navigation.jsx";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Index />} />
      </Routes>
      <Route path="/run/:runId" element={<AgentRunDetails />} />
    </Router>
  );
}

export default App;
