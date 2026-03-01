# Frontend Mentor - Note-taking web app solution

This is a solution to the [Note-taking web app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/note-taking-web-app-773r7bUfOG). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Author](#author)
  - [My process](#my-process)

## Overview

### The challenge

Users should be able to:

- Create, read, update, and delete notes
- Archive notes
- View all their notes
- View all archived notes
- View notes with specific tags
- Search notes by title, tag, and content
- Select their color theme
- Select their font theme
- Receive validation messages if required form fields aren't completed
- Navigate the whole app and perform all actions using only their keyboard
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: Save details to a database (build the project as a full-stack app)
- **Bonus**: Create an account, log in, change password (add user authentication to the full-stack app)
- **Bonus**: Reset their password (add password reset to the full-stack app)

### Screenshot

<table>
  <tr>
    <td><img src="./screenshots/note-app-mobile.png" alt=""></td>
    <td><img src="./screenshots/note-app-tablet.png" alt=""></td>
    <td><img src="./screenshots/note-app-desktop.png" alt=""></td>
  </tr>
</table>

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

### Built with

- React
- React-Router
- Supabase

### What I learned

- A full-stack notes app with Supabase
- Proper authentication flow with Google OAuth
- Smart tag management with automatic cleanup
- Responsive design with separate mobile/desktop routing
- Consistent error handling across the whole app
- Theme system with persistence
- Clean URL structure with Nanoid
- Toast notifications with animations
- And more...

## Author

- Github - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)

## My process

### Features

- **Notes** — Create, edit, delete notes with title, content, and tags
- **Tags** — Auto-managed tags with cleanup when no longer in use
- **Archive** — Archive and restore notes
- **Search** — Search by title, content, or tags
- **Authentication** — Email/password and Google OAuth via Supabase
- **Color Theme** — Light, dark, and system theme support
- **Font Theme** — Sans-serif, serif, and monospace options
- **Responsive** — Separate routing and layouts for mobile and desktop
- **Toast Notifications** — Slide animations with success and error variants

---

### Authentication

Supports two sign-in methods:

- **Email/Password** — with validation and user-friendly error messages
- **Google OAuth** — via Supabase OAuth provider

Password reset is handled via email link with Supabase's built-in recovery flow.

---

### Routing

The app uses two separate routers depending on screen width (breakpoint: `1024px`):

- **Mobile router** — full-page routes for each view
- **Desktop router** — nested routes so note details render alongside the note list

Both routers share the same protected route wrapper with `NoteProvider` scoped inside, so notes context is only active for authenticated users.

---

### Theming

Color and font themes are persisted to `localStorage` and applied via `data-colorTheme` and `data-fontTheme` attributes on the `<html>` element. CSS custom properties handle the rest.

**Color themes:** Light, Dark, System  
**Font themes:** Sans-serif, Serif, Monospace

### Project Structure

```
src/
├── assets/
│   ├── fonts/               # Inter, Noto Serif, Source Code Pro
│   └── images/
├── components/
│   ├── auth/
│   │   ├── ForgotPassword.jsx
│   │   ├── Login.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── ResetPassword.jsx
│   │   └── SignUp.jsx
│   ├── desktop/
│   │   ├── DesktopHeader.jsx
│   │   ├── RightMenu.jsx
│   │   └── SideNav.jsx
│   ├── mobile/
│   │   ├── GoBackLink.jsx
│   │   ├── HeaderControl.jsx
│   │   └── MobileNav.jsx
│   └── shared/
│       ├── Button.jsx
│       ├── Icons.jsx
│       ├── Modal.jsx
│       ├── NoteForm.jsx
│       ├── NoteList.jsx
│       ├── Textarea.jsx
│       └── Toast.jsx
├── context/
│   ├── AuthContext.jsx      # Session management and logout
│   ├── ColorThemeContext.jsx
│   ├── FontThemeContext.jsx
│   ├── NoteContext.jsx      # Notes state, fetch, and context helpers
│   └── ToastContext.jsx
├── hooks/
│   ├── auth/
│   │   ├── useChangePassword.jsx
│   │   ├── useResetPassword.jsx
│   │   ├── useSignInUser.jsx
│   │   └── useSignUpUser.jsx
│   ├── crud/
│   │   ├── useArchiveNote.jsx
│   │   ├── useDeleteNote.jsx
│   │   ├── useInsertNote.jsx
│   │   └── useUpdateNote.jsx
│   ├── useMediaQuery.jsx
│   └── useTogglePassword.jsx
├── layouts/
│   └── Layout.jsx
├── routes/
│   ├── AllNotes.jsx
│   ├── Archived.jsx
│   ├── ChangePassword.jsx
│   ├── ColorTheme.jsx
│   ├── CreateNewNote.jsx
│   ├── FontTheme.jsx
│   ├── NoteDetails.jsx
│   ├── NotFound.jsx
│   ├── RootDirect.jsx
│   ├── Search.jsx
│   ├── Settings.jsx
│   ├── TagPage.jsx
│   └── Tags.jsx
├── App.jsx
├── App.css
├── index.css
├── main.jsx
├── router.jsx
└── supabase-client.js
```

---

### Database Schema

```
notes
├── id          text (nanoid)
├── user_id     uuid (foreign key → auth.users)
├── title       text
├── content     text
├── lastEdited  timestamptz
└── isArchived  boolean

tags
├── id          text (nanoid)
├── user_id     uuid (foreign key → auth.users)
└── name        text

note_tags (junction table)
├── note_id     text (foreign key → notes)
└── tag_id      text (foreign key → tags)
```

Tags are automatically cleaned up when they are no longer associated with any notes.
