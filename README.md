# Documentation Feedback and Code Snippet System

This project is a full-stack web application for interactive documentation with a real-time code editor, feedback system, and user authentication. It allows users to collaborate on code snippets, provide feedback on documentation, and save their code snippets.

## Features

- **Interactive Documentation**: Dynamic documentation pages with a live code editor.
- **Real-time Code Collaboration**: Real-time code collaboration using Socket.io.
- **Feedback and Rating System**: Users can submit feedback and ratings on documentation.
- **User Authentication**: User authentication with NextAuth.js and Google OAuth2.0.
- **Admin Dashboard**: View and filter feedback and ratings.
- **Saved Snippets Page**: View, manage, and run saved code snippets.

## Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS, Monaco Editor, Pyodide
- **Backend**: Node.js, MongoDB, Mongoose, NextAuth.js
- **Real-time Collaboration**: Socket.io
- **APIs**: RESTful APIs for feedback and snippet management
- **Hosting**: Deployed on Vercel

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MongoDB Atlas account
- Google Cloud Platform account for OAuth 2.0 credentials

### Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-username/documentation-feedback.git
    cd documentation-feedback
    ```

2. **Install dependencies**:
    ```sh
    npm install
    # or
    yarn install
    ```

3. **Set up environment variables**:
    Create a `.env.local` file in the root directory with the following content:
    ```sh
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
    NEXTAUTH_URL=http://localhost:3000
    GOOGLE_CLIENT_ID=your-google-client-id
    GOOGLE_CLIENT_SECRET=your-google-client-secret
    NEXTAUTH_SECRET=your-nextauth-secret
    ```

4. **Run the development server**:
    ```sh
    npm run dev
    # or
    yarn dev
    ```

5. **Open your browser** and navigate to `http://localhost:3000`.

## Usage

### Interactive Documentation

1. Navigate to the documentation page.
2. Edit the code in the live editor.
3. Run the code to see the output.
4. Save code snippets (requires user authentication).

### Feedback System

1. Submit feedback and ratings on documentation pages.
2. View average ratings and recent comments.

### Admin Dashboard

1. Navigate to the admin dashboard (`/admin`).
2. Filter feedback by Doc ID, rating, and comments.

### User Authentication

1. Sign in with Google to save snippets and track activity.
2. Sign out when done.


## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to the contributors of [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [Socket.io](https://socket.io/), and other open-source libraries used in this project.
