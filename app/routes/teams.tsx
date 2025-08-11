import type { Route } from "./+types/home";

import "../src/teams.css";
import { teams } from "../src/data.json";

import {useFadeIn, domLoaded, useWindowSize} from "~/src/effects";
import type { Direction } from "~/src/effects"
import {Link} from "react-router";
import {useEffect, useState} from "react";

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
    const intro = "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.";
    const width = useWindowSize();
    const  [selectedTeam, setSelectedTeam ] = useState(0);
    return ( <main>
        <TeamIntro intro={intro} />
        {width > 450 ? (
        teams.map((team, index) => {
            return <TeamTemplate team={team} direction={index%2 === 0 ? "left" : "right"} setSelectedTeam={setSelectedTeam}/>
        })
        ) : (
            <TeamTemplate team={teams[selectedTeam]} direction={"left"} fade={false} setSelectedTeam={setSelectedTeam}/>
        )}
    </main>);
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

export function TeamTemplate({team, direction = "left", fade = true, setSelectedTeam} : {team :Team, direction? : Direction, fade? : boolean, setSelectedTeam: React.Dispatch<React.SetStateAction<number>>;}) {
    const { ref, isVisible } = useFadeIn(direction);

    function changeTeam(dir: "left" | "right") {
        setSelectedTeam(prev => {
            if (dir === "left") {
                return prev > 0 ? prev - 1 : teams.length - 1; // wrap around left
            } else {
                return (prev + 1) % teams.length; // wrap around right
            }
        });
    }
    return(
        <section className={"teamBio"} id={team.name}>
            <section ref = {ref} className={`${fade ? "fade-in" : ""} ${direction} ${isVisible ? "visible" : ""}`}>
                <div>
                    <h2>{team.name}</h2>
                    <p>{team.descriptionLong}</p>

                    <Link to={team.link} className={"teamLink"}>{team.name} Website</Link>
                </div>
                <div className={"image"}>
                <img src={team.image} alt={`${team.name} image`}/>
                    {!fade ?
                        (<div className="arrows">
                            <svg onClick={() => {changeTeam("left")}} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="Arrow / Caret_Left_SM"> <path id="Vector" d="M13 15L10 12L13 9" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            <svg onClick={() => {changeTeam("right")}} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="Arrow / Caret_Left_SM"> <path id="Vector" d="M13 15L10 12L13 9" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        </div>)
                        : null}
                </div>
            </section>
        </section>
    )
}