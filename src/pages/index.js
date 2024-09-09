import { useState } from 'react';
import AboutMe from '@/components/AboutMe';
import SkillsChart from '@/components/SkillsChart';
import ParallaxEffect from '@/components/ParallaxEffect';
import TwinklingStars from '@/components/TwinklingStars';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';


export default function Home ()
{
    const [ activeSection, setActiveSection ] = useState();

    return (

        <>
            <TwinklingStars /> {/* Twinkling Stars Background */ }
            <ParallaxEffect activeSection={ activeSection } setActiveSection={ setActiveSection } /> {/* Parallax Effect */ }
            <CustomCursor /> {/* Custom cursor Component */ }

            <Navigation activeSection={ activeSection } /> {/* Navbar Component */ }

            {/* Sections */ }
            <AboutMe />
            <SkillsChart activeSection={ activeSection } />

        </>
    );
}
