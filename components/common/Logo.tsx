import React from 'react';

interface LogoProps {
    className?: string;
}

/**
 * AprovApp Logo Component
 * Renders the brand icon: A gradient rounded square with a stylized checkmark box inside.
 */
export const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            fill="none"
            className={className}
            aria-label="AprovApp Logo"
        >
            <defs>
                <linearGradient id="logoGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4f46e5" /> {/* indigo-600 */}
                    <stop offset="1" stopColor="#9333ea" /> {/* purple-600 */}
                </linearGradient>
            </defs>
            
            {/* Background: Rounded Square with Gradient */}
            <rect width="100" height="100" rx="25" fill="url(#logoGradient)" />
            
            {/* Inner White Box Outline (Stylized) */}
            <path 
                d="M30 40 V30 H70 V70 H40" 
                stroke="white" 
                strokeWidth="6" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
            />
            
            {/* Checkmark */}
            <path 
                d="M35 55 L50 70 L80 35" 
                stroke="white" 
                strokeWidth="8" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
            />
        </svg>
    );
};