---
# preview details
layout: works-single
title: TinyHands
category: Mobile App
category_slugs:
  - mobile-development
image: assets/img/works/tinyhands/tinyhands.jpg
short_description: A native Android utility providing full-screen touch blocking via system overlays and a secure, position-locked triple-tap gesture, without requiring Accessibility Services.

# full details
preview_url: https://github.com/Bit-Blazer/TinyHands
full_image: assets/img/works/tinyhands/tinyhands-full.jpg
info:
  - label: Year
    value: 2026

  - label: Technology
    value: Android SDK, Kotlin, Foreground Services, WindowManager Overlay, TileService

  - label: Platform
    value: Android (Kotlin)

description1:
  show: yes
  title: Project Overview
  text1: "<p>TinyHands is a utility application for Android designed to solve the common issue of accidental touch inputs (e.g., when showing videos to toddlers or handling a phone). By creating a system-level overlay, the app locks the screen to block all touches while allowing the underlying app to continue running visibly. It runs as a persistent Foreground Service, ensuring it remains active in the background until explicitly dismissed.</p>"
  text2: "<p>Unlike typical overlay applications, TinyHands was built with security-sensitivity in mind. It entirely bypasses Android's Accessibility Services, ensuring it is compatible with banking and other high-security applications that flag or block accessibility-based overlays. To unlock the screen, the user performs a custom triple-tap gesture designed to prevent accidental triggers by toddlers.</p>"

description2:
  show: yes
  title: Technical Implementation
  text1: "<p><strong>Non-Intrusive Window Overlay:</strong> Configured a full-screen <code>WindowManager</code> overlay using the <code>TYPE_APPLICATION_OVERLAY</code> window type. By utilizing standard touch interception (returning true in <code>onTouchEvent</code>) instead of accessibility tools, the overlay blocks interaction without raising security exceptions in other apps.</p>
  <p><strong>Position-Locked Triple-Tap:</strong> Designed a custom gesture recognition algorithm to handle unlocking. To prevent random tapping from unlocking the device, all three taps must fall within a 600ms temporal window and remain clustered within a tight spatial radius of 80dp from the initial tap. Taps outside this boundary immediately reset the sequence.</p>
  <p><strong>Dynamic Orientation Handling:</strong> Integrated a <code>DisplayManager.DisplayListener</code> to intercept display rotation events. The service dynamically adjusts, removes, and re-attaches the overlay upon screen rotation to ensure that no gaps in touch blocking are exposed when the phone transitions between portrait and landscape modes.</p>"
  text2: "<p><strong>Interactive Progress Indicator:</strong> Draws a custom, corner-anchored padlock UI card directly on the overlay canvas. It displays progress dots that fill up sequentially as valid taps are detected, providing clear visual feedback before triggering a haptic vibration pattern upon successful unlock.</p>
  <p><strong>System Integrations:</strong> Implemented a Quick Settings system tile (using <code>TileService</code>) and Launcher Shortcuts to allow users to toggle the touch blocker immediately from the notification shade or home screen without needing to launch the main app UI.</p>"
---
