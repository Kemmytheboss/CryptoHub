function NavBar() {
  return (
    <nav className="bg-purple-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-lg font-bold">TrendyCryptoVibe</a>
        <div className="space-x-4">
          <a href="/" className="text-white hover:text-blue-300">Home</a>
          <a href="/trends" className="text-white hover:text-blue-300">Trends</a>
          <a href="/about" className="text-white hover:text-blue-300">About</a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;