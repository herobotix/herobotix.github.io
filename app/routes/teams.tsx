import type { Route } from "./+types/home";

import "../src/teams.css";
import { teams } from "../src/data.json";

import {useFadeIn, domLoaded} from "~/src/effects";
import type { Direction } from "~/src/effects"
import {Link} from "react-router";

type Team = {
    name: string;
    descriptionShort: string;
    descriptionLong: string;
    link: string;
    image: string;
}
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Teams | Herobotix" },
    ];
}

export default function Teams() {
    const intro = "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
    return <main>
        <TeamIntro intro={intro} />
        {teams.map((team, index) => {
            return <TeamTemplate team={team} direction={index%2 === 0 ? "left" : "right"}/>
        })}
    </main>;
}
    function TeamIntro({intro} : {intro : string}) {
    const { ref, isVisible } = useFadeIn("up");
    return (
        <section className={"intro"}>
            <section ref = {ref} className={`fade-in up ${isVisible ? "visible" : ""}`}>
                <h1>Our Teams</h1>
                <p>{intro}</p>
            </section>
        </section>
    )
}

export function TeamTemplate({team, direction = "left"} : {team :Team, direction? : Direction}) {
    const { ref, isVisible } = useFadeIn(direction);
    return(
        <section className={"teamBio"} id={team.name}>
            <section ref = {ref} className={`fade-in ${direction} ${isVisible ? "visible" : ""}`}>
                <div>
                    <h2>{team.name}</h2>
                    <p>{team.descriptionLong}</p>
                    <Link to={team.link} className={"teamLink"}>{team.name} Website</Link>
                </div>
                <img src={team.image} alt={`${team.name} image`}/>
            </section>
        </section>
    )
}