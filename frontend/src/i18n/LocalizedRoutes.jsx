import { Children, cloneElement } from 'react';
import { Routes } from 'react-router-dom';
import { getRoutePattern } from './routes';

export default function LocalizedRoutes({ children }) {
  // An optional static locale segment gives both URLs the same route identity,
  // preserving draft state without overriding the location seen by page hooks.
  return (
    <Routes>
      {Children.map(children, (route) => cloneElement(route, {
        path: route.props.path === '*' ? '*' : getRoutePattern(route.props.path),
      }))}
    </Routes>
  );
}
