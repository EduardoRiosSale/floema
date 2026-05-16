import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { VideoShowcase } from './components/sections/VideoShowcase';
import { Products } from './components/sections/Products';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <VideoShowcase />
      <Products />
      <Contact />
    </main>
  );
}

export default App;
