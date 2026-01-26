'use client';

import { usePathname } from 'next/navigation';
import { paths } from '@/shared/config';

export const useHeaderNavigation = () => {
  const pathname = usePathname();
  const isDashboardActive = pathname === paths.dashboard;

  return {
    dashboardPath: paths.dashboard,
    createQuizPath: paths.quizEdit,
    isDashboardActive,
  };
};
