export interface Strings {
    es: Es;
}

export interface Es {
    application: Application;
    course:      Course;
    notFound:    NotFound;
    share:       Share;
    toast:       Toast;
    toolbar:     Toolbar;
    rights:      Rights;
    login:       Login;
    comments:    Comments;
    schedule:    Schedule;
}

export interface Application {
    toolbar:      NotFound;
    general:      General;
    placeholders: Placeholders;
    buttons:      Buttons;
    short:        Short;
}

export interface Buttons {
    advancedSearch: string;
}

export interface General {
    title: string;
    main:  string;
    main2: string;
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

export interface NotFound {
    title: string;
    text:  string;
}

export interface Comments {
    button:       string;
    placeholder:  string;
    title:        string;
    notFound:     string;
    notFoundText: string;
}

export interface Course {
    labels:   string[];
    download: string;
}

export interface Login {
    title:       string;
    inputs:      string[];
    helpers:     string[];
    wait:        Error;
    error:       Error;
    text:        string;
    logoutTitle: string;
    logoutText:  string;
}

export interface Error {
    title: string;
    body:  string;
}

export interface Rights {
    text1: string;
    text2: string;
}

export interface Schedule {
    banner: NotFound;
}

export interface Share {
    text:    string;
    wait:    Error;
    success: Error;
}

export interface Toast {
    text1: string;
    text2: string;
    share: string;
}

export interface Toolbar {
    options:     string[];
    signingMenu: SigningMenu;
}

export interface SigningMenu {
    options: string[];
}
