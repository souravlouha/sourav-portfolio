<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/temp/1

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`



```
parth-portfolio
├─ App.tsx
├─ blogData.ts
├─ components
│  ├─ About.tsx
│  ├─ AboutPage.tsx
│  ├─ BentoGrid.tsx
│  ├─ Blog.tsx
│  ├─ Cursor.tsx
│  ├─ DecodingSection.tsx
│  ├─ Footer.tsx
│  ├─ Header.tsx
│  ├─ Hero.tsx
│  ├─ Home.tsx
│  ├─ ProjectShowcase.tsx
│  ├─ SingleBlog.tsx
│  ├─ Skills.tsx
│  └─ Testimonials.tsx
├─ constants.tsx
├─ index.css
├─ index.html
├─ index.tsx
├─ metadata.json
├─ notesData.ts
├─ package-lock.json
├─ package.json
├─ public
│  ├─ cursor.svg
│  ├─ custom-cursor.jpg
│  ├─ custom-cursor.png
│  └─ images
│     ├─ about01.png
│     ├─ image1.jpg
│     ├─ image2.jpg
│     ├─ image3.jpg
│     ├─ image4.jpg
│     ├─ image5.jpg
│     └─ profile.jpeg
├─ README.md
├─ tsconfig.json
├─ types.ts
└─ vite.config.ts

```