import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Teams() {
    return <p>Hi Teams</p>;
}