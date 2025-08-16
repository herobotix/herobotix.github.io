import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("teams", "routes/teams.tsx"),
    route("donate", "routes/donate.tsx"),
    route("admin", "routes/admin.tsx"),
    route("newsletter", "routes/newsletter.tsx"),
    route("calendar", "routes/calendar.tsx"),
] satisfies RouteConfig;
