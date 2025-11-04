import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";

 function Home() {
  return (
    <main className="bg-gray-950 text-white">
      <section>
        <Hero/>
        <About />
        <Contact />
      </section>
    </main>
  );
}
export default Home;