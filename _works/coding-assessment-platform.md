---
# preview details
layout: works-single
title: Coding Assessment Platform
category: Web App
category_slugs:
  - web-app
image: assets/img/works/coding-assessment-platform/coding-assessment-platform.jpg
short_description: A production-grade internal assessment platform supporting 25 skills with sandboxed multi-file code execution.

# full details
preview_url: ""
full_image: assets/img/works/coding-assessment-platform/coding-assessment-platform-full.jpg
info:
  - label: Year
    value: 2026

  - label: Technology
    value: React, FastAPI, Python, PostgreSQL, Microsoft Entra ID SSO, Judge0, Docker Compose, Nginx

  - label: Platform
    value: Web Application (Internal Tool)

description1:
  show: yes
  title: Project Overview
  text1: "<p>Developed during my time as a Trainee at Indium Software, this is an internal, production-grade coding assessment platform designed to evaluate candidates across 25 technical skills. The platform standardizes technical screening and eliminates dependence on third-party assessment tools like HackerRank or Codility.</p>"
  text2: "<p>Candidates log in via Microsoft SSO and attempt structured coding levels that unlock sequentially (from Beginner to Specialist). The platform supports multiple evaluation styles: Multiple Choice Questions (MCQ), single-file execution (stdin/stdout), SQL query validation, and complex multi-file project execution.</p>"

description2:
  show: yes
  title: Technical Implementation
  text1: "<p><strong>Sandboxed Multi-Language Execution:</strong> Integrated self-hosted <code>Judge0</code> as the evaluation engine. This handles sandboxed, automated code execution across 25 skills, including languages and frameworks like Python, FastAPI, React, Flask, and Selenium (Python & Java) alongside relational database testing.</p>
  <p><strong>Injectable Test Runner Framework:</strong> Engineered a multi-file bundle compiler for complex framework questions. When candidates edit multiple files in the Monaco editor, the backend bundles the source files, injects a hidden admin-defined test runner, executes the tests in Judge0, and reports structural pass/fail results.</p>"
  text2: "<p><strong>Microsoft Entra ID SSO & JWT Auth:</strong> Implemented single sign-on authentication using Microsoft Entra ID OAuth2/OIDC flows, creating employee candidate profiles automatically and managing administrative access via role-based access control (RBAC) middleware.</p>"
---
