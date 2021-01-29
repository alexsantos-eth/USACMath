export interface Strings {
    es: Es;
}

export interface Es {
    application: Application;
    share:       Share;
    toast:       Toast;
    alerts:      Alerts;
    rights:      Rights;
    login:       Login;
    comments:    EsComments;
    schedule:    Schedule;
}

export interface Alerts {
    comments: AlertsComments;
}

export interface AlertsComments {
    notFound:     string;
    notFoundText: string;
}

export interface Application {
    toolbar:      Toolbar;
    general:      General;
    placeholders: Placeholders;
    buttons:      Buttons;
    short:        Short;
}

export interface Buttons {
    advancedSearch: string;
}

export interface General {
    title:  string;
    main:   string;
    main_2: string;
}

export interface Placeholders {
    search:  string;
    comment: string;
}

export interface Short {
    listTitle: string;
    buttons:   Button[];
}

export interface Button {
    icon: string;
    text: string;
}

export interface Toolbar {
    title: string;
    text:  string;
}

export interface EsComments {
    points:    string;
    button:    string;
    setPoints: string;
}

export interface Login {
    title:       string;
    text:        string;
    logoutTitle: string;
    logoutText:  string;
}

export interface Rights {
    text_1: string;
    text_2: string;
}

export interface Schedule {
    banner: Toolbar;
}

export interface Share {
    text: string;
}

export interface Toast {
    text_1: string;
    text_2: string;
    share:  string;
}
