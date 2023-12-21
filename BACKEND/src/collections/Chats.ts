import { CollectionConfig } from 'payload/types'

const Chats: CollectionConfig = {
  slug: 'chats',
  access: {
    create: () => true,
    read: () => true,
  },
  fields: [
    {
      name: 'senderEmail',
      type: 'text',
      defaultValue: ({ user }) => user.email,
    },
    {
      name: 'recipientEmail',
      required: true,
      type: 'text'
    },
    {
      name: 'content',
      required: false,
      type: 'textarea',
    }
  ],
}

export default Chats
