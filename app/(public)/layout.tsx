import "../globals.css";
import GA from "@/components/GA";

export const metadata = {
  title: "Liquid Theory",
  description: "Cocktails, mocktails, and bar craft."
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GA />
        {children}
      </body>
    </html>
  );
}
