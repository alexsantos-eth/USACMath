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
    toolbar: {
      title: string;
      text: string;
    };
    general: {
      title: string;
      main: string;
      main_2: string;
    }
    placeholders: {
      search: string;
    };
    buttons: {
      advancedSearch: string;
    };
    short: {
      listTitle: string;
      buttons: {
        icon: string;
        text: string;
      }[]
    }
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
  interface alerts {
    update: {
      button: string;
      title: string;
      text: string;
    }
  }
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