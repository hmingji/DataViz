import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function HeaderLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
