import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTeamStore } from "@/store/useTeamStore";

const CreateTeamPage = () => {
  const { createTeam, isCreating } = useTeamStore();
  const navigate = useNavigate();

  const [teamName, setTeamName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await createTeam(teamName);

    if (success) {
      navigate("/dashboard"); // or /teams
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Create a Team
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Give your team a meaningful name
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="teamName">Team Name</Label>
            <Input
              id="teamName"
              placeholder="e.g. Backend Warriors"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              disabled={isCreating}
              required
              className="text-black"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isCreating || !teamName.trim()}
          >
            {isCreating ? "Creating Team..." : "Create Team"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateTeamPage;
