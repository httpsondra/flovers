import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Story from "@/components/Story";
import Collection from "@/components/Collection";
import Gallery from "@/components/Gallery";
import Services from "@/components/Services";
import DeliveryBand from "@/components/DeliveryBand";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-paper text-ink">
      <Header />
      <Hero />
      <Marquee />
      <Story />
      <Collection />
      <Gallery />
      <Services />
      <DeliveryBand />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  );
}
