import React from "react";

type AuthenticatedLayoutProps = {
  children: React.ReactNode;
};

export default async function AuthenticatedLayout({
  children,
}: AuthenticatedLayoutProps) {
  // const { user } = await getAuth();

  // if (!user) {
  //   redirect(signInPath());
  // }

  return <>{children}</>;
}
