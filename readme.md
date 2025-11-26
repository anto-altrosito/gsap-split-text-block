# GSAP Split Text Block

A custom Gutenberg block that applies GSAP and SplitType animations to headings, paragraphs and list items in WordPress.  
Designed for high-end, modern animations such as fade, slide, scale, rotate, blur, flip, skew and bounce — with full control over timing and scroll-trigger behaviour.

---

## Features

- Split text into **characters**, **words**, **lines**, or combined modes
- Multiple animation presets (fade, slide, rotate, scale, blur, flip, skew, bounce)
- Customizable **duration**, **stagger**, **delay**
- Optional **ScrollTrigger** activation with configurable start positions
- Works with any theme and layout (Full/Wide alignment supported)
- Fully compatible with Gutenberg’s spacing, color, and alignment controls
- Editor preview label for better block visibility in the editor
- Zero-FOUC implementation with `.gsap-split-ready`

---

## Requirements

- WordPress 6.0+
- PHP 7.4+
- Node.js 16+ (only for building assets)

---

## Installation

### From source (recommended for developers)

Clone or download the plugin into:

wp-content/plugins/gsap-split-text-block


Then install dependencies and build:

```bash
npm install
npm run build


Finally, activate the plugin via:

WordPress Dashboard → Plugins → Installed Plugins



Usage

Open the WordPress block editor (Gutenberg).

Insert the block "GSAP Animated Content" from the Design category.

Add headings, paragraphs, or list items inside the block.

Configure animation settings from the Inspector panel:

Split Type: chars / words / lines / chars+words

Animation Type: fade, slide, rotate, scale, blur, flip, skew, bounce

Duration, Stagger, Delay

Enable or disable ScrollTrigger

Adjust ScrollTrigger start position (e.g. top 80%, center center)

Animations are applied automatically on the frontend.