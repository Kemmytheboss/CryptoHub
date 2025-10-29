function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} TrendyCryptoVibe. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Follow us on{" "}
          <a href="https://twitter.com/TrendyCryptoVibe" className="text-blue-400 hover:underline">
            Twitter
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;