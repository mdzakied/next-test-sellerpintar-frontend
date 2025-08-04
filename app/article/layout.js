import RoleGuard from "@/app/middlewares/RoleGuard";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function AtrilceLayout({ children }) {
  return (
    <RoleGuard allowedRoles={["Admin", "User"]}>
      <Header />
      <main className="bg-white">{children}</main>
      <Footer />
    </RoleGuard>
  );
}
