import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Products } from './components/sections/Products';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <main className="bg-black min-h-screen font-sans">
      <Navbar />
      <Hero />
      <About />
      <Products />
      <Contact />
    </main>
  );
}

export default App;