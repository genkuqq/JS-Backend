import Link from "next/link";
import { serverAuth } from "@/hooks/auth";
import "./mainPage.css"
import Updates from "@/components/updates";

export async function MainPage() {
  const auth = await serverAuth()
  return (
    <div>
      {auth ? (
        <div className="container">
          <h1>Guncelleme Notlari</h1>
          <Updates/>
        </div>
      ):(
        <div className="login-container">
          <Link className="login-button" href={"/login"}>Login</Link>
        </div>
      )}
    </div>
  );
}

export default MainPage;
