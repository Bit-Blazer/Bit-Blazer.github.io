---
# preview details
layout: works-single
title: DocuBlend
category: Full Stack
category_slugs:
  - full-stack
image: assets/img/works/docublend/docublend.jpg
short_description: A 100% private, client-side document composition tool running entirely in the browser to merge PDFs, attach images, fix perspective, and remove backgrounds with zero server uploads.

# full details
preview_url: https://github.com/Bit-Blazer/DocuBlend
full_image: assets/img/works/docublend/docublend-full.jpg
info:
  - label: Year
    value: 2026

  - label: Technology
    value: React, TypeScript, Konva.js, WebAssembly, PDF.js, pdf-lib

  - label: Platform
    value: Web Browser (100% Client-Side)

description1:
  show: yes
  title: Project Overview
  text1: "<p>DocuBlend is a zero-install, serverless document workspace built to solve the privacy and file-size headaches of online form submissions. By executing all logic directly in the user's browser, it allows individuals to drag in sensitive documents, merge PDFs, rearrange pages, and clean up images without ever uploading a single byte to an external server. The entire workflow is 100% private and capable of running completely offline.</p>"
  text2: "<p>Core features include interactive canvas composition, signature clean-up using color-key transparency, scanning perspective correction, and local background removal. Adaptive client-side compression helps users fit their documents exactly within strict portal limits (like a 2MB maximum) before downloading the final generated PDF.</p>"

description2:
  show: yes
  title: Technical Implementation
  text1: "<p><strong>100% Local Device Execution:</strong> Built the entire application logic to execute natively in the browser. Heavy operations like perspective correction (mapping a 4-point quad to a flat rectangle to straighten mobile photo scans) and AI background removal (via <code>@imgly/background-removal</code>) are processed locally on the client's device, ensuring sensitive documents never leave the machine.</p>
  <p><strong>Wasm Squoosh Compression:</strong> Integrated a custom browser-compatible package (a personal fork of Google's Squoosh) that exposes the Wasm codec binaries directly as a web dependency. This allows the app to programmatically quantize transparent PNGs (from background removal) to 64/256 colors using the <code>oxipng</code> codec entirely client-side, dramatically reducing the weight of embedded images without compromising document clarity.</p>"
  text2: "<p><strong>Target-Size Optimization Search:</strong> Implemented a client-side binary search algorithm over JPEG compression levels. When users specify a target limit (e.g. 2MB), the engine dynamically adjusts the quality scale on the local canvas export until the generated PDF fits precisely under the threshold.</p>
  <p><strong>Offline-First Architecture:</strong> Leveraging <code>react-konva</code> for interactive manipulation and <code>PDF.js</code> (running in a Web Worker) for rendering PDF pages locally. The final PDF is compiled directly on-device using <code>pdf-lib</code>, making the application fast, highly secure, and completely independent of any server infrastructure.</p>"
---
