"use client";

import { useEffect, useState } from "react";

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    duration: number;
}

export default function ParticleBackground() {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const generateParticles = () => {
            const newParticles: Particle[] = [];
            for (let i = 0; i < 30; i++) {
                newParticles.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    size: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.3 + 0.1,
                    duration: Math.random() * 15 + 10,
                });
            }
            setParticles(newParticles);
        };

        generateParticles();
    }, []);

    return (
        <div className='fixed inset-0 pointer-events-none overflow-hidden'>
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className='absolute rounded-full bg-white animate-float'
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        opacity: particle.opacity,
                        animationDuration: `${particle.duration}s`,
                        animationDelay: `${Math.random() * 5}s`,
                    }}
                />
            ))}

            {/* Optimized ambient light effects */}
            <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl animate-pulse' />
            <div
                className='absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl animate-pulse'
                style={{ animationDelay: "2s" }}
            />
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/2 rounded-full blur-2xl' />
        </div>
    );
}
