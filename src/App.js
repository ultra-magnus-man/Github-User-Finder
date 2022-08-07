import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./Components/layouts/Footer";
import Navbar from "./Components/layouts/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { GithubProvider } from "./Context/github/GithubContext";
import { AlertProvider } from "./Context/alert/AlertContext";
import Alert from "./Components/layouts/Alert";
import User from "./pages/User";

function App() {
  return (
    <GithubProvider>
      <AlertProvider>
        <div>
          <Router>
            <div className="flex flex-col justify-between h-screen">
              <Navbar />
              <main className="container mx-auto px-3 pb-12">
                <Alert />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/user/:login" element={<User />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/notfound" element={<NotFound />} />
                  <Route path="/*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </div>
      </AlertProvider>
    </GithubProvider>
  );
}

export default App;
