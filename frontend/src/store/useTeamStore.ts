import { axiosInstance } from "@/lib/axios";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

type Team = {
  _id: string;
  name: string;
};

type teamStore = {
  team: Team | null;
  teams: Team[];
  isCreating: boolean;

  createTeam: (teamName: string) => Promise<boolean>;
   fetchTeams: () => Promise<void>;
   setTeam: (team: Team) => void
};

export const useTeamStore = create<teamStore>((set) => ({
  team: null,
  teams: [],
  isCreating: false,

  createTeam: async (teamName) => {
    try {
      set({
        isCreating: true,
      });

      const res = await axiosInstance.post(
        "/teams/create-team",
        {
          teamname: teamName,
        },
        {
          withCredentials: true,
        }
      );

      set({
        team: res.data.team,
        isCreating: false,
      });

      toast.success("Team created");

      return true;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const message = error.response?.data?.message || "Failed to create team";

      toast.error(message);
      set({ isCreating: false });
      return false;
    }
  },

  fetchTeams: async () => {
    const res = await axiosInstance.get(
      "/teams/my-teams",
      { withCredentials: true }
    );

    set({ teams: res.data.data });
  },

  setTeam: (team) => set({ team }),
}));
