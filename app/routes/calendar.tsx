import "../src/calendar.css";

export default function Calendar() {
    return (
        <main>
            <iframe className="webCalendar"
                    src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%230066dd&ctz=America%2FPhoenix&showTitle=0&showPrint=1&showTabs=1&showCalendars=0&showTz=1&src=Y182ZmMxNDBmODZkODY5N2ZhOGFhZTZmZjM0ZjAwMmUzNjUyMTVjNDIzNjMxNzhlYTQ2MzdkN2QyZDU1YmU0NDJkQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%230077ee"
                    frameBorder="0" scrolling="no"></iframe>
        </main>
    )
}