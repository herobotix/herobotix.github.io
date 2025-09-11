import {useEffect, useState} from "react";
import "../src/sponsors.css"
import type {Route} from "../../.react-router/types/app/routes/+types/home";
import {useFadeIn, type Direction, Loader} from "~/src/effects";
import {getSponsors} from "~/routes/home";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Sponsors | Herobotix  " },
    ];
}
const sponsorTitles: Record<string, string> = {
    "platinum": "Platinum Sponsor - Herobotix Victorious",
    "gold": "Gold Sponsor - Herobotix Engineerus",
    "silver": "Silver Sponsor - Herobotix Electrocutus",
    "bronze": "Bronze Sponsor - Herobotix Mechanicus",
    "foundation": "Foundation Sponsor - Herobotix Constructus",
    "bedrock": "Bedrock Sponsor - Herobotix Immobilus",
    "starting": "Starting Sponsor - Herobotix Inceptus"
}
export default function Sponsors() {
    interface Sponsors {
        platinum: string[];
        gold: string[];
        silver: string[];
        bronze: string[];
        foundation: string[];
        bedrock: string[];
        starting: string[];
    }
    
    const [ sponsors, setSponsors ] = useState<Sponsors>({
        platinum: [],
        gold: [],
        silver: [],
        bronze: [],
        foundation: [],
        bedrock: [],
        starting: [],
    });
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        async function checkSponsors() {
            if(localStorage.getItem("sponsors")) {
                console.log("it exists")
                const sponsors = JSON.parse(localStorage.getItem("sponsors") as string);
                const dateGotten = new Date(sponsors.timeStamp)
                delete sponsors.timeStamp
                const now = new Date();
                if(now.getTime() - dateGotten.getTime() >= (60*60*24*1000)) {
                    setSponsors(await getSponsors());
                } else {
                    setSponsors(sponsors);
                }
            } else {
                setSponsors(await getSponsors());
            }
            setLoading(false);
        }
        checkSponsors();
    }, [])
    let index = 0
    return (
        <main>
            <section className={"sponsor-intro"}>
                <h1>Thank you to our sponsors</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </section>
            {loading ? <Loader/> : <></>}
            {Object.entries(sponsors).map(([key, values], i) => {
                    if(values.length > 0) {
                        index++
                    }
                    return values.length > 0 && <Sponsor keyName={key} values={values} index={i} direction={index%2 === 0 ? "left" : "right"}/>
            }
            )}
        </main>
    )
}
type SponsorProps = {
    keyName: string;
    values: string[];
    index: number;
    direction: Direction;
};

function Sponsor({ keyName, values, direction }: SponsorProps) {
    const { ref, isVisible } = useFadeIn(direction);
    return (
        <div key={keyName} ref={ref} id={keyName} className={`sponsor fade-in ${direction} ${isVisible ? "visible" : ""}`}>
            <div className={"title-sponsor"}>
                <h2>{sponsorTitles[keyName]}</h2>
                <img src={"https://placehold.co/400x400"} alt={keyName}/>
            </div>
            <div>
                <ul className={keyName}>
                    {values.map((value, i) => (
                        <li key={i}>{value}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}