import {signInWithEmailAndPassword} from "@firebase/auth";
import { auth } from "~/src/firebase";
import {getFunctions, httpsCallable} from "@firebase/functions";
import {useEffect, useState} from "react";
import "~/src/admin.css";
import {useWindowSize} from "~/src/effects";
export default function Admin() {
    const [token, setToken] = useState<string | null>(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState("");
    const functions = getFunctions();

    useEffect(() => {
        // Only run in the browser
        if (typeof window !== "undefined") {
            const savedToken = localStorage.getItem("adminToken");
            setToken(savedToken);
        }
    }, []);

    useEffect(() => {
        if (!token) return;
        async function checkToken() {
            const response = await verifyLogin(token);
            setLoggedIn(response);
        }

        checkToken();
    }, [token]);

    const loginCheck = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;
        const errormsg = form.elements.namedItem("errormsg");
        console.log(email, password);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const token = await userCredential.user.getIdToken();
            console.log(token);
            console.log("Logged in:", userCredential.user);
            localStorage.setItem("adminToken", token);
            setToken(token);
        } catch (error) {
            console.error("Login failed", error);
            setError("Incorrect Email or Password");
        }
    }
    
    const width = useWindowSize();
    return (
        <>
            {loggedIn ? (
                <div>
                    <h2>Welcome, Admin!</h2>
                </div>
            ) : (
                <main className="adminLogin">
                <form onSubmit={loginCheck} className="login">
                    <h1>Welcome Admin</h1>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" name="email" required />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" name="password" required />
                    </div>
                    <button type="submit">Login</button>
                    <p className={"error"}>{error}</p>
                </form>
                </main>
            )}
        </>
    );
}

const verifyLogin = async (token: string | null) => {
    try {
        const response = await fetch("https://verifylogin-pkgqxun4ba-uc.a.run.app", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Admin verification response:", data);
        return await data.admin; // true or false
    } catch (error) {
        console.error("Error verifying login:", error);
        return false;
    }
};