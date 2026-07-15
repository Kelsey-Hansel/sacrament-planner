import Image from "next/image";
import theSavior from "@/public/the_savior.jpeg"

export default function Home() {
  return (
    <section className="p-4">
      <div className="flex justify-center">
        <Image
      src={theSavior}
      alt="A wide photo of the Savior."
      width={1920}
      height={1080}
      className="w-full max-w-4xl h-auto rounded-lg border-2 border-gray-200"
      />
      </div>
      <div>
        <h1 className="text-3xl font-bold p-2">Sacrament Planner Home</h1>
        <p className="p-2">Welcome to the Sacrament Planner. Try it out!</p>
      </div>
    </section>
    
  );
}
