import { User } from "@/models/User.model";
import { routes } from "@/routes";
import { Navigate, Outlet } from "react-router";

function AdminRoute() {
  const isAuth: User = JSON.parse(localStorage.getItem("user") || "{}");
  return isAuth.role === "ADMIN" ? <Outlet /> : <Navigate to={routes.login} />;
}
export default AdminRoute;
