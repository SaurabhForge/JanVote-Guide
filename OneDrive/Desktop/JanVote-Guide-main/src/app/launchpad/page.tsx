import type { Metadata } from 'next';
import LaunchPadLanding from '@/components/LaunchPadLanding';

export const metadata: Metadata = {
  title: 'LaunchPad | Orbital Management Systems',
  description:
    'The definitive orbital management software for the next generation of space enterprises. Track, optimize, and scale your satellite constellations with aerospace-grade precision.',
};

export default function LaunchPadPage() {
  return <LaunchPadLanding />;
}
