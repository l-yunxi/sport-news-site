// studio/schemas/post.js
export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    { 
      name: 'section',
      title: 'Type of article (Section)',
      type: 'string',
      options: {
        list: [
          { title: 'News', value: 'news' },
          { title: 'Encyclopedia', value: 'encyclopedia' },
          { title: 'Interviews', value: 'interviews' },
          { title: 'Analytics', value: 'analytics' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'dropdown'
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title' }
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Water polo', value: 'Water polo' },
          { title: 'Boxing', value: 'Boxing' },
          { title: 'Tennis', value: 'Tennis' },
          { title: 'Basketball', value: 'Basketball' },
          { title: 'Other', value: 'Other' }
        ]
      }
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' }, 
        {
          type: 'image', 
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
        {
          name: 'youtube',
          type: 'object',
          title: 'YouTube Video',
          fields: [
            {
              name: 'url',
              type: 'url',
              title: 'YouTube video URL',
            },
          ],
        },
      ],
    }
  ]
}