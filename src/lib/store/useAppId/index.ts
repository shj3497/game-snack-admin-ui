'use client';

import {setCookie} from 'cookies-next';
import {create} from 'zustand';

export type AppInfo = {
  label: string;
  value: string;
};

type AppStore = {
  appId: string;
  appInfo: AppInfo | null;
  setAppInfo: (appInfo: AppInfo) => void;
  init: (appInfo: AppInfo) => void;
};
const defaultAppInfo: AppInfo = {
  label: '',
  value: '',
};

const useAppId = create<AppStore>((set) => ({
  appId: defaultAppInfo.value,
  appInfo: defaultAppInfo,
  setAppInfo: (appInfo) => {
    setCookie('appId', appInfo.value, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      secure: process.env.NODE_ENV !== 'development',
    });
    set(() => ({
      appId: appInfo.value,
      appInfo: appInfo,
    }));
  },
  init: (appInfo) => {
    set(() => ({
      appId: appInfo.value,
      appInfo: appInfo,
    }));
  },
}));

export default useAppId;
