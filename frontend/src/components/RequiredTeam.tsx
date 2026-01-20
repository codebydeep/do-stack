import { useTeamStore } from "@/store/useTeamStore";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface RequiredTeamProps {
  children: ReactNode;
}

const RequiredTeam = ({ children }: RequiredTeamProps) => {
    const { team } = useTeamStore()

  if (!team) {
    return <Navigate to="/teams" replace />;
  }

  return <>{children}</>;
};

export default RequiredTeam;
