import Herosection from '../Sections/Herosection';
import Section2 from '../Sections/Section2';
import Section3 from '../Sections/Section3';
import Section4 from '../Sections/Section4';

const Home = () => {
  return (
    <main style={{ background: 'var(--bg)' }}>
      <Herosection />
      <Section2 />
      <Section3 />
      <Section4 />
    </main>
  );
};

export default Home;