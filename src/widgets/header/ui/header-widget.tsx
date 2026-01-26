"use client";

import { HeaderView } from "./header-view";
import { useHeaderNavigation } from "../model/use-header-navigation";

export const Header = () => {
  const { dashboardPath, createQuizPath, isDashboardActive } =
    useHeaderNavigation();

  return (
    <HeaderView
      dashboardPath={dashboardPath}
      createQuizPath={createQuizPath}
      isDashboardActive={isDashboardActive}
    />
  );
};

