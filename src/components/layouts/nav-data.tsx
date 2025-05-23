import { PERMISSIONS } from "@/constants/permissions";
import {
  Blocks,
  CircleDollarSign,
  Gauge,
  KeyRound,
  MessageCircle,
  Package,
  Settings,
  ShoppingCart,
  SquareActivity,
  UserCog2,
  Users2,
} from "lucide-react";

const navMainGroupApp = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Gauge,
  },
  {
    title: "Activity",
    url: "/activity",
    icon: SquareActivity,
  },
  {
    title: "Categories",
    url: "/categories",
    icon: Blocks,
    permission: PERMISSIONS.READ_CATEGORIES,
  },
  {
    title: "Products",
    url: "/products",
    icon: Package,
    permission: PERMISSIONS.READ_PRODUCTS,
  },
  {
    title: "Customers",
    url: "/customers",
    icon: Users2,
    permission: PERMISSIONS.READ_CUSTOMERS,
  },
  {
    title: "Orders",
    url: "/orders",
    icon: ShoppingCart,
    permission: PERMISSIONS.READ_ORDERS,
  },
  {
    title: "Payments",
    url: "/payments",
    icon: CircleDollarSign,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users2,
    permission: PERMISSIONS.READ_USERS,
  },
  {
    title: "Roles",
    url: "/roles",
    icon: UserCog2,
    permission: PERMISSIONS.READ_ROLES,
  },
  {
    title: "Permissions",
    url: "/permissions",
    icon: KeyRound,
    permission: PERMISSIONS.READ_PERMISSIONS,
  },
  {
    title: "Monitoring",
    url: "/logs",
    icon: SquareActivity,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export const navData = {
  navMainGroupApp,
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
};
