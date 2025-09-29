import Greeting from "@/components/about/Greeting";
import OurStory from "@/components/about/OurStory";
import Outline from "@/components/about/Outline";
import Vision from "@/components/about/Vision";

export default function About() {
  return (
    <div className='justify-center min-h-screen px-4 mx-auto mt-10 max-w-7xl '>
      <Greeting />
      <Outline />
      <OurStory />
      <Vision />
    </div>
  );
}