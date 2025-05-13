import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Categories from "./pages/Categories";
import CategoryView from "./pages/CategoryView";
import ThreadView from "./pages/ThreadView";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";
import "./scss/App.scss"
import Navbar from "./components/Navbar";
import Notifications from "./pages/Notifications";
import NewThread from "./pages/NewThread";
import AdminDashboard from "./pages/AdminDashboard";


function App() {
  return (
      <div className="App">
          <Router>
              <Navbar />
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/category/:categoryName" element={<CategoryView />} />
                  <Route path="/category/:categoryName/thread/:id" element={<ThreadView />} />
                  <Route path="/user/:id" element={<UserProfile />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/new-thread" element={<NewThread />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/admin" element={<AdminDashboard/>} />
              </Routes>
          </Router>
      </div>
  );
}

export default App;
