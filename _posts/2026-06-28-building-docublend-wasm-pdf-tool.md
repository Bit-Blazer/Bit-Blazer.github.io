---
layout: post
title: "Building DocuBlend: A 100% Client-Side WebAssembly PDF Tool"
date: 2026-06-28
category: [Full Stack, WebAssembly]
tags: [Wasm, PDF, React, TypeScript]
image: assets/img/blog/blog-2.jpg
full_image: assets/img/blog/blog-2.jpg
---

When it comes to processing documents like visa applications, PAN applications, or government forms, most people rely on third-party PDF services. However, these tools usually come with three major friction points: **privacy concerns** (uploading personal information to external servers), **upload restrictions** (strict size limits, e.g., 2MB), and **paywalls**.

To solve this, I built **DocuBlend** - a zero-install, serverless document workspace that runs entirely in the user's browser. Files never touch a server, meaning 100% privacy and full offline capability.

Here is a breakdown of how the architecture works and how WebAssembly (Wasm) and local browser execution made it possible.

---

### The Architecture: 100% Client-Side

Standard web apps upload images and PDFs to a cloud server (using Python, Node, or Go), process them, and return a download link. DocuBlend reverses this:

1. **Intake & Rendering**: A PDF file is loaded via a standard file input. It is sent directly to `PDF.js` (running inside a separate browser Web Worker to keep the UI thread responsive) which renders each page onto a hidden canvas element.
2. **Interactive Canvas Workspace**: The rendered pages and user-uploaded images are loaded as layers onto a `Konva.js` stage, allowing users to drag, resize, rotate, and re-order pages dynamically.
3. **Local Compilation**: Once composition is complete, `pdf-lib` gathers the canvas outputs, merges them, and generates a fresh PDF blob natively in JavaScript.

---

### Solving the Bloat: In-Browser Wasm Squoosh

One of the largest hurdles with canvas-based document merging is **file size**. Merging multiple uncompressed images into a PDF quickly creates a massive file that exceeds portal upload limits. 

To solve this, I compiled a standalone, browser-compatible version of Google’s **Squoosh** image compression engine (forked to expose Wasm codec binaries directly as a web dependency).

When a user removes an image background (such as a passport photo or signature):
* The background removal engine (`@imgly/background-removal`) spits out a raw transparent PNG.
* Instead of embedding the heavy PNG, the app sends it to the custom Wasm Squoosh thread.
* The Wasm codecs quantize the image down to 64 or 256 colors using the `oxipng` codec.
* The compressed output is converted to a local data URL and embedded, reducing file sizes by up to **80%** with negligible quality loss.

---

### Adaptive Compression Search

Portals often have strict limits (e.g. *"PDF must be less than 2MB"*). Since output sizes depend heavily on image encoding quality, I implemented an adaptive compression pipeline using a **binary search algorithm** over JPEG export settings:

* When the user specifies a target file limit (e.g., 2MB), the export pipeline runs a fast loop.
* It estimates the PDF size by checking compressed image data sizes.
* It dynamically updates the JPEG compression quality (from 85 downwards) and re-evaluates the output size.
* Once it finds the highest quality level that fits precisely under the threshold, it triggers the final download.

---

### Conclusion

Modern web browsers are no longer just document viewers; with WebAssembly, Web Workers, and hardware-accelerated canvas wrappers, they are fully capable local execution runtimes. By shifting processing to the client, DocuBlend provides instant, private, and free document editing with zero server hosting costs.

If you are interested in the code, feel free to check out the [DocuBlend Repository](https://github.com/Bit-Blazer/DocuBlend)!
