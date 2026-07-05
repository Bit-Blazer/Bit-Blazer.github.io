---
# preview details
layout: works-single
title: Squoosh Fork
category: Full Stack
category_slugs:
  - full-stack
image: assets/img/works/template/image_670x697.jpg
short_description: A standalone browser-compatible package forking Google's Squoosh to expose Wasm codec binaries as a drop-in web dependency.

# full details
preview_url: https://github.com/Bit-Blazer/squoosh
full_image: assets/img/works/template/full_image_1920x1020.jpg
info:
  - label: Year
    value: 2026

  - label: Technology
    value: WebAssembly, TypeScript, Node.js, C++

  - label: Platform
    value: Web Browser Package (npm)

description1:
  show: yes
  title: Project Overview
  text1: "<p>Google's Squoosh is a powerful image compression app, but its advanced WebAssembly-based codecs are tightly coupled to its web app structure. This project forks Squoosh to extract and package those Wasm codecs into a standalone, browser-compatible package that can be used as a drop-in dependency in any web application.</p>"
  text2: "<p>By exposing Squoosh's powerful compression codecs as an independent package, it enables developers to build programmatic, high-quality client-side image compression directly inside any browser workflow without requiring complex build steps or server-side setups.</p>"

description2:
  show: yes
  title: Technical Implementation
  text1: "<p><strong>Decoupled Wasm Compilation:</strong> Extracted Google Squoosh's native C++ image codecs (like OxiPNG and MozJPEG) and compiled/wrapped them into decoupled, browser-friendly JavaScript API wrappers.</p>
  <p><strong>Drop-In Dependency:</strong> Standardized the compiled outputs into a standalone npm package, enabling other web platforms (like DocuBlend) to load Squoosh Wasm binaries dynamically without custom pipeline build configurations.</p>"
  text2: "<p><strong>Programmatic Compression:</strong> Created helper interfaces that allow web developers to run pixel quantization (reducing colors to 64/256) and compress raw canvas blobs into lightweight PNGs and JPEGs entirely client-side, saving significant server bandwidth.</p>"
---
