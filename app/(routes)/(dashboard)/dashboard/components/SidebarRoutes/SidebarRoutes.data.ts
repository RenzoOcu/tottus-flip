import { Calendar, Car, Heart, SquareGanttChart } from "lucide-react";

export const dataGeneralSidebar = [
  {
    icon: Car,
    label: "productos disponibles",
    href: "/dashboard",
  },
  {
    icon: Calendar,
    label: "reservacion de productos",
    href: "/reserves",
  },
  {
    icon: Heart,
    label: "frutas favoritas",
    href: "/loved-cars",
  },
];

export const dataAdminSidebar = [
  {
    icon: SquareGanttChart,
    label: "panel de productos",
    href: "/dashboard/admin/cars-manager",
  },
  {
    icon: Calendar,
    label: "frutas reservadas (merma)",
    href: "/dashboard/admin/reserves-admin",
  },
];