import * as React from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export function TeamSwitcher({
  team,
}: {
  team: {
    name: string;
    logo: React.ElementType;
    plan?: string;
    url: string;
  };
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link to={team.url}>
          <SidebarMenuButton
            size="lg"
            className="p-6 h-14 border-b data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <h1 className="flex items-center gap-3 font-bold w-full text-2xl">
              <span className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <team.logo className="size-5" />
              </span>
              <span className="grid flex-1 text-left leading-tight">
                <span className="truncate font-semibold">{team.name}</span>
                {team.plan && <span className="truncate text-xs">{team.plan}</span>}
              </span>
            </h1>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
