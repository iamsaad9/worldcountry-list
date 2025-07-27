import CountrySection from "./components/CountrySection";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden flex flex-col items-center">
      <div className="relative min-w-[1024px] w-full">
        <img
          src="/resources/hero-image.jpg"
          className="block w-auto min-w-full h-auto"
          alt="Hero"
        />
        <div className="absolute inset-0 flex items-center gap-2 justify-center">
          <img src="/resources/Logo.svg" className="size-50 md:size-60" />
        </div>
      </div>

      <CountrySection />
    </div>
  );
}
