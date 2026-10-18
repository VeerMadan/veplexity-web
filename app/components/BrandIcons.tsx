import React from "react";

export function DiscordLogo({ className = "w-5 h-5", fill = "currentColor" }: { className?: string; fill?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 127.14 96.36" 
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Discord"
    >
      <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
    </svg>
  );
}

/**
 * Official Discord Verified Bot Checkmark Badge
 * Blue scalloped polygon with white checkmark
 */
export function DiscordVerifiedBadge({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Verified Bot"
      title="Verified Discord Application"
    >
      <path
        d="M7.436.425a.8.8 0 0 1 1.128 0l1.242 1.2a.8.8 0 0 0 .744.204l1.696-.347a.8.8 0 0 1 .927.652l.278 1.708a.8.8 0 0 0 .548.643l1.64.55a.8.8 0 0 1 .521 1.008l-.517 1.65a.8.8 0 0 0 .193.818l1.22 1.223a.8.8 0 0 1 0 1.132l-1.22 1.223a.8.8 0 0 0-.193.818l.517 1.65a.8.8 0 0 1-.52 1.008l-1.641.55a.8.8 0 0 0-.548.643l-.278 1.708a.8.8 0 0 1-.927.652l-1.696-.347a.8.8 0 0 0-.744.204l-1.242 1.2a.8.8 0 0 1-1.128 0l-1.242-1.2a.8.8 0 0 0-.744-.204l-1.696.347a.8.8 0 0 1-.927-.652l-.278-1.708a.8.8 0 0 0-.548-.643l-1.64-.55a.8.8 0 0 1-.521-1.008l.517-1.65a.8.8 0 0 0-.193-.818L.425 8.564a.8.8 0 0 1 0-1.132l1.22-1.223a.8.8 0 0 0 .193-.818L1.32 3.74a.8.8 0 0 1 .52-1.008l1.641-.55a.8.8 0 0 0 .548-.643l.278-1.708a.8.8 0 0 1 .927-.652l1.696.347a.8.8 0 0 0 .744-.204L7.436.425z"
        fill="#5865F2"
      />
      <path
        d="M11.5 5.25 6.7 10.05 4.5 7.85"
        stroke="#ffffff"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Official Discord App Tag pill (like Discord's [APP] badge)
 */
export function DiscordAppPill({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#5865F2] text-white text-[10px] font-mono font-bold uppercase tracking-wider leading-none shadow-sm ${className}`}>
      <DiscordVerifiedBadge className="w-3 h-3" />
      <span>APP</span>
    </span>
  );
}

export function BmcLogo({ className = "w-5 h-5", fill = "currentColor" }: { className?: string; fill?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Buy Me a Coffee"
    >
      <path d="M20.216 6.415l-.132-.666c-.119-.597-.388-1.156-.78-1.619-.396-.465-.91-.818-1.488-1.02-.601-.21-1.241-.284-1.871-.219-.738.076-1.458.337-2.094.759-1.229.813-2.138 2.029-2.585 3.454-.158.503-.264 1.021-.316 1.545-.031.312-.038.627-.021.941.036.657.194 1.303.468 1.905.319.702.774 1.332 1.334 1.848.601.554 1.315.968 2.096 1.215.744.236 1.536.309 2.315.213.784-.096 1.534-.378 2.18-.818.665-.453 1.203-1.066 1.564-1.782.352-.698.513-1.482.469-2.271-.044-.793-.292-1.558-.72-2.222l-.459-.482zm-3.649 5.373c-.482.264-1.042.368-1.587.294-.526-.071-.999-.333-1.341-.734-.326-.381-.497-.878-.485-1.387.012-.511.205-.999.549-1.365.368-.391.868-.619 1.396-.638.544-.02 1.077.164 1.487.514.417.357.676.866.721 1.417.045.549-.12 1.094-.461 1.526-.089.112-.186.237-.279.373zM2.87 21.055h12.569c.813 0 1.553-.339 2.08-.887.527-.549.852-1.309.852-2.146V8.125H1.47v9.897c0 .837.325 1.597.852 2.146.527.548 1.267.887 2.08.887z" />
    </svg>
  );
}

export function BmcCupIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      aria-label="Coffee Cup"
    >
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  );
}
