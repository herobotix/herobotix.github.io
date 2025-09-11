import type { Route } from "./+types/home";
import {Link, useSearchParams} from "react-router";
import {useEffect, useState} from "react";
import DOMPurify from "dompurify"
import "../src/newsletter.css";
import { Loader } from "~/src/effects";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Newsletter | Herobotix" },
    ];
}
export default function Newsletter() {
    const [searchParams] = useSearchParams();
    const number = searchParams.get("id") || "0";
    const [newsletterData, setNewsletterData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const data = await getNewsletters(parseInt(number));
            setNewsletterData(data);
        }

        async function getNewsletters(number: Number) {
            setLoading(true);
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
            setLoading(false)
            return await data;
        }
        
        fetchData();
    }, [number]);

    if (!newsletterData) {
        return (<main className={"newsletterMain"}>
            <Loader/>
        </main>)
    }

    return (
        <main className="newsletterMain">
            <article>
                <h1 className={"title"}>{newsletterData.response.newsletter.title}</h1>
                <SafeContent html={newsletterData.response.newsletter.content}/>
            </article>
            <div className={"newsLinks"}>
            {newsletterData.response.prev ? <Link to={`/newsletter?id=${parseInt(number)-1}`} className={"link"}>Previous</Link> : <p></p>}
            {newsletterData.response.next ? <Link to={`/newsletter?id=${parseInt(number)+1}`} className={"link"}>Next</Link> : <p></p>}
            </div>
        </main>
    );
}

function SafeContent({ html }: { html: string }) {
    const clean = DOMPurify.sanitize(html)

    return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}