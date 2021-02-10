export interface Strings {
    es: Es;
}

export interface Es {
    application: Application;
    course:      Course;
    notFound:    NotFound;
    share:       Share;
    toast:       Toast;
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
    text:        string;
    logoutTitle: string;
    logoutText:  string;
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
    wait:    Success;
    success: Success;
}

export interface Success {
    title: string;
    body:  string;
}

export interface Toast {
    text1: string;
    text2: string;
    share: string;
}
