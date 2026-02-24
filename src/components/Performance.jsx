import { useRef } from 'react';
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { performanceImages, performanceImgPositions } from '../constants'
import { useMediaQuery } from 'react-responsive';

const Performance = () => {

    const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
    const sectionRef = useRef(null);

    useGSAP(() => {
        // Text animation: fade in and move up as it enters view
        gsap.fromTo(".content p",
            { opacity: 0, y: 10 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.content p',
                    start: "top bottom",
                    end: "center center",
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            }
        );

        const tl = gsap.timeline({
            defaults: { ease: "power1.inOut", duration: 2, overwrite: "auto" },
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom center",
                scrub: 2.5,
                invalidateOnRefresh: true,
            },
        });

        // Prepare images and animate to their final positions from constants at time 0
        performanceImgPositions.forEach((pos) => {
            if (pos.id === 'p5') return;

            const toVars = {};

            // On mobile, spread them out differently so they don't pile up
            if (isMobile) {
                // Adjust base positions slightly for mobile view
                if (pos.left !== undefined) toVars.left = `${pos.left + (pos.left > 10 ? -10 : 10)}%`;
                if (pos.right !== undefined) toVars.right = `${pos.right + (pos.right > 10 ? -10 : 10)}%`;
                if (pos.bottom !== undefined) toVars.bottom = `${pos.bottom}%`;
            } else {
                // Desktop positions
                if (pos.left !== undefined) toVars.left = `${pos.left}%`;
                if (pos.right !== undefined) toVars.right = `${pos.right}%`;
                if (pos.bottom !== undefined) toVars.bottom = `${pos.bottom}%`;
            }
            if (pos.transform !== undefined) toVars.transform = pos.transform;

            tl.to(`.${pos.id}`, toVars, 0);
        });

    }, { scope: sectionRef, dependencies: [isMobile] });

    return (
        <section id="performance" ref={sectionRef}>
            <h2>Next-level graphics performance. Game on.</h2>

            <div className="wrapper">
                {performanceImages.map((item, index) => (
                    <img key={index} className={item.id} src={item.src} alt={item.alt || `Performance image ${index + 1}`} />
                ))}
            </div>

            <div className="content">
                <p>Run graphics-intensive workflows with a responsiveness that keep up with your imagination. the M4 family of chips features a GPU with a second-generation hardware-accelerated ray tracing engine that renders images faster, so
                    {' '}<span className="text-white">
                        gaming feels more immersive and realistic than ever.
                    </span>{' '}
                    And Dynamic Caching optimizes fast on-chip memory to dramatically increase average GPU utilization -- driving a huge performance boost for the most demanding pro apps and games.</p>
            </div>
        </section>
    )
}

export default Performance