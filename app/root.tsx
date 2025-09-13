import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import "./src/effects.css";
//import "./src/home.css";
import "./src/main.css";
import "./src/header.css";
import {Header, MobileHeader} from "~/src/header";

import type { Route } from "./+types/root";
import {useWindowSize} from "~/src/effects";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "icon",
    href: "/images/favicon.ico"
  }
];
export function meta({}: Route.MetaArgs) {
  return [
    { name: "description", content: "Welcome to HEROBOTIX, Heritage Academey Gateway's robotics club. Explore information about teams, sponsors, and upcoming events" },
    { property: "og:image", content: "/public/images/mobile-heritage.png"},
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  const width = useWindowSize();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Herobotix</title>
        <Meta />
        <Links />
      </head>
      <body>
        {width > 450 ? <Header /> : <MobileHeader />}
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
