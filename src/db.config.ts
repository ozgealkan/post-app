import { DBConfig } from "ngx-indexed-db";

export const dbConfig: DBConfig = {
    name: 'zenigmaDB',
    version: 1,
    objectStoresMeta: [{
      store: 'posts',
      storeConfig: {keyPath: 'id', autoIncrement: true},
      storeSchema: [
        {name: 'title', keypath: 'title', options: { unique: false}},
        {name: 'content', keypath: 'content', options: { unique: false}},
        {name: 'displayCount', keypath: 'displayCount', options: { unique: false}},
        {name: 'moreInfo', keypath: 'moreInfo', options: { unique: false}},
        {name: 'userId', keypath: 'userId', options: { unique: false}},
        {name: 'username', keypath: 'username', options: { unique: false}},
        {name: 'published', keypath: 'published', options: { unique: false}},
        {name: 'createdAt', keypath: 'createdAt', options: { unique: false}},
        {name: 'updatedAt', keypath: 'updatedAt', options: { unique: false}},
      ]
    },
    {
      store: 'users',
      storeConfig: {keyPath: 'id', autoIncrement: true},
      storeSchema: [
        {name: 'name', keypath: 'name', options: { unique: false}},
        {name: 'surname', keypath: 'surname', options: { unique: false}},
        {name: 'email', keypath: 'email', options: { unique: false}},
        {name: 'password', keypath: 'password', options: { unique: false}},
        {name: 'created_at', keypath: 'created_at', options: { unique: false}}
      ]
    }]
  };
  