// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// export function DialogCloseButton() {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline">Share</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle>Create New Team</DialogTitle>
//           <DialogDescription>
//            Team Name
//           </DialogDescription>
//         </DialogHeader>
//         <div className="flex items-center gap-2">
//           <div className="grid flex-1 gap-2">
//             <Label htmlFor="link" className="sr-only">
//               Link
//             </Label>
//             <Input
//               id="link"
//             />
//           </div>
//         </div>
//         <DialogFooter className="sm:justify-start">
//           <DialogClose asChild>
//             <Button type="button" variant="secondary">
//               Add
//             </Button>
//           </DialogClose>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }



import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTeamStore } from "@/store/useTeamStore";
import { useState } from "react";

export function CreateTeamDialog() {
  const { createTeam, isCreating } = useTeamStore();
  const [teamName, setTeamName] = useState("");
  const [open, setOpen] = useState(false);

  const handleCreate = async () => {
    const success = await createTeam(teamName);

    if (success) {
      setTeamName("");
      setOpen(false); // ✅ close ONLY after success
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Team</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Team</DialogTitle>
          <DialogDescription>
            Enter a name for your new team.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2 py-4">
          <Label htmlFor="teamName">Team Name</Label>
          <Input
            id="teamName"
            placeholder="e.g. Frontend Squad"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            disabled={isCreating}
          />
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => setOpen(false)}
            disabled={isCreating}
          >
            Cancel
          </Button>

          <Button
            onClick={handleCreate}
            disabled={isCreating || !teamName.trim()}
          >
            {isCreating ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
