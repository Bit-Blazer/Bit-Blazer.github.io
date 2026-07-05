---
# preview details
layout: works-single
title: PAN Service CRM
category: Full Stack
category_slugs:
  - full-stack
image: assets/img/works/pan-crm/pan-crm.jpg
short_description: A full-stack custom CRM replacing a chaotic WhatsApp-based intake workflow with structured database tracking and automated Google Drive document uploads.

# full details
preview_url: https://github.com/Bit-Blazer/crm
full_image: assets/img/works/pan-crm/pan-crm-full.jpg
info:
  - label: Year
    value: 2026

  - label: Technology
    value: React, FastAPI, Python, PostgreSQL, TypeScript, Google Drive API

  - label: Platform
    value: Web Application (Full-Stack)

description1:
  show: yes
  title: Project Overview
  text1: "<p>PAN Service CRM is a custom full-stack web application designed to replace a chaotic, unstructured WhatsApp-based workflow for a PAN card service provider. Before this CRM, applicant details and documents were scattered across hundreds of chat logs, making status tracking and payment recording extremely tedious.</p>"
  text2: "<p>This solution centralizes the entire lifecycle: agents/shops submit application details and upload document images through a public form, while an admin dashboard allows for login-protected application verification, status updates, fee charging, and payment management.</p>"

description2:
  show: yes
  title: Technical Implementation
  text1: "<p><strong>Google Drive Storage:</strong> Engineered a backend pipeline using the Google Drive API (via a Service Account) to upload files directly to a cloud storage system. The system dynamically creates a clean folder hierarchy (<code>Root / Shop Name / Application Number /</code>) for Aadhaar cards, photos, and signatures, meaning no sensitive files are ever stored on the application server.</p>
  <p><strong>FastAPI Backend & PostgreSQL:</strong> Designed a robust REST API using FastAPI. Modeled relational database schemas (Admins, Shops, Applications, and Documents) using SQLAlchemy, using Alembic for database migration workflows. Supported distinct workflows for New PANs, Corrections, and Minor applicant categories.</p>"
---
