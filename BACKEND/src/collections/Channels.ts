import { CollectionConfig } from "payload/types";

const Channels: CollectionConfig = { 
    slug: "channels", 
    auth: false,
    access: {
        create: () => true,
        update: () => true,
    },
    fields: [
        {
            name : "UserID",
            type: "relationship",
            relationTo: "users",
            hasMany: true,
        },
        {
            name: "groupName",
            type: "text",
            required: true,
        },
    ]

};
export default Channels;