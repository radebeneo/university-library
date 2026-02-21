# 📚 University Library Management System

A modern, full-stack library management application designed for universities. This platform allows students to browse, borrow, and manage books while providing administrators with tools to oversee library operations.

## 🚀 Features

- **Authentication & Authorization**: Secure login and registration for students and admins using NextAuth.js.
- **Book Management**: Browse a comprehensive list of books with detailed overviews, including descriptions, authors, and availability.
- **Borrowing System**: Track borrowed and returned books (Work in Progress).
- **User Profiles**: Personalized profiles for students to view their activity and borrowed items.
- **Image Uploads**: Integrated with ImageKit for efficient management of book covers and student ID cards.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS and Shadcn UI.
- **Role-Based Access**: Specialized views and permissions for Students and Administrators.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech/))
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [NextAuth.js v5 (Beta)](https://authjs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Image Hosting**: [ImageKit](https://imagekit.io/)
- **Form Handling**: React Hook Form, Zod

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

## ⚙️ Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/university-library.git
   cd university-library
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add the following:
   ```env
   # Database
   DATABASE_URL=your_postgresql_url

   # NextAuth
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXT_PUBLIC_API_ENDPOINT=http://localhost:3000

   # ImageKit
   NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   ```

4. **Initialize the database**:
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see the result.

## 🗄️ Database Schema

The project uses Drizzle ORM to manage the schema. Key tables include:
- `users`: Stores user information, roles (ADMIN/USER), and account status.
- `books`: (Coming Soon) Manages book details and availability.

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run db:generate`: Generates database migrations.
- `npm run db:migrate`: Applies database migrations.
- `npm run db:studio`: Opens Drizzle Studio to explore your database.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
