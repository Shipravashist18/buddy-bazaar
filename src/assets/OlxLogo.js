import React from 'react';

export default function OlxLogo() {
    return (
        <svg
            width="150px"  // Adjusted width for the logo
            height="60px"  // Adjusted height to accommodate two lines of text
            viewBox="0 0 150 60"
            data-aut-id="icon"
            xmlns="http://www.w3.org/2000/svg"
        >
            <text
                x="0"
                y="25"  // Position for "Buddy"
                fontFamily="Arial, Helvetica, sans-serif"
                fontSize="25"  // Font size
                fill="navy"  // Navy blue color
                fontWeight="bold"  // Bold font
            >
                Buddy
            </text>
            <text
                x="0"
                y="50"  // Position for "Bazaar" below "Buddy"
                fontFamily="Arial, Helvetica, sans-serif"
                fontSize="25"  // Font size
                fill="navy"  // Navy blue color
                fontWeight="bold"  // Bold font
            >
                Bazaar
            </text>
        </svg>
    );
}

