# IT Agency Website – Frontend

Modern public website + Admin CMS interface with AI-powered knowledge assistant.

---

## Overview

This frontend application powers the **public-facing website**, **admin dashboard (CMS)**, and **AI knowledge assistant interface** for the agency platform.

It is built to support:

* Public website experience
* AI assistant (PDF-based knowledge system)
* Contact & inquiry flow
* Admin authentication (OAuth 2.0)
* Full content & media management (CMS)
* Analytics dashboard

This repository contains **only the frontend implementation**.
Backend services are handled separately.

---

# Project Scope (Based on Product Backlog)

---

## EPIC 1: Public Website Experience (14 SP)

### Implemented Features

* Homepage UI
* About page
* Services listing page
* Service details page
* Portfolio listing
* AI Assistant interface (chat UI)
* AI responses restricted to indexed PDF knowledge base

### Key Frontend Responsibilities

* Dynamic rendering of services & portfolio
* Chat interface for AI assistant
* API integration for AI response streaming
* Responsive UI across devices

---

## EPIC 2: Contact & Inquiry Management (7 SP)

### Features

* Contact form (Name, Email, Message)
* Form validation
* API submission to backend
* Admin view for inquiries (dashboard panel)

---

## EPIC 3: Admin Authentication & Account Management (7 SP)

### Features

* OAuth 2.0 login integration
* Route protection (Private routes)
* Admin dashboard access restriction
* Admin account management UI
* Create / deactivate / delete admin accounts

---

## EPIC 4: Content & Media Management (CMS) (15 SP)

### Services Management

* Create service
* Edit service
* Delete service
* Attach images to services

### Pages Management

* Create pages
* Add sections
* Edit sections
* Reorder sections (drag-and-drop)
* Delete sections

### Portfolio Management

* Create / edit / delete portfolio items

### Media Management

* Upload images
* Delete unused images
* Media reuse across services/pages

---

## EPIC 5: AI Knowledge System (Multimodal RAG with PDFs) (5 SP)

### Features

* Upload PDF interface
* List uploaded PDFs
* Delete PDFs
* Display AI responses generated strictly from indexed documents

---

## EPIC 6: Analytics & System Insights (3 SP)

### Features

* Total page views
* Portfolio item view count
* Daily aggregated analytics display

---

# Tech Stack

### Core

* React (Functional Components + Hooks)
* React Router
* Axios / Fetch API

### UI

* Tailwind CSS / CSS Modules
* Responsive layout system
* Component-based architecture

### State Management

* Context API / Redux (if used)

### Authentication

* OAuth 2.0 integration
* Token-based session handling
* Or make a **shorter version suitable for university submission**
* Or format it specifically for GitHub best practices (badges, architecture diagram section, etc.)