import * as React from 'react';

import { Link } from 'gatsby';

import SearchEngineOptimization from '../components/common/SearchEngineOptimization';

import { ROUTES } from '../utils';

/** Renders when a user navigates to an invalid route */
export default function NotFound(): JSX.Element {
  return (
    <>
      <SearchEngineOptimization title="Oops..." />
      <main className="grid grid-cols-1 gap-4 text-center">
        <h1 className="bold">Memory Match</h1>
        <h2 className="bold text-xl">Page not found!</h2>
        <p>Oops! The page you are looking for has been removed or relocated.</p>
        <Link className="underline" to={ROUTES.HOME}>
          Go Back
        </Link>
      </main>
    </>
  );
}
