# User Authentication & Authorization (Cont)
- Add authorization middleware to check if a user is logged in.
    - if not logged in, send them back to the login page.
    - if logged in, go back to the previous page (if first, a user tries to create a new post (/posts/new), a user will be prompted to be logged in, and then after logging in, a user redirects to the post/new.ejs page)