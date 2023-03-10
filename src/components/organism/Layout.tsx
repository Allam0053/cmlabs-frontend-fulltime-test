import * as React from 'react';

import LayoutNavbar from '@/components/organism/LayoutNavbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <>
      <LayoutNavbar />
      {children}
    </>
  );
}
