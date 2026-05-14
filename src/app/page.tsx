import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";

export default function Home() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
        <Hero />
        <About />
        <Projects />
        <Experience />
      </main>
      <Footer />
      <Chat />
    </>
  );
}
