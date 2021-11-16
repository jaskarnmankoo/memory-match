import * as React from 'react';

import { Link } from 'gatsby';

import SearchEngineOptimization from '../components/SearchEngineOptimization';

export default function NotFound() {
  return (
    <>
      <SearchEngineOptimization title="Oops..." />
      <main className="grid grid-cols-1 gap-4 text-center">
        <h1>Memory Match</h1>
        <h2 className="text-xl bold">Page not found!</h2>
        <p>Oops! The page you are looking for has been removed or relocated.</p>
        <Link to="/" className="underline">
          Go Back
        </Link>
      </main>
    </>
  );
}
