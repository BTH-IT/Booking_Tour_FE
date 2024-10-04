import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

const useActiveDashboardTab = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Memoize the queryParams object
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  // Get the active tab from the URL parameter
  const activeTab = queryParams.get('tab') || 'dashboard';

  // Function to update the URL parameter
  const setActiveTab = useCallback(
    (tab: string) => {
      queryParams.set('tab', tab);
      navigate({ search: queryParams.toString() });
    },
    [navigate, queryParams],
  );

  return { activeTab, setActiveTab };
};

export default useActiveDashboardTab;
