// studio/schemaTypes/post.js
import {defineType, defineField} from 'sanity';
import {SubcategoryInput} from '../components/SubcategoryInput';

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'section',
      title: 'Type of article (Section)',
      type: 'string',
      options: {
        list: [
          { title: 'News', value: 'news' },
          { title: 'Encyclopedia', value: 'encyclopedia' },
          { title: 'Interviews', value: 'interviews' },
          { title: 'Analytics', value: 'analytics' },
        ],
        layout: 'radio',
      },
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {source: 'title'},
    }),

    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Swimming', value: 'swimming' },
          { title: 'Diving', value: 'diving' },
          { title: 'Rowing & Paddling Sports', value: 'rowing-and-paddling' },
          { title: 'Surfing & Board Sports', value: 'surfing-and-boards' },
          { title: 'Sailing Sports', value: 'sailing' },
          { title: 'Team Water Sports', value: 'team-water-sports' },
          { title: 'Underwater Sports', value: 'underwater-sports' },
          { title: 'Other', value: 'other' },
        ],
        layout: 'dropdown',
      },
      placeholder: 'Select category', 
      validation: Rule => Rule.required().error('Category is required'),
    }),
    defineField({
      name: 'subcategory',
      title: 'Subcategory',
      type: 'string',
      components: {
        input: SubcategoryInput,
      },
      validation: Rule => Rule.required().error('Subcategory is required'),
      hidden: ({document}) => !document?.category,
    }),
    defineField({
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
    })
  ],
});
