import type { Route } from "./+types/home";
import "app/src/donate.css"

export function meta({}: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Donate() {
    return (<main>
        <h2 className={"donateTitle"}>Donate with Zeffy</h2>
        <iframe title='Donation form powered by Zeffy' src='https://www.zeffy.com/en-US/fundraising/d1fb79e4-9976-4254-942f-19880cde50c9' allowTransparency={true}></iframe>
        <section className={"taxCredit"}>
            <h2>Extra Curricular Activity (ECA) Tax Credits for Arizona Residents</h2>
            <div>
            <p className={"intro"}>Under A.R.S. §43-1089.01, an individual may claim a <u>nonrefundable tax credit</u> for making cash contributions to a public school located in Arizona for the support of extracurricular activities.	If a taxpayer has at least as much tax liability as their ECA donation, the donation is essentially a free donation.</p>
            <h3>As an Arizona Resident, you can:</h3>
            <ol>
                <li>Donate up to $200 per individual tax return or $400 per joint tax return by using your ECA tax credit.</li>
                <li>Forward this web address (<a href="http://www.herobotix.com/donate">herobitix.com/donate</a>) to friends and family who reside in Arizona who can also participate in this tax credit option.	They can check out as a guest, so a MySchoolBucks account is NOT required.</li>
            </ol>
            <h3>Click the following link to be directed to the <a target="_blank" href="https://www.myschoolbucks.com/ver2/stores/catalog/getproduct.action?productKey=ZZQZ4M84XYRQN1Z">MySchoolBucks Portal for ECA Tax Credit Donations</a> at Heritage Academy Gateway.</h3>
            <ul>
                <li>Fill in the form like normal.</li>
                <li>When asked if this is for a specific scholar, enter "No".</li>
                <li>Under "Activity/Organization" select "Club", and enter "Herobotix" as the club name.</li>
                <li>Finish the form and select "Buy Now".</li>
                <li>Sign in to your MySchoolBucks account, or continue as a Guest.</li>
                <li>Enter your payment and billing information and select "Place Order".</li>
                <li><i>You should receive an email confirmation of your donation.</i></li>
            </ul>
            <h3>If you prefer to donate by check:</h3>
            <ul>
                <li>Make checks payable to Heritage Academy Gateway.</li>
                <li>Print and fill out the <a href="https://hagateway.com/wp-content/uploads/sites/13/2020/09/Gateway-ECA-Donation-Flier.pdf">Extracurriular Activity Donation Form</a>.</li>
                <li>Under "May give activity and/or student", write "Herobotix" and enter the amount of your donation.</li>
                <li>Mail the form and check directly to the school address:<br/>&nbsp;&nbsp;19705 E. Germann Rd.<br/>&nbsp;&nbsp;Queen Creek, AZ 85142</li>
            </ul>
            </div>
        </section>
    </main>);
}