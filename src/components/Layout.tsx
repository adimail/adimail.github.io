import React from 'react';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  footer?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  className = '',
  footer = false,
}) => {
  return (
    <>
      <main className={`max-w-[1100px] mx-auto px-5 my-[90px] ${className}`}>
        {children}
      </main>
      {footer && <Footer links />}
    </>
  );
};
