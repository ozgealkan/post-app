# ZenigmaPostApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.0.

## Initialization

Run `npm install` to install node modules.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Architecture

There are 2 tables in database which are `users` and `posts` . They are connected to each other with `userId`. 
If there is no user, app creates `1 user and 2 posts` as default.
`Angular guard services` are used for route protection. `Guards` protect `create-post` and `my-posts` pages.
Post creation module has been created as a `Lazy Load Module`. Therefore, browser will not load this module when the app is loaded.


## Tools && Libraries

`Bootstrap` is used as a CSS Framework. 
`Font Awesome` is used for icons. 
`IndexedDB` is used for data storing. 
`Prettier` is used for formatting.

