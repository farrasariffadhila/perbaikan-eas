import { CollectionConfig } from 'payload/types'

const Senders: CollectionConfig = {
  slug: 'senders',
  auth: true,
  access: {
    create: () => true,
    read: () => true,
  },
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'name',
      required: true,
      type: 'text',
    }
  ],
}

export default Senders
