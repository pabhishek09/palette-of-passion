# Contentful Setup Guide

This guide explains how to set up the required content models in Contentful for the Palette of Passion website.

## Required Content Models

### 1. Artwork Content Model

**Content Type ID:** `artwork`

**Display Field:** `title`

**Fields:**
- **title** (Symbol, required, localized)
  - Field ID: `title`
  - Name: Title
  - Type: Symbol
  - Required: Yes
  - Localized: Yes

- **description** (Text, optional, localized)
  - Field ID: `description`
  - Name: Description
  - Type: Text
  - Required: No
  - Localized: Yes

- **image** (Link to Asset, required)
  - Field ID: `image`
  - Name: Image
  - Type: Link
  - Link Type: Asset
  - Required: Yes
  - Localized: No

### 2. Workshop Content Model

**Content Type ID:** `workshop`

**Display Field:** `title`

**Fields:**
- **title** (Symbol, required, localized)
  - Field ID: `title`
  - Name: Title
  - Type: Symbol
  - Required: Yes
  - Localized: Yes

- **description** (Text, optional, localized)
  - Field ID: `description`
  - Name: Description
  - Type: Text
  - Required: No
  - Localized: Yes

- **date** (Date, required)
  - Field ID: `date`
  - Name: Date
  - Type: Date
  - Required: Yes
  - Localized: No

- **eventbriteUrl** (Symbol, required)
  - Field ID: `eventbriteUrl`
  - Name: Eventbrite URL
  - Type: Symbol
  - Required: Yes
  - Localized: No
  - Validation: Must match Eventbrite URL pattern

- **image** (Link to Asset, optional)
  - Field ID: `image`
  - Name: Image
  - Type: Link
  - Link Type: Asset
  - Required: No
  - Localized: No

## Manual Setup Steps

1. **Log into Contentful**
   - Go to [contentful.com](https://contentful.com) and log into your account
   - Navigate to your space

2. **Create the Artwork Content Model**
   - Go to "Content model" in the sidebar
   - Click "Add content type"
   - Enter:
     - Name: `Artwork`
     - API identifier: `artwork`
     - Description: `Content model for artwork pieces`
   - Add the fields as specified above
   - Set "title" as the Display field
   - Click "Save" after adding all fields
   - Click "Publish"

3. **Create the Workshop Content Model**
   - Click "Add content type" again
   - Enter:
     - Name: `Workshop`
     - API identifier: `workshop`
     - Description: `Content model for workshop events`
   - Add the fields as specified above (including the Eventbrite URL validation)
   - Set "title" as the Display field
   - Click "Save" after adding all fields
   - Click "Publish"

## Automated Setup (Optional)

If you have a Contentful Management API token, you can run the automated setup:

1. **Get Management Token**
   - Go to [Contentful](https://app.contentful.com)
   - Navigate to Settings → API keys
   - Create a new Personal access token (or use existing)
   - Copy the token

2. **Add Environment Variables**
   ```bash
   # Add to your .env.local file
   CF_MANAGEMENT_TOKEN=your_management_token_here
   ```

3. **Run the Setup Script**
   ```bash
   pnpm run setup-contentful
   ```

   The script will create the content model automatically and publish it.

## Creating Content

After setting up the content model:

1. Go to "Content" in the sidebar
2. Click "Add entry" and select "Artwork"
3. Fill in the title, description (optional), and upload/select an image
4. Publish the entry

The website will automatically display the artworks in the featured section and on the artworks page.