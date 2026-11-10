import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getBasePath } from '../i18n/routes';

export default function ScrollToTopOnMount() {
  const { pathname } = useLocation();
  const pagePath = getBasePath(pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pagePath]);

  return null;
}
