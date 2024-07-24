import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import SingleDesign from "./components/SingleDesign";
import Admin from "./components/Admin Panel/Admin";
import Auth from "./components/Admin Panel/Auth";
import Navbar from "./components/Navbar";
import AddNiche from "./components/Admin Panel/AddNiche";
import EditNiche from "./components/Admin Panel/EditNiche";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="" element={<Outlet />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/add_niche" element={<AddNiche />} />
          <Route path="/admin/edit_niche/:nicheId" element={<EditNiche />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
        <Route path="/designs/:nicheId" element={<SingleDesign />} />
      </Routes>
    </>
  );
}

export default App;
