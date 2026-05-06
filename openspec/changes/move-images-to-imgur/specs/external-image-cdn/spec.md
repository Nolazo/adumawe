# External Image CDN Specification

## Purpose

Define el uso de un CDN externo (Imgur) para servir imágenes estáticas del sitio, asegurando disponibilidad confiable y reduciendo el peso del repositorio.

## Requirements

### Requirement: Image Hosting on Imgur

The system SHALL serve all static images from Imgur CDN (https://i.imgur.com/) instead of local assets folder.

#### Scenario: Load hero images from Imgur

- GIVEN the landing page is accessed via GitHub Pages
- WHEN the page loads
- THEN hero images SHALL be fetched from `https://i.imgur.com/` URLs
- AND images MUST display correctly without 404 errors

#### Scenario: Fallback for missing images

- GIVEN an image URL returns 404 from Imgur
- WHEN the page attempts to load the image
- THEN the browser SHALL show the broken image icon
- AND no JavaScript errors SHALL be thrown

### Requirement: Image URL Format

All image URLs MUST follow the Imgur direct link format: `https://i.imgur.com/{image-id}.{extension}`

#### Scenario: Valid Imgur URL structure

- GIVEN an image is uploaded to Imgur
- WHEN obtaining the direct link
- THEN the URL MUST match pattern `https://i.imgur.com/[A-Za-z0-9]+.(jpg|jpeg|png|gif|svg)`
- AND the URL MUST be accessible via HTTPS

### Requirement: Meta Tags Update

Open Graph and Twitter Card meta tags MUST use Imgur URLs for image references.

#### Scenario: Open Graph image meta tag

- GIVEN the page is shared on social media
- WHEN the social platform scrapes the page
- THEN `og:image` meta tag MUST contain the Imgur URL
- AND the image MUST be displayable in the social preview

#### Scenario: Twitter Card image meta tag

- GIVEN the page is shared on Twitter/X
- WHEN Twitter scrapes the page
- THEN `twitter:image` meta tag MUST contain the Imgur URL
- AND the image MUST appear in the tweet card
