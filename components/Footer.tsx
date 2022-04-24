// import Image from 'next/image' // See: <https://nextjs.org/docs/basic-features/image-optimization>

import "../styles/app.css"

export default function Footer() {
    // constants
    const TWITTER_HANDLE = 'boyluan';
    const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`
  
    // const imagePath = `/assets/twitter-logo.svg`;
  
    return (
      <div>
      <div className="logo-container">
        <div className="icon-text">
        <svg // Chat Icon
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="white"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 8h-1V5a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v12a1 1 0 0 0 .62.92 1 1 0 0 0 1.09-.21l2.81-2.82H8v1.44a3 3 0 0 0 3 3h6.92l2.37 2.38A1 1 0 0 0 21 22a.84.84 0 0 0 .38-.08A1 1 0 0 0 22 21V11a3 3 0 0 0-3-3ZM8 11v1.89H6.11a1 1 0 0 0-.71.29L4 14.59V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3h-5a3 3 0 0 0-3 3Zm12 7.59-1-1a1 1 0 0 0-.71-.3H11a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v7.59Z"
                // fill="#000"
            />
        </svg>

        <a className="twitter-text"
          href={TWITTER_LINK}
          target='_blank'
          rel='noreferrer'
        >
          <strong>{`made by: @${TWITTER_HANDLE}`}</strong>
          
        </a>
        </div>
      </div>
      </div>
    )
  }
  