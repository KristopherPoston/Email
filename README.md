# Email Application - README

## Overview

This is an email application built using Django and JavaScript that allows users to send, receive, archive, and manage emails. The application uses a simple user interface for browsing emails in different folders such as Inbox, Sent, and Archived. It also allows users to compose new emails and reply to received ones.

## Features

- **User Authentication:** Users can register and log in to their accounts.
- **Inbox, Sent, and Archived Folders:** Users can view emails in their inbox, sent items, or archived emails.
- **Compose Email:** Users can create and send new emails with recipients, subject, and body.
- **Reply to Email:** Users can reply to received emails.
- **Archive and Unarchive Emails:** Users can archive or unarchive emails from their inbox.
- **Mark Emails as Read:** Emails are marked as read automatically when opened.

## Technologies

- **Backend:** Django (Python)
- **Frontend:** HTML, CSS, JavaScript
- **Database:** SQLite (for development purposes, can be swapped for other databases like PostgreSQL or MySQL)
- **User Authentication:** Django’s built-in authentication system

## Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/email-application.git
cd email-application
```

### 2. Create a Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Apply Migrations

Run migrations to set up the database:

```bash
python manage.py migrate
```

### 5. Create a Superuser (Optional)

You can create a superuser account to log in to the admin panel and manage the application:

```bash
python manage.py createsuperuser
```

Follow the prompts to set up the username, email, and password.

### 6. Run the Development Server

Start the Django development server:

```bash
python manage.py runserver
```

Visit `http://127.0.0.1:8000` in your browser to see the application in action.

## Usage

### Pages and Views

- **Inbox:** Displays the user's incoming emails.
- **Sent:** Displays the emails the user has sent.
- **Archived:** Displays emails that the user has archived.
- **Compose:** Allows the user to compose a new email.
- **View Email:** Clicking an email in any folder opens its detailed view where users can see the sender, recipients, subject, body, and timestamp. They can also reply to the email or archive it.

### Email Actions

- **Send Email:** Compose a new email by filling in the recipient(s), subject, and body, and click "Send".
- **Archive:** Email can be archived from the inbox or unarchived from the archived folder.
- **Reply:** Users can reply to any received email, which auto-fills the recipient and subject fields.

### Folders

- **Inbox:** Displays all incoming emails that are not archived.
- **Sent:** Displays all emails the user has sent.
- **Archived:** Displays all emails that have been archived.

### Example Interaction

1. Log in or register a new account.
2. Once logged in, navigate through the inbox, sent items, or archived folder.
3. Compose a new email by clicking "Compose" in the navigation bar.
4. Reply to any email by clicking the "Reply" button on the email details page.
5. Archive or unarchive emails by clicking the "Archive" button.

## Code Explanation

### Backend

- **Models:**
  - `User`: Inherits from `AbstractUser` to provide basic user authentication features.
  - `Email`: Represents an email, storing the sender, recipients, subject, body, timestamp, read status, and archived status.
  
- **Views:**
  - `index`: Renders the user's inbox if logged in, otherwise redirects to the login page.
  - `compose`: Handles the creation of new emails, accepts POST requests, and returns a success message.
  - `mailbox`: Filters and displays emails in the specified folder (Inbox, Sent, Archived).
  - `email`: Retrieves and displays an individual email’s details, and allows updates for read/unread or archived status.

- **URLs:**
  - Routes are defined for the login, logout, registration, and email-related views.
  - API endpoints to retrieve and update emails in the database.

### Frontend

- **HTML Templates:**
  - `layout.html`: Contains the basic layout and structure, such as navigation and forms.
  - `inbox.html`, `login.html`, `register.html`: Specific templates for each page (Inbox, Login, Register).
  
- **JavaScript:**
  - Handles dynamic email interactions such as loading emails, composing emails, archiving, replying, and marking emails as read.
  
- **CSS:**
  - Provides styles for the email interface, including the inbox, email details view, and compose form.

## Development

### Running Tests

Django provides a built-in testing framework. You can run tests with the following command:

```bash
python manage.py test
```

### Contributing

Feel free to fork the repository and submit pull requests with any improvements or bug fixes. Please ensure that all changes are properly tested and documented.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

If you have any questions, feel free to open an issue in the repository or contact me directly at KristopherPoston@gmail.com .
