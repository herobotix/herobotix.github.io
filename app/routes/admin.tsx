import {signInWithEmailAndPassword} from "@firebase/auth";
import { auth } from "~/src/firebase";
import {getFunctions, httpsCallable} from "@firebase/functions";
import {useEffect, useState} from "react";
import "~/src/admin.css";
import {useWindowSize} from "~/src/effects";
import {EditorElement} from "~/src/editor";
import { TextStyleKit } from '@tiptap/extension-text-style'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import juice from "juice"

import StarterKit from '@tiptap/starter-kit'
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
                <main>
                    <AdminContent/>
                </main>
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
function AdminContent() {
    const [ title, setTitle] = useState("New Newsletter");
    const editor = useEditor({
        extensions: [TextStyleKit, StarterKit],
        content: `
                <p>New Newsletter</p>
            `,
    });
    
    const handleSend = () => {
        if(!editor) return;
        
        const html = juice.inlineContent(editor.getHTML(), editorCSS);
        //download
/*        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = 'newsletter.html'
        document.body.appendChild(a)
        a.click();*/
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',  // important!
        },
        body: JSON.stringify({
            title: title,
            content: html,
        }),
        }
        fetch("https://sendnewsletter-pkgqxun4ba-uc.a.run.app", options);
/*        document.body.removeChild(a)
        URL.revokeObjectURL(url)*/
    }
    const [ confirm, setConfirm ] = useState(false);
    function confirmSend() {
        setConfirm (!confirm);
    }
    
    return (
        <>
            <div className={"titleSection"}>
                <label htmlFor={"title"}>Title: </label>
                <input type={"text"} name={"title"} value={title} onChange={(e) => {setTitle(e.target.value)}}></input>
            </div>
        <EditorElement editor = {editor}/>
        <div>
            <button onClick={() => {confirmSend()}} className={"send"}>Send</button>
            <button onClick={() => {handleSend()}} className={`${confirm ? "" : "hide"} confirm`}>Confirm</button>
        </div>
        <AddSub />
        </>
    )
}
function AddSub() {
    const [sub , setSub ] = useState("");
    const [error, setError] = useState("");
    const [ fade, setFade ] = useState(false);
    const addSubscriber = (sub : string ) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: sub
            }),
        }
        fetch("https://addsubscriber-pkgqxun4ba-uc.a.run.app", options);
        setError("Email Added!");
        setFade(false);
        setTimeout(() => setFade(true), 50);
        setTimeout(() => {
            setError("");
            setFade(false);
        }, 3050);
    }
    return (
        <form className={"addSub"} onSubmit={(e) => { e.preventDefault(); addSubscriber(sub);}}> 
            <label htmlFor={"sub"}>Add Subscriber: </label>
            <input name={"sub"} type={"email"} placeholder={"------@---.---"} onChange={(e) => {setSub(e.target.value)}} value={sub}></input>
            <button type={"submit"}>Submit</button>
            <p className={`error ${fade ? "fade-out" : ""}`}>{error}</p>
        </form>
    )
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


const editorCSS = `
  * {
    font-family: sans-serif;
}
 :first-child {
    margin-top: 0;
}

  ul,   ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;
}

  ol li p,   ul li p {
    margin-top: 0.25em;
    margin-bottom: 0.25em;
}
  h1,   h2,   h3,   h4,   h5,   h6 {
    line-height: 1.1;
    margin-top: 2.5rem;
    text-wrap: pretty;
}
  h1,   h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
}

  h1 {
    font-size: 2rem;
}
  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #EC252BFF;
    
}
  h3 {
    font-size: 1.1rem;
    color: #5E7DB5FF;
}

  h4,   h5,   h6 {
    font-size: 1rem;
}
  blockquote {
    border-left: 3px solid rgb(150, 150, 150);
    margin: 1.5rem 0;
    padding-left: 1rem; 
}

  hr {
    border: none;
    border-top: 1px solid rgb(200, 200, 200);
    margin: 2rem 0;
}
`