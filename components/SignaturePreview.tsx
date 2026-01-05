
import React from 'react';
import { UserInfo, DesignConfig, SignatureStyle } from '../types';
import { ICONS } from '../constants';
import AvatarFrame from './AvatarFrame';

interface Props {
  userInfo: UserInfo;
  config: DesignConfig;
}

const SignaturePreview: React.FC<Props> = ({ userInfo, config }) => {
  const { accentColor, textColor, style, frame, frameColor } = config;

  const renderModern = () => (
    <div className="flex items-center gap-8 min-w-[450px]">
      <AvatarFrame src={userInfo.avatar} style={frame} color={frameColor} size={100} />
      <div className="flex flex-col border-l-2 pl-8 py-2" style={{ borderColor: accentColor }}>
        <h3 className="text-xl font-bold mb-0.5" style={{ color: textColor }}>{userInfo.name || 'Your Name'}</h3>
        <p className="text-sm font-medium opacity-70 mb-3" style={{ color: textColor }}>{userInfo.title} @ {userInfo.company}</p>
        
        <div className="grid grid-cols-1 gap-1.5">
          {userInfo.phone && (
            <div className="flex items-center gap-2 text-xs">
              <span style={{ color: accentColor }}>{ICONS.phone}</span>
              <span style={{ color: textColor }}>{userInfo.phone}</span>
            </div>
          )}
          {userInfo.email && (
            <div className="flex items-center gap-2 text-xs">
              <span style={{ color: accentColor }}>{ICONS.email}</span>
              <span style={{ color: textColor }}>{userInfo.email}</span>
            </div>
          )}
          {userInfo.website && (
            <div className="flex items-center gap-2 text-xs">
              <span style={{ color: accentColor }}>{ICONS.website}</span>
              <span style={{ color: textColor }}>{userInfo.website}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderClassic = () => (
    <div className="flex flex-col gap-4 min-w-[400px]">
      <div className="flex items-center gap-6">
        <AvatarFrame src={userInfo.avatar} style={frame} color={frameColor} size={70} />
        <div>
          <h3 className="text-2xl font-serif font-bold" style={{ color: textColor }}>{userInfo.name || 'Your Name'}</h3>
          <p className="text-sm italic opacity-80" style={{ color: textColor }}>{userInfo.title}</p>
        </div>
      </div>
      <div className="h-px w-full" style={{ backgroundColor: accentColor }} />
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <div className="flex items-center gap-2 text-xs">
          <span style={{ color: accentColor }}>{ICONS.company}</span>
          <span style={{ color: textColor }}>{userInfo.company}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span style={{ color: accentColor }}>{ICONS.phone}</span>
          <span style={{ color: textColor }}>{userInfo.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span style={{ color: accentColor }}>{ICONS.email}</span>
          <span style={{ color: textColor }}>{userInfo.email}</span>
        </div>
      </div>
    </div>
  );

  const renderMinimal = () => (
    <div className="flex items-center gap-6 min-w-[350px]">
      <AvatarFrame src={userInfo.avatar} style={frame} color={frameColor} size={60} />
      <div className="flex flex-col">
        <div className="flex items-baseline gap-2 mb-1">
          <h3 className="text-lg font-bold" style={{ color: textColor }}>{userInfo.name}</h3>
          <span className="text-[10px] uppercase tracking-tighter opacity-50" style={{ color: textColor }}>| {userInfo.company}</span>
        </div>
        <p className="text-xs mb-2 opacity-70" style={{ color: textColor }}>{userInfo.title}</p>
        <div className="flex gap-4">
          <span className="text-xs font-semibold" style={{ color: accentColor }}>{userInfo.phone}</span>
          <span className="text-xs font-semibold" style={{ color: accentColor }}>{userInfo.email}</span>
        </div>
      </div>
    </div>
  );

  const renderCorporate = () => (
    <div className="p-6 border rounded-xl flex items-start gap-8 min-w-[500px]" style={{ borderColor: accentColor + '33' }}>
      <div className="flex flex-col items-center gap-3">
        <AvatarFrame src={userInfo.avatar} style={frame} color={frameColor} size={90} />
        <div className="flex gap-2">
           <div className="w-5 h-5 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: accentColor }}>
             <span className="scale-[0.6]">{ICONS.phone}</span>
           </div>
           <div className="w-5 h-5 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: accentColor }}>
             <span className="scale-[0.6]">{ICONS.email}</span>
           </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="mb-4">
          <h3 className="text-xl font-black uppercase tracking-wide" style={{ color: textColor }}>{userInfo.name}</h3>
          <p className="text-xs font-bold" style={{ color: accentColor }}>{userInfo.title}</p>
        </div>
        <div className="space-y-1.5 border-t pt-4" style={{ borderColor: accentColor + '1a' }}>
           <p className="text-[11px] flex items-center gap-2" style={{ color: textColor }}>
             <span className="opacity-50">{ICONS.company}</span> <strong>{userInfo.company}</strong>
           </p>
           <p className="text-[11px] flex items-center gap-2" style={{ color: textColor }}>
             <span className="opacity-50">{ICONS.address}</span> {userInfo.address}
           </p>
           <p className="text-[11px] flex items-center gap-2" style={{ color: textColor }}>
             <span className="opacity-50">{ICONS.website}</span> <a href={`https://${userInfo.website}`} className="underline decoration-dotted">{userInfo.website}</a>
           </p>
        </div>
      </div>
    </div>
  );

  switch (style) {
    case SignatureStyle.MODERN: return renderModern();
    case SignatureStyle.CLASSIC: return renderClassic();
    case SignatureStyle.MINIMAL: return renderMinimal();
    case SignatureStyle.CORPORATE: return renderCorporate();
    default: return renderModern();
  }
};

export default SignaturePreview;
