# Electrical Solution Mohammadpur

A high-converting, professional landing page for an electrical service business based in Mohammadpur, Dhaka. Built with React, Vite, Express, and Tailwind CSS.

## 🚀 Features

- **Modern Responsive Design**: Mobile-first approach with a professional industrial "Electrical" theme (Yellow/Black/White).
- **Lead Generation**: A validated contact form that sends leads directly to Mailchimp.
- **Conversion Focused**: Includes hero section, services showcase, special offers, and trust badges.
- **24/7 Support Integration**: Floating WhatsApp button for instant communication.
- **Full-Stack Architecture**: Proxy server to protect sensitive Mailchimp API keys.
- **Animations**: Polished transitions using `motion`.

## 🛠️ Tech Stack

- **Frontend**: React 19, Tailwind CSS 4, Lucide Icons, Motion.
- **Backend**: Node.js, Express, Axios.
- **Integration**: Mailchimp Marketing API.

## ⚙️ Setup & Installation

### 1. Prerequisites
- Node.js (v18 or higher)
- A Mailchimp account (for lead storage)

### 2. Installations
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and add your Mailchimp credentials (see `.env.example` for reference):

```env
MAILCHIMP_API_KEY=your_mailchimp_api_key
MAILCHIMP_AUDIENCE_ID=your_audience_id
MAILCHIMP_DC=usXX (e.g., us21)
```

### 4. Run Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

## 📧 Mailchimp Connection Guide

1. **API Key**: Go to Mailchimp Account -> Account & Billing -> Extras -> API Keys.
2. **Audience ID**: Go to Audience -> All Contacts -> Settings -> Audience name and defaults.
3. **Data Center (DC)**: This is the prefix of your Mailchimp URL (e.g., if your URL is `us21.admin.mailchimp.com`, your DC is `us21`).

## 🚢 Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```
2. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```
3. **Hosting Suggestions**:
   - **Render/Railway**: Excellent for full-stack apps (Express + Vite).
   - **Vercel**: Works best for the frontend, but requires Serverless Functions for the API.

## 📄 License
SPDX-License-Identifier: Apache-2.0

Produced by Electrical Solution Mohammadpur Team.
