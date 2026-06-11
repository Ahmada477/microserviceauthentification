import React from 'react';
import * as Icons from 'react-icons/fi';

type IconName = keyof typeof Icons;

interface IconWrapperProps {
  name: IconName;
  className?: string;
}

export const IconWrapper: React.FC<IconWrapperProps> = ({ name, className }) => {
  const Icon = Icons[name];
  if (!Icon) return null;
  return <Icon className={className} />;
};