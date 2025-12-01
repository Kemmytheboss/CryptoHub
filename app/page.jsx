import Hero from "./components/Hero";
import RedditFeed from "./components/RedditFeed";
import CoinList from "./components/CoinList";

 function Home() {
  return (
    <div className="space-y-10">
      <Hero/>
      <CoinList/>
      <RedditFeed/>
    </div>
  );
}
export default Home;