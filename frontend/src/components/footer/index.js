import { serverAuth } from "@/hooks/auth";
import "../styles/footer.css"

export async function Footer() {
  const auth = await serverAuth()
  return (
    <div>
      {auth ? (
        <p className="text">v.0.1</p>
      ):(
        null
      )}
        
    </div>
  );
}

export default Footer;
