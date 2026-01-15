import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <>
      <div>
        <nav>
          <div className="flex justify-between items-center py-4 px-8 m-6 border rounded-xl">
            <div className="w-2/4 font-bold">Workable</div>
            <div className="flex justify-between items-center sm:w-1/4 lg:w-fit gap-2">
              <Link to={"/signin"}>
                <Button variant="outline">Get Started</Button>
              </Link>
              <ModeToggle />
            </div>
          </div>
        </nav>

        <div className="flex justify-center pt-28">
          <div className="border py-6 px-10 text-center rounded-xl space-y-4">
            <h1 className="font-semibold text-4xl md:text-5xl tracking-tight">
              Organize Tasks. Boost Productivity. Achieve More.
            </h1>

            <p className="text-muted-foreground text-md max-w-xl mx-auto">
              A simple, powerful task manager built for individuals and teams.
            </p>

            <Link to={"/signin"}>
              <Button size="lg" variant="outline">
                Start now – It’s free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
