import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import PageHome from "@/pages/Home";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<PageHome />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
