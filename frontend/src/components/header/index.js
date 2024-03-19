import Link from "next/link";
import { serverAuth } from "@/hooks/auth";
import "../styles/header.css"

export async function Header() {
  const auth = await serverAuth()
  return (
    <div>
        {auth ? (
          <nav className="navbar">
            <div>
              <Link href="/">Dashboard</Link>
              <Link href="/product">Product</Link>
              <Link href="/invoice">Invoice</Link>
            </div>
          </nav>
        ) : (
          null
        )}
      </div>
  );
}

export default Header;
