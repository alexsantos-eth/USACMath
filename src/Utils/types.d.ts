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

namespace Strings {
  interface application {
    title: string;
    text: string;
    text_2: string;
    search: string;
    advancedSearch: string;
    listTitle: string;
    short: {
      icon: string;
      text: string;
    }[]
  };
  interface share {
    text: string;
  };
  interface toast {
    text_1: string;
    text_2: string;
    share: string;
    update: string;
    update_btn: string;
  };
  interface rights {
    text_1: string;
    text_2: string;
  }
}

interface IToast {
  text: string;
  actionText?: string;
  onHide?: Function;
  action?: (e: MouseEvent) => void;
  fixed?: boolean;
}