import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function PagesLayout({ children }) {
  const user = await auth();
  const isLoggedIn = !!user?.user;
  const currentPathname = headers().get("x-pathname");

  const notAllowedPaths = ["/login", "/signup", "/password-reset"];

  const isAllowed = !notAllowedPaths.some((path) =>
    path.startsWith(currentPathname)
  );
  return (
    <>
      {isAllowed && (
        <Nav user={user?.user} isLoggedIn={isLoggedIn} type="default" />
      )}
      {children}
      {isAllowed && <Footer />}
    </>
  );
}
