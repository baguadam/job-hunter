import { Layout } from "./layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { AuthProvider } from "./auth/AuthContext";
import { RequiredRole } from "../utils/enums";
import RequireLoggedOutUser from "./auth/RequireLoggedOutUser";
import { Profile } from "./pages/Profile";
import RequireAuthWithRole from "./auth/RequireAuthWithRole";
import { CreateJob } from "./pages/CreateJob";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/login"
              element={<RequireLoggedOutUser element={<Login />} />}
            />
            <Route
              path="/register"
              element={<RequireLoggedOutUser element={<Register />} />}
            />
            <Route
              path="/profile"
              element={
                <RequireAuthWithRole
                  element={<Profile />}
                  requiredRole={RequiredRole.EITHER}
                />
              }
            />
            <Route
              path="/add-job"
              element={
                <RequireAuthWithRole
                  element={<CreateJob />}
                  requiredRole={RequiredRole.COMPANY}
                />
              }
            />
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
