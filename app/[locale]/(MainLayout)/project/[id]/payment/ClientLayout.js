"use client";

import Payment from "/components/ProjectDetails/Payment";

export default function ClientLayout({ children }) {
  return (
    <div>
      <Payment>{children}</Payment>
    </div>
  );
}
