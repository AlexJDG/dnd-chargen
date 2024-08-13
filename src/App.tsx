import { ModeToggle } from "@/components/mode-toggle";

function App() {
    return (
        <main className="container py-5">
            <header className="flex gap-5">
                <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight md:text-4xl">
                    D&D Backstory Generator
                </h1>
                <ModeToggle />
            </header>
        </main>
    );
}

export default App;
