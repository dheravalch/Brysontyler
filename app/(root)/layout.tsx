
import Footer from "../components/Footer";
import "./globals.css";




export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        {children}
        <Footer/>
    </div>
  );
}
