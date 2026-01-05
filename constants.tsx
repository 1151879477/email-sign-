
import React from 'react';
import { Mail, Phone, MapPin, Globe, Briefcase, User } from 'lucide-react';

export const COLORS = [
  '#0f172a', // Slate 900
  '#2563eb', // Blue 600
  '#16a34a', // Green 600
  '#dc2626', // Red 600
  '#9333ea', // Purple 600
  '#ea580c', // Orange 600
  '#db2777', // Pink 600
  '#0891b2', // Cyan 600
];

export const ICONS = {
  email: <Mail size={14} />,
  phone: <Phone size={14} />,
  address: <MapPin size={14} />,
  website: <Globe size={14} />,
  company: <Briefcase size={14} />,
  name: <User size={14} />,
};
