import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "../auth/pages/authPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;