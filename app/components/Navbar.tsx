'use client';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../assets/logo.png';

const Navbar = () => {
 
  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-4 sm:px-8">
     
      <div className="navbar-start">
        <Image src={logo} alt="FITLOG Logo" width={32} height={32} />
        <Link href="/" className="btn btn-ghost text-xl font-black uppercase">
           FITLOG
        </Link>
      </div>


      <div className="navbar-center flex gap-2">
        <Link href="/" className="btn btn-sm btn-ghost rounded-full">
          Workouts
        </Link>
        <Link href="/my-plan" className="btn btn-sm btn-ghost rounded-full">
          My Plan
        </Link>
      </div>


      <div className="navbar-end flex gap-2">
        <Link href="/my-plan" className="btn btn-primary btn-xs sm:btn-sm rounded-full">
          Plan
        </Link>
        <Link href="/my-plan" className="btn btn-outline btn-xs sm:btn-sm rounded-full">
          Saved
        </Link>
      </div>
    </div>
  );
};

export default Navbar;