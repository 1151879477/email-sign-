
import React from 'react';
import { FrameStyle } from '../types';

interface AvatarFrameProps {
  src: string | null;
  style: FrameStyle;
  color: string;
  size?: number;
}

const AvatarFrame: React.FC<AvatarFrameProps> = ({ src, style, color, size = 80 }) => {
  const getFrameStyles = () => {
    const base = "rounded-full overflow-hidden flex items-center justify-center transition-all duration-300";
    
    switch (style) {
      case FrameStyle.SOLID:
        return {
          container: `${base}`,
          style: { border: `3px solid ${color}`, width: `${size}px`, height: `${size}px` }
        };
      case FrameStyle.DOUBLE:
        return {
          container: `${base}`,
          style: { border: `4px double ${color}`, width: `${size}px`, height: `${size}px` }
        };
      case FrameStyle.DASHED:
        return {
          container: `${base}`,
          style: { border: `2px dashed ${color}`, width: `${size}px`, height: `${size}px` }
        };
      case FrameStyle.GRADIENT:
        return {
          container: `${base} p-1 bg-gradient-to-tr`,
          style: { 
            backgroundImage: `linear-gradient(to top right, ${color}, #f8fafc)`,
            width: `${size}px`, 
            height: `${size}px` 
          },
          inner: "w-full h-full rounded-full bg-white p-0.5 overflow-hidden"
        };
      case FrameStyle.NONE:
      default:
        return {
          container: `${base}`,
          style: { width: `${size}px`, height: `${size}px` }
        };
    }
  };

  const styles = getFrameStyles();

  return (
    <div className={styles.container} style={styles.style}>
      <div className={styles.inner || "w-full h-full overflow-hidden rounded-full"}>
        {src ? (
          <img src={src} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarFrame;
