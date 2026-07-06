import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4">Uber Clone</header>
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
};

export default MainLayout;