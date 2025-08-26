import type { Route } from "./+types/home";
import {Link, useSearchParams} from "react-router";
import {useEffect, useState} from "react";
import "../src/newsletter.css";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Newsletter | Herobotix" },
    ];
}
export default function Newsletter() {
    const [searchParams] = useSearchParams();
    const number = searchParams.get("id") || "0";
    const [newsletterData, setNewsletterData] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            const data = await getNewsletters(parseInt(number));
            setNewsletterData(data);
        }
        fetchData();
    }, [number]);

    if (!newsletterData) {
        return <p>Loading...</p>;
    }

    return (
        <main>
            <article>
                <h1 className={"title"}>{newsletterData.response.newsletter.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: newsletterData.response.newsletter.content }} />
            </article>
            <div className={"newsLinks"}>
            {newsletterData.response.prev ? <Link to={`/newsletter?id=${parseInt(number)-1}`} className={"link"}>Previous</Link> : <p></p>}
            {newsletterData.response.next ? <Link to={`/newsletter?id=${parseInt(number)+1}`} className={"link"}>Next</Link> : <p></p>}
            </div>
        </main>
    );
}

async function getNewsletters(number: Number) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            number: number
        }),
    }
    const response = await fetch("https://getnewsletters-pkgqxun4ba-uc.a.run.app", options);
    const data = await response.json();
    console.log(data);
    return await data;
}