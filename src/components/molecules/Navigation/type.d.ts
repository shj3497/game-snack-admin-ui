import {UserRole} from '@/lib/types/next-auth';
import React from 'react';

export type PageListItem = {
  subHeader: string;
  accessRole?: UserRole[];
  childPages?: ChildPage[];
};

export type ChildPage = {
  name: string;
  id?: string;
  url?: string;
  mainPath?: string;
  icon?: React.ReactNode;
  selectedIcon?: React.ReactNode;
  accessRole?: UserRole[];
  childPages?: ChildPage[];
};
