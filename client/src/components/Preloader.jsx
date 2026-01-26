import React from 'react';
import { BouncingDots } from './BouncingDots';

const Preloader = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-colors duration-500">
            {/* Background Blobs for subtle depth */}
            <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-700"></div>

            <div className="relative animate-fade-in">
                <BouncingDots />
            </div>
        </div>
    );
};

export default Preloader;
