
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div
            className="relative flex flex-col items-center justify-center min-h-[60vh] h-full gap-4 bg-card text-card-foreground"
            style={{ fontFamily: "var(--font-family-sans)" }}
        >
            {/* <div className="absolute inset-0 overflow-hidden top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-full">
                <div className="flex p-4 opacity-30 items-center justify-center h-full">
                    <div className="w-30 h-30 bg-violet-500 transform -skew-y-12"></div>
                    <div className="w-30 h-30 bg-green-500 transform -skew-y-12"></div>
                    <div className="w-30 h-30 bg-yellow-500 transform -skew-y-12"></div>
                    <div className="w-30 h-30 bg-orange-500 transform -skew-y-12"></div>
                    <div className="w-30 h-30 bg-red-500 transform -skew-y-12"></div>
                </div>
            </div> */}
            <div className="relative z-10 flex flex-col backdrop-blur-2xl h-full w-full items-center justify-center">
                <h1
                    className="text-[10rem] font-bold tracking-tight text-violet-500"
                    style={{
                        backgroundImage: "url(https://media2.giphy.com/media/HkEDr0jVekaZO/giphy.gif?cid=790b76115151ed408a9cae4539eb6351baba5d85998ab783&ct=g&rid=giphy.gif)",
                        backgroundSize: "cover",
                        color: "transparent",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        height: "10rem",
                        lineHeight: "10rem",
                        WebkitTextStroke: "2px oklch(60.6% 0.25 292.717)",
                    }}
                >
                    404
                </h1>
                <p className="text-3xl text-muted-foreground mb-2">Page not found</p>
                <Button
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                    className="mt-2 animate-fade-in"
                >
                    Go to Dashboard
                </Button>
            </div>
        </div>
    );
}
