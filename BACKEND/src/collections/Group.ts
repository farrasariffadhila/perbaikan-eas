import { CollectionConfig } from "payload/types";

const Group: CollectionConfig = {
  slug: "group",
  admin: {
    useAsTitle: "Group",
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: "groupName",
      type: "text",
      required: true,
    },
    {
      name: "members",
      type: "array",
      required: true,
      fields: [
        {
          name: "member",
          type: "relationship",
          relationTo: "users",
          required: true,
        },
      ],
    },
    {
      name: "chats",
      type: "array",
      fields: [
        {
          name: "chat",
          type: "text",
        },
      ],
    },
  ],
};

export default Group;
