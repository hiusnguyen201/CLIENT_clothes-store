import { Link } from "react-router-dom";
import { NavUser } from "@/components/layouts/NavUser";
import { useAuth } from "@/hooks/use-auth";
import { BusinessNotification } from "@/components/layouts/BusinessNotification";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const { user } = useAuth();
  const { open } = useSidebar();
  return (
    <header className="bg-black z-[50] left-0 right-0 fixed top-0 w-full px-2 flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear">
      <Link
        to={"/dashboard"}
        className={cn(
          "group-data-[collapsible=icon]:px-2 object-contain h-full -ml-2",
          open ? "w-[var(--sidebar-width)]" : "w-[var(--sidebar-width-icon)]"
        )}
      >
        <img
          src={open ? "/assets/logo/logo3.svg" : "/assets/logo/logo4.svg"}
          alt="logo"
          className="h-full w-full p-2"
        />
      </Link>

      {user && (
        <div className="flex items-center gap-3">
          <Link to="/messages" className="flex items-center">
            <Button variant="ghost" size="icon" className="text-white hover:text-black w-8 h-8">
              <MessageCircle />
            </Button>
          </Link>
          <BusinessNotification />
          <NavUser user={user} />
        </div>
      )}
    </header>
  );
}
