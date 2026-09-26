import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f1015] text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
      <h1 className="text-6xl sm:text-8xl font-black text-lime-400">404</h1>
      <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-wide">PAGE NOT FOUND</h2>
      <p className="text-gray-400 text-sm sm:text-base max-w-md">
        The lift or page you are looking for doesn't exist or has been moved.
      </p>
      <div className="pt-4">
        <Link
          href="/"
          className="bg-lime-400 text-black font-extrabold px-6 py-3 rounded-full uppercase tracking-wider hover:bg-lime-300 transition-colors"
        >
          Return to Library
        </Link>
      </div>
    </div>
  );
}