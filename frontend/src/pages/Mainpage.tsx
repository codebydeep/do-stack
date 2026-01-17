import { useEffect, useState } from "react";
import CreateTeamPage from "./CreateTeamPage";
import { Spinner } from "@/components/ui/spinner";

const Mainpage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-4">
        <div className="w-screen flex justify-center items-center h-screen">
        <Spinner />

        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <CreateTeamPage />
      </div>
    </>
  );
};

export default Mainpage;
