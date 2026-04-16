# Blog Platform CMS

---

## Project Overview

A full-stack SEO-optimized blog platform built with:

- **Backend:** Node.js, Express.js, MongoDB
- **Admin Panel:** React.js + Tailwind CSS
- **Public Frontend:** Next.js + Tailwind CSS

This platform supports role-based blog management, SEO optimization, and public blog rendering.

---

## Role Permissions

### Super Admin
- Full access to users
- Full access to blogs
- Full SEO management
- Full settings access

### Editor
- Create blogs
- Edit blogs
- Manage SEO fields

### Author
- Create own blogs
- Edit/Delete own blogs only

### Viewer / User
- Read-only access

---

## Setup Steps

### Backend Setup

```bash
cd backend
npm install
npm run dev


# API Documentation

Authentication APIs
POST /api/auth/register
POST /api/auth/login
# Blog APIs
GET /api/blogs
GET /api/blogs/:slug
POST /api/blogs
PUT /api/blogs/:id
DELETE /api/blogs/:id

# User Management APIs
GET /api/users
PUT /api/users/:id
DELETE /api/users/:id
# Backend .env 

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret



# SEO Features Implemented 

Dynamic Meta Title
Dynamic Meta Description
Open Graph Tags
SEO Friendly Slugs
Structured Data (JSON-LD)
Server Side Rendering (SSR)
SEO Optimized Static Pages

