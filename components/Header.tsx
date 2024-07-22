"use client";

import {
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { SignedIn, useUser } from "@clerk/nextjs";
import Breadcrumbs from "./Breadcrumbs";

function Header() {
  const { user } = useUser();
  return (
    <header className='flex items-center justify-between p-5'>
      {user && (
        <h1>
          {user?.firstName}
          {`'s`} Space
        </h1>
      )}

      {/* {Breadcrumbs} */}
      <Breadcrumbs />

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}

export default Header;
