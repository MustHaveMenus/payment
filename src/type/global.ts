declare global {
  interface Window {
    rewardful: (action: string, data: any) => void;
  }
}

export {}
