
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Wifi, WifiOff } from "lucide-react";

export function InternetStatus() {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        // Set initial state
        setIsOnline(navigator.onLine);

        const handleOnline = () => {
            setIsOnline(true);
            toast.dismiss("offline-toast");
            toast.success("Internet connected", {
                icon: <Wifi className="w-4 h-4" />,
                duration: 3000,
            });
        };

        const handleOffline = () => {
            setIsOnline(false);
            toast.error("No internet connection", {
                id: "offline-toast",
                icon: <WifiOff className="w-4 h-4" />,
                duration: Infinity,
                description: "Please check your network settings.",
            });
        };

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return null;
}
