interface Idata {
  course: string;
  link: string;
  text: string;
  title: string;
  type: string;
  upload: string;
}
type ShareData = {
  title?: string;
  text?: string;
  url?: string;
};

interface Navigator {
  share: (data?: ShareData) => Promise<void>;
}