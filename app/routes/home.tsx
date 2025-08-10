import type { Route } from "./+types/home";
import {Link} from "react-router";
import {useFadeIn, domLoaded} from "~/src/effects";
import type { Direction } from "~/src/effects"

import { teams } from "../src/data.json"
const aboutParagraph = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec varius nunc. Aliquam convallis dictum purus, eu porta est suscipit id. Duis sapien ipsum, lacinia eget imperdiet at, posuere et lectus. Quisque maximus augue a lacus maximus consectetur. Quisque scelerisque efficitur tellus quis dignissim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed placerat urna ut arcu pellentesque feugiat. Duis vel mattis felis. Nulla ullamcorper vitae purus vel varius. Mauris vel semper nibh. Nam dictum, turpis et iaculis rutrum, enim nibh laoreet ante, et mattis dui sem vitae mi. Cras dictum nisl ac sem viverra, sit amet bibendum nunc lacinia. Aenean suscipit arcu non elit lobortis, a maximus nisi dignissim. Ut sollicitudin rhoncus velit, eu laoreet velit tempor id. Integer dapibus, lorem at rhoncus efficitur, nisi ex volutpat nisi, vitae porta lorem ligula at nisi. Praesent finibus velit in libero tincidunt blandit nec in turpis.`;
const sponsorMessage = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec varius nunc. Aliquam convallis dictum purus, eu porta est suscipit id. Duis sapien ipsum, lacinia eget imperdiet at, posuere et lectus.";

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

export default function Home() {
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
            <img src="https://placehold.co/600x400" alt="Robtics Students" />
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
