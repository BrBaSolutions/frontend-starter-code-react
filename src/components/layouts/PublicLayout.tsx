import React from "react";
import { Outlet } from "react-router-dom";

const PublicLayout: React.FC = () => {
  return (
    <div className="h-screen">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
