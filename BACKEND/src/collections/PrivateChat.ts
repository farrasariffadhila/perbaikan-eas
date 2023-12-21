// collections/PrivateChat.js

import { CollectionConfig, FieldHookArgs } from "payload/types";

const afterReadHook = async ({ data }: FieldHookArgs) => {
  const existingDocument = data; // Access the existing document through the 'data' property

  if (existingDocument.participants && existingDocument.participants.length > 2) {
    existingDocument.participants = existingDocument.participants.slice(0, 2);
  }
};

const PrivateChat: CollectionConfig = {
  slug: "private-chat",
  admin: {
    useAsTitle: "Private Chat",
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "participants",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: true,
      hooks: {
        afterRead: [afterReadHook],
      },
    },
    {
      name: "messages",
      type: "array",
      fields: [
        {
          name: "sender",
          type: "relationship",
          relationTo: "users",
          required: true,
        },
        {
          name: "content",
          type: "text",
          required: true,
        },
      ],
      required: true,
      defaultValue: [],
    },
  ],
};

export default PrivateChat;
