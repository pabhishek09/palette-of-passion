#!/usr/bin/env node

import { createArtworkContentModel, createWorkshopContentModel } from '../lib/setup-contentful.js';

async function main() {
  console.log('Setting up Contentful content models...');
  await createArtworkContentModel();
  await createWorkshopContentModel();
  console.log('Setup complete!');
}

main().catch(console.error);