
import React, { useState, useRef, useCallback } from 'react';
import { UserInfo, DesignConfig, SignatureStyle, FrameStyle } from './types';
import { COLORS } from './constants';
import { 
  Download, 
  Upload, 
  Settings2, 
  Type, 
  Palette, 
  Layout, 
  CircleUser,
  Trash2,
  Camera
} from 'lucide-react';
import { toPng } from 'html-to-image';
import SignaturePreview from './components/SignaturePreview';

const initialUserInfo: UserInfo = {
  name: 'Alex Johnson',
  title: 'Senior Product Designer',
  company: 'TechFlow Solutions Inc.',
  phone: '+1 (555) 123-4567',
  email: 'alex.j@techflow.com',
  address: '123 Innovation Way, San Francisco, CA',
  website: 'www.techflow.com',
  avatar: 'https://picsum.photos/200/200?random=1'
};

const initialConfig: DesignConfig = {
  style: SignatureStyle.MODERN,
  frame: FrameStyle.SOLID,
  frameColor: '#2563eb',
  accentColor: '#2563eb',
  textColor: '#1e293b',
  fontSize: 14
};

const App: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [config, setConfig] = useState<DesignConfig>(initialConfig);
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const exportSignature = useCallback(async () => {
    if (previewRef.current === null) return;
    
    setIsExporting(true);
    try {
      const dataUrl = await toPng(previewRef.current, { 
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#ffffff'
      });
      const link = document.createElement('a');
      link.download = `email-signature-${userInfo.name.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export failed', err);
    } finally {
      setIsExporting(false);
    }
  }, [userInfo.name]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50">
      {/* Sidebar Editor */}
      <aside className="w-full lg:w-96 bg-white border-r border-slate-200 overflow-y-auto h-screen sticky top-0 shadow-xl z-10">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-8">
            <Settings2 className="text-blue-600" />
            SignGen <span className="text-blue-600 font-light">Pro</span>
          </h1>

          {/* Avatar Section */}
          <section className="mb-10">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Camera size={16} /> Avatar & Frame
            </h2>
            <div className="flex items-center gap-6 mb-6">
              <div className="relative group">
                <div className={`w-24 h-24 rounded-full overflow-hidden border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 transition-all ${userInfo.avatar ? 'border-none' : ''}`}>
                  {userInfo.avatar ? (
                    <img src={userInfo.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <CircleUser className="text-slate-400" size={40} />
                  )}
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity">
                  <Upload size={20} />
                  <input type="file" className="hidden" onChange={handleAvatarUpload} accept="image/*" />
                </label>
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 mb-2">Frame Style</p>
                <select 
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={config.frame}
                  onChange={(e) => setConfig(prev => ({ ...prev, frame: e.target.value as FrameStyle }))}
                >
                  <option value={FrameStyle.NONE}>No Frame</option>
                  <option value={FrameStyle.SOLID}>Solid Border</option>
                  <option value={FrameStyle.DOUBLE}>Double Border</option>
                  <option value={FrameStyle.DASHED}>Dashed Border</option>
                  <option value={FrameStyle.GRADIENT}>Modern Gradient</option>
                </select>
              </div>
            </div>
            {userInfo.avatar && (
              <button 
                onClick={() => setUserInfo(prev => ({ ...prev, avatar: null }))}
                className="text-xs text-red-500 flex items-center gap-1 hover:text-red-600 transition-colors"
              >
                <Trash2 size={12} /> Remove photo
              </button>
            )}
          </section>

          {/* User Details Section */}
          <section className="mb-10">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Type size={16} /> Information
            </h2>
            <div className="space-y-4">
              {[
                { label: 'Full Name', name: 'name', placeholder: 'e.g. Alex Johnson' },
                { label: 'Job Title', name: 'title', placeholder: 'e.g. Designer' },
                { label: 'Company', name: 'company', placeholder: 'e.g. TechFlow' },
                { label: 'Phone', name: 'phone', placeholder: '+1...' },
                { label: 'Email', name: 'email', placeholder: 'alex@company.com' },
                { label: 'Address', name: 'address', placeholder: 'City, State' },
                { label: 'Website', name: 'website', placeholder: 'www.site.com' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-xs font-medium text-slate-600 mb-1">{field.label}</label>
                  <input
                    type="text"
                    name={field.name}
                    value={(userInfo as any)[field.name]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Design Customization */}
          <section className="mb-10">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Palette size={16} /> Design
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-2">Layout Template</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(SignatureStyle).map((s) => (
                    <button
                      key={s}
                      onClick={() => setConfig(prev => ({ ...prev, style: s }))}
                      className={`px-3 py-2 text-xs font-medium rounded-lg border capitalize transition-all ${
                        config.style === s 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-3">Accent Color</label>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => setConfig(prev => ({ ...prev, accentColor: color, frameColor: color }))}
                      className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                        config.accentColor === color ? 'border-slate-400 scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  <div className="relative">
                    <input 
                      type="color" 
                      value={config.accentColor} 
                      onChange={(e) => setConfig(prev => ({ ...prev, accentColor: e.target.value, frameColor: e.target.value }))}
                      className="w-6 h-6 rounded-full cursor-pointer opacity-0 absolute inset-0"
                    />
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 border-2 border-white shadow-sm pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </aside>

      {/* Main Preview Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 lg:p-12">
        <div className="max-w-4xl w-full">
          <header className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Preview</h2>
              <p className="text-slate-500 text-sm">See how your signature looks in real-time</p>
            </div>
            <button
              onClick={exportSignature}
              disabled={isExporting}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-blue-200 transition-all active:scale-95"
            >
              {isExporting ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Download size={18} />
              )}
              {isExporting ? 'Generating...' : 'Download PNG'}
            </button>
          </header>

          <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-16 border border-slate-100 flex items-center justify-center min-h-[400px]">
             <div ref={previewRef} className="p-4 bg-white inline-block">
                <SignaturePreview userInfo={userInfo} config={config} />
             </div>
          </div>

          <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-4 items-center">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Layout size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-900">Pro Tip</p>
              <p className="text-xs text-blue-700">Add this image to your email client (Gmail, Outlook, etc.) settings under "Signature".</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
