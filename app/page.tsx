import Image from "next/image";
import theSavior from "@/public/the_savior.jpeg"

export default function Home() {
  return (
    <section>
      <Image
      src={theSavior}
      alt="A wide photo of the Savior."
      width={1920}
      height={1080}
      className="w-full max-w-4xl h-auto rounded-lg border-2 border-gray-200"
      />
      <div>
        <h1 className="text-3xl font-bold">Sacrament Planner Home</h1>
        <p className="text-gray-600">Welcome to the Sacrament Planner. Try it out!</p>
      </div>
    </section>
    
  );
}
