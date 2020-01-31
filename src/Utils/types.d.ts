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

interface Strings {
  application: {
    title: string;
    text: string;
    search: string;
    advancedSearch: string
  };
  share: {
    text: string;
  };
  toast: {
    text_1: string;
    text_2: string;
    share: string;
  };
  rights: {
    text_1: string;
    text_2: string;
  }
}