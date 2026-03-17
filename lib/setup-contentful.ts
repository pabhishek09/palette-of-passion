import contentfulManagement from 'contentful-management';

const { createClient } = contentfulManagement;

// Configure these environment vars in your deployment or .env.local
const SPACE_ID = process.env.CF_SPACE_ID ?? '';
const MANAGEMENT_TOKEN = process.env.CF_MANAGEMENT_TOKEN ?? ''; // Management token for creating content models

if (!MANAGEMENT_TOKEN) {
  console.error('❌ CF_MANAGEMENT_TOKEN environment variable is required for automated setup.');
  console.log('📝 Get your management token from: https://app.contentful.com/spaces/[SPACE_ID]/settings/api-keys');
  console.log('🔧 Add it to your .env.local file as: CF_MANAGEMENT_TOKEN=your_token_here');
  process.exit(1);
}

const managementClient = createClient({
  accessToken: MANAGEMENT_TOKEN,
});

export async function createArtworkContentModel() {
  try {
    const space = await managementClient.getSpace(SPACE_ID);
    const environment = await space.getEnvironment('master');

    // Check if content model already exists
    try {
      await environment.getContentType('artwork');
      console.log('Artwork content model already exists');
      return;
    } catch {
      // Content model doesn't exist, create it
    }

    // Create the artwork content model
    const contentType = await environment.createContentType({
      name: 'Artwork',
      description: 'Content model for artwork pieces',
      displayField: 'title',
      fields: [
        {
          id: 'title',
          name: 'Title',
          type: 'Symbol',
          localized: true,
          required: true,
          validations: [],
          disabled: false,
          omitted: false,
        },
        {
          id: 'description',
          name: 'Description',
          type: 'Text',
          localized: true,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
        },
        {
          id: 'image',
          name: 'Image',
          type: 'Link',
          localized: false,
          required: true,
          validations: [],
          disabled: false,
          omitted: false,
          linkType: 'Asset',
        },
      ],
    });

    // Publish the content model
    await contentType.publish();

    console.log('Artwork content model created and published successfully!');
  } catch (error) {
    console.error('Error creating artwork content model:', error);
  }
}

export async function createWorkshopContentModel() {
  try {
    const space = await managementClient.getSpace(SPACE_ID);
    const environment = await space.getEnvironment('master');

    // Check if content model already exists
    try {
      await environment.getContentType('workshop');
      console.log('Workshop content model already exists');
      return;
    } catch {
      // Content model doesn't exist, create it
    }

    // Create the workshop content model
    const contentType = await environment.createContentType({
      name: 'Workshop',
      description: 'Content model for workshop events',
      displayField: 'title',
      fields: [
        {
          id: 'title',
          name: 'Title',
          type: 'Symbol',
          localized: true,
          required: true,
          validations: [],
          disabled: false,
          omitted: false,
        },
        {
          id: 'description',
          name: 'Description',
          type: 'Text',
          localized: true,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
        },
        {
          id: 'date',
          name: 'Date',
          type: 'Date',
          localized: false,
          required: true,
          validations: [],
          disabled: false,
          omitted: false,
        },
        {
          id: 'eventbriteUrl',
          name: 'Eventbrite URL',
          type: 'Symbol',
          localized: false,
          required: true,
          validations: [
            {
              regexp: {
                pattern: '^https://www\\.eventbrite\\.com/.*',
                flags: '',
              },
            },
          ],
          disabled: false,
          omitted: false,
        },
        {
          id: 'image',
          name: 'Image',
          type: 'Link',
          localized: false,
          required: false,
          validations: [],
          disabled: false,
          omitted: false,
          linkType: 'Asset',
        },
      ],
    });

    // Publish the content model
    await contentType.publish();

    console.log('Workshop content model created and published successfully!');
  } catch (error) {
    console.error('Error creating workshop content model:', error);
  }
}