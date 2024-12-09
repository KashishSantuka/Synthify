"use client";
import Image from "next/image";

export const Logo = () => {
  return (
    <div className="relative w-12 h-12 mr-4">
      <Image
        fill
        alt="Logo"
        src="/Logo.png" // Ensure the image path is correct
        style={{ objectFit: "cover" }} // Optional: ensures the image covers the area
      />
    </div>
  );
};

export default Logo;

// import Image from "next/image";

// export const Logo = () => (
//   <Image
//     src="/logo.png"
//     alt="Synthify Logo"
//     fill
//     sizes="(max-width: 768px) 50px, (max-width: 1200px) 75px, 100px"
//     priority
//   />
// );
