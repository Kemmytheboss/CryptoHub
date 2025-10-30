import Hero from "../components/Hero";
import LiveDashboard from "../components/LiveDashboard";
import SocialFeed from "../components/SocialFeed";
import Contact from "../components/Contact";

 function Home() {
  return (
    <div>
      <Hero />
      <LiveDashboard />
      <SocialFeed />
      <Contact />
    </div>
  );
}
export default Home;