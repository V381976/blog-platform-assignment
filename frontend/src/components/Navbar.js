import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-8 py-4">
      <div className="max-w-6xl mx-auto flex gap-6">

        <Link href="/" className="hover:text-gray-300">
          Home
        </Link>

        <Link
          href="/category/Development"
          className="hover:text-gray-300"
        >
          Categories
        </Link>

        <Link
          href="/tag/React"
          className="hover:text-gray-300"
        >
          Tags
        </Link>

        <Link
          href="/author/PUT_AUTHOR_ID_HERE"
          className="hover:text-gray-300"
        >
          Author
        </Link> 
        <Link href="/About" 
         className="hover:text-gray-300"
              >About</Link>
            <Link href="/Contact" 
             className="hover:text-gray-300"
             >Contact</Link>

      </div>
    </nav>
  );
};

export default Navbar;