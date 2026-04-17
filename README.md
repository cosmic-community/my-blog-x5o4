# My Blog

![App Preview](https://imgix.cosmicjs.com/b5ac97f0-3a83-11f1-bfe6-41d09b3fa899-autopilot-photo-1506126613408-eca07ce68773-1776447278791.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern blog built with Next.js 16 and Cosmic CMS.

## Features
- 📝 Dynamic blog posts with rich content
- 👤 Author profiles with avatars and bios
- 🏷️ Category organization
- 📱 Fully responsive design
- ⚡ Server-side rendering
- 🎨 Modern UI with Tailwind CSS

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69e26efee8787a5bd2e19d23&clone_repository=69e26fb5e8787a5bd2e19d55)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a blog with posts (including featured images, content, and tags), authors, and categories.
> 
> User instructions: A blog with posts, authors, and categories"

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "My Blog". The content is managed in Cosmic CMS with the following object types: authors, categories, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
> 
> User instructions: A blog with posts, authors, and categories

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Cosmic CMS SDK

## Getting Started

### Prerequisites
- Bun installed
- Cosmic account with bucket

### Installation
```bash
bun install
bun run dev
```

## Cosmic SDK Examples

```typescript
// Fetch all posts with author and categories
const posts = await cosmic.objects
  .find({ type: 'posts' })
  .depth(1)
```

## Cosmic CMS Integration
Uses the Cosmic SDK to fetch posts, authors, and categories with proper typing and error handling.

## Deployment
Deploy to Vercel or Netlify. Set environment variables: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`.
<!-- README_END -->