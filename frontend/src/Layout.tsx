import { Header } from "./components/Header";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="font-[interRegular]">{children}</main>
    </>
  );
}
