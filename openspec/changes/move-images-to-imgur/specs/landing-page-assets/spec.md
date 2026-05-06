# Landing Page Assets Specification

## Purpose

Define cómo se referencian y cargan los assets (imágenes) en la landing page de Adumawe, migrando de rutas locales a URLs externas de CDN.

## Requirements

### Requirement: Image References in HTML Files

All image references in HTML files (index.html and partials/) MUST use absolute Imgur URLs instead of relative paths to `assets/` folder.

#### Scenario: Hero section images

- GIVEN the hero section renders on the landing page
- WHEN displaying background carousel images
- THEN the `src` attributes MUST be `https://i.imgur.com/` URLs
- AND the `alt` attributes MUST describe the image content in Spanish

#### Scenario: Team member photos

- GIVEN the team section renders
- WHEN displaying team member cards
- THEN each team member photo MUST use an Imgur URL
- AND the `alt` attribute MUST contain the person's name

#### Scenario: Logo in header and footer

- GIVEN the header or footer renders
- WHEN displaying the Adumawe logo
- THEN the logo image MUST use an Imgur URL for `header-logo.svg`
- AND the `alt` attribute MUST be "Adumawe"

#### Scenario: About section certification badge

- GIVEN the about section renders
- WHEN displaying the NCH-2728 certification badge
- THEN the badge image MUST use an Imgur URL
- AND the `alt` attribute MUST describe the certification

### Requirement: No Local Asset Dependencies

The production deployment on GitHub Pages MUST NOT depend on files in the `assets/` folder.

#### Scenario: GitHub Pages deployment

- GIVEN the site is deployed via GitHub Actions to GitHub Pages
- WHEN the workflow completes successfully
- THEN all images MUST be loadable from Imgur CDN
- AND no 404 errors for images SHALL appear in browser console

#### Scenario: Local development

- GIVEN a developer runs the site locally
- WHEN opening index.html in a browser
- THEN all images MUST load from Imgur URLs
- AND the site MUST display correctly without local assets folder

### Requirement: Meta Tags for Social Sharing

Meta tags for Open Graph and Twitter Cards MUST reference Imgur URLs for images.

#### Scenario: Open Graph meta tags

- GIVEN the page is accessed by a social media scraper
- WHEN the scraper reads `og:image` meta tag
- THEN the content MUST be a valid Imgur URL pointing to `header-logo.svg`
- AND the image MUST be accessible via HTTPS

#### Scenario: Twitter Card meta tags

- GIVEN the page is shared on Twitter/X
- WHEN Twitter's crawler reads `twitter:image` meta tag
- THEN the content MUST be a valid Imgur URL pointing to `header-logo.svg`
- AND the image MUST display in the tweet card

## REMOVED Requirements

### Requirement: Local Asset References

(Reason: Migrating to external CDN to solve GitHub Pages deployment issues)

The system SHALL reference images using relative paths like `assets/image.jpg`.

#### Scenario: (Removed - no longer applicable)

- This requirement has been removed in favor of absolute Imgur URLs
