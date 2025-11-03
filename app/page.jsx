import Hero from "./trading/components/Hero";
import LiveDashboard from "./trading/components/LiveDashboard";
import SocialFeed from "./trading/components/SocialFeed";
import Contact from "./trading/components/Contact";

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