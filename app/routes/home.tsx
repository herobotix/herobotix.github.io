import type { Route } from "./+types/home";
import {Link} from "react-router";
import {useFadeIn, domLoaded, Loader} from "~/src/effects";
import type { Direction } from "~/src/effects"
import "app/src/home.css"

import { teams } from "../src/data.json"
import {useEffect} from "react";
const aboutParagraph = "We are the Herobotix robotics club. We love to push the boundaries of the minds of our students and each other. Each year we participate in The First Tech Challenge (FTC). FTC creates new challenges every school year which include mechanical, coding, and even marketing challenges to race to the top and mark themselves as the most advanced team. We strive to follow the FTC motto of Gracious Professionalism, winning graciously and generously aiding other teams when their robots break down. We are the Herobotix Robotics club.";
const sponsorMessage = "We can't do this without your support! Donating helps Herobotix buy parts, make swag, and attend competitions. Any amount helps, so donate today to help the future of Herobotix.";

type TeamProps = {
  team: {
    name: string;
    link: string;
    image: string;
    descriptionShort: string;
    descriptionLong: string;
  };
};
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home | Herobotix  " },
  ];
}

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
];

export async function getSponsors() {
    const response = await fetch("https://getsponsors-pkgqxun4ba-uc.a.run.app");
    const data = await response.json()

    interface Sponsors {
        platinum: string[];
        gold: string[];
        silver: string[];
        bronze: string[];
        foundation: string[];
        bedrock: string[];
        starting: string[];
        timeStamp: Date;
    }

    const sponsors: Sponsors = {
        platinum: [],
        gold: [],
        silver: [],
        bronze: [],
        foundation: [],
        bedrock: [],
        starting: [],
        timeStamp: new Date()
    };

    data.response.forEach((sponsor: { tier: keyof Omit<Sponsors, "timeStamp">; name: string }) => {
        sponsors[sponsor.tier].push(sponsor.name);
    });
    
    
    localStorage.setItem("sponsors", JSON.stringify(sponsors));
    return sponsors;
}
export default function Home() {
    useEffect(() => {
        if(localStorage.getItem("sponsors")) {
            const sponsors = JSON.parse(localStorage.getItem("sponsors") as string);
            const dateGotten = new Date(sponsors.timeStamp)
            const now = new Date();
            if(now.getTime() - dateGotten.getTime() >= (60*60*24*1000)) {
                getSponsors();
            }
        } else {
            getSponsors();
        }
    })
  return (
      <main>
        <About/>
        <TeamsList direction={"up"}/>
        <Sponsor direction={"left"}/>
      </main>
  );
}

function About() {
    const ref = domLoaded("visible")
  return (
    <section className={"about"}>
        <section ref={ref} className={"fade-in right"}>
            <img src="/images/IMG_9211.JPG" alt="Robtics Students" />
            <div>
                <h1>About Us</h1>
                <p>{aboutParagraph}</p>
            </div>
        </section>
    </section>
  )
}
function TeamsList({direction = "right" }: {direction?: Direction }) {
    const { ref, isVisible} = useFadeIn(direction);
  return (
      <section className="teams">
          <section
                   ref={ref}
                   className={`fade-in ${direction} ${isVisible ? "visible" : ""}`}>
              
            <h1>Our Teams</h1>
            <div>
              {teams.map((team, index) => <Team team={team} key={index} />)}
            </div>
          </section>
      </section>
  )
}

function Team({ team }: TeamProps) {
  return (
      <Link to={team.link} className="teamSection">
        <img src={team.image} alt="{team.name} logo" />
        <h2>{team.name}</h2>
        <p>{team.descriptionShort}</p>
      </Link>
  )
}

function Sponsor({direction = "left"} : {direction?: Direction}) {
    const { ref, isVisible } = useFadeIn(direction);
    return (
        <section className={`sponsors`}>
            <section ref={ref} className={`fade-in ${direction} ${isVisible ? "visible" : ""}`}>
                <div>
                    <h1>Support Us</h1>
                    <p className={"mobileTag"}>We can't Do this without Support</p>
                    <Link to={"/donate"} className={"button"}>Learn More</Link>
                </div>
                <p>{sponsorMessage}</p>
            </section>
        </section>
    )
}
