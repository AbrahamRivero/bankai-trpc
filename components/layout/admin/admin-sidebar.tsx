"use client";

import * as React from "react";
import {
  ClipboardList,
  Tickets,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  BoxIcon,
  SquareStack,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
  DASHBOARD_BASE_URL,
  DASHBOARD_CATEGORIES_URL,
  DASHBOARD_EVENTS_URL,
  DASHBOARD_ORDERS_URL,
  DASHBOARD_PRODUCTS_URL,
} from "@/lib/constants";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "BANKAI Project",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Productos",
      url: DASHBOARD_PRODUCTS_URL,
      icon: BoxIcon,
      isActive: true,
      items: [
        {
          title: "Listar Productos",
          url: DASHBOARD_PRODUCTS_URL,
        },
        {
          title: "Añadir Producto",
          url: `${DASHBOARD_PRODUCTS_URL}/create`,
        },
      ],
    },
    {
      title: "Pedidos",
      url: DASHBOARD_ORDERS_URL,
      icon: ClipboardList,
      items: [
        {
          title: "Listar Pedidos",
          url: DASHBOARD_ORDERS_URL,
        },
        {
          title: "Añadir Pedido",
          url: `${DASHBOARD_ORDERS_URL}/create`,
        },
      ],
    },
    {
      title: "Eventos",
      url: DASHBOARD_EVENTS_URL,
      icon: Tickets,
      items: [
        {
          title: "Listar Eventos",
          url: DASHBOARD_EVENTS_URL,
        },
        {
          title: "Añadir Evento",
          url: `${DASHBOARD_EVENTS_URL}/create`,
        },
      ],
    },
    {
      title: "Categorías",
      url: DASHBOARD_CATEGORIES_URL,
      icon: SquareStack,
      isActive: true,
      items: [
        {
          title: "Listar Categorías",
          url: DASHBOARD_CATEGORIES_URL,
        },
        {
          title: "Añadir Categoría",
          url: `${DASHBOARD_CATEGORIES_URL}/create`,
        },
      ],
    },
    {
      title: "Ajustes",
      url: `/${DASHBOARD_BASE_URL}/settings`,
      icon: Settings2,
      items: [
        {
          title: "Logo",
          url: `/${DASHBOARD_BASE_URL}/settings/logo`,
        },
        {
          title: "Banner Principal",
          url: `/${DASHBOARD_BASE_URL}/settings/main-banner`,
        },
        {
          title: "Banner Secundario",
          url: `/${DASHBOARD_BASE_URL}/settings/secondary-banner`,
        },
        {
          title: "Promociones",
          url: `/${DASHBOARD_BASE_URL}/settings/promotions`,
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
