import type { IconSvgElement } from "@hugeicons/react";

export interface NavItem {
  id: string;
  label: string;
  icon: IconSvgElement;
  render: (nav: (id: string) => void) => React.ReactNode;
}

export interface NavGroup {
  group: string;
  items: NavItem[];
}
