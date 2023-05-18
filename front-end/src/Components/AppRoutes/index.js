import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../../Pages/Dashboard";
import Mapt1 from "../../Pages/mapt1";
import Mapt2 from "../../Pages/mapt2";
import Mapt3 from "../../Pages/mapt3";
import Mapm1 from "../../Pages/mapm1";
import Mapm2 from "../../Pages/mapm2";
import Mapm3 from "../../Pages/mapm3";
import Chart1 from "../../Pages/chart1";
import Chart2 from "../../Pages/chart2";
import Chart3 from "../../Pages/chart3";



function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/mapt1" element={<Mapt1 />}></Route>
      <Route path="/mapt2" element={<Mapt2 />}></Route>
      <Route path="/mapt3" element={<Mapt3 />}></Route>
      <Route path="/mapm1" element={<Mapm1 />}></Route>
      <Route path="/mapm2" element={<Mapm2 />}></Route>
      <Route path="/mapm3" element={<Mapm3 />}></Route>
      <Route path="/chart1" element={<Chart1 />}></Route>
      <Route path="/chart2" element={<Chart2 />}></Route>
      <Route path="/chart3" element={<Chart3 />}></Route>
    </Routes>
  );
}
export default AppRoutes;
