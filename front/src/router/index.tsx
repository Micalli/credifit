import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register/Register";
import { AddWorker } from "../pages/AddWorker";
import { Loan } from "../pages/Loan";
import { AuthGuard } from "./AuthGuard";
import { Home } from '../pages/Home';

export function Router() {
  return (
    <BrowserRouter>
      {/* <Toaster toastOptions={toastOptions} /> */}

      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/*" element={<Navigate to={"/login"} />} />

        <Route element={<AuthGuard isPrivate />}>
          <Route path="/add-worker" element={<AddWorker />} />
          <Route path="/loan" element={<Loan />} />
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
