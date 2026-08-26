import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import DrivingLicense from "./pages/DrivingLicense";
import VehicleRegistration from "./pages/VehicleRegistration";
import ServiceGeneric from "./pages/ServiceGeneric";
import OnlineServices from "./pages/OnlineServices";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/driving-license" element={<DrivingLicense />} />
          <Route path="/driving-license/:slug" element={<DrivingLicense />} />
          <Route path="/vehicle-registration/:slug" element={<VehicleRegistration />} />
          <Route path="/online-services" element={<OnlineServices />} />
          <Route path="/online-services/:slug" element={<OnlineServices />} />
          <Route path="/service/:slug" element={<ServiceGeneric />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
