const crypto = require('crypto');
const mongoStore = require('../../store/mongodb');
const model = require('./apiKeysModel');

const adminScopes = [
  'login:auth',
  'register:auth',
  'read:auth',
  'create:auth',
  'update:auth',
  'delete:auth',
  'read:users',
  'create:users',
  'update:users',
  'delete:users',
  'read:chat-messages',
  'create:chat-messages',
  'delete:chat-messages',
  'read:user-chats',
  'create:chats',
  'update:chats',
  'delete:chats',
];

const publicScopes = [
  'login:auth',
  'register:auth',
  'read:user-chats',
  'read:user',
  'create:user-messages',
  'create:user-chats',
  'delete:user-messages',
];

const apiKeys = [
  {
    token: generateRandomToken(),
    scopes: adminScopes,
  },
  {
    token: generateRandomToken(),
    scopes: publicScopes,
  },
];

function generateRandomToken() {
    
  const buffer = crypto.randomBytes(32);
  return buffer.toString('hex');
}

async function seedApiKeys() {
  try {
    mongoStore();

    const promises = apiKeys.map(async apiKey => {
      const newApiKey = await new model(apiKey);

      await newApiKey.save();
    });

    await Promise.all(promises);

      console.log(`${promises.length} api keys have been created succesfully`)
    
    return process.exit(0);

  } catch (error) {

    console.error(error);

    process.exit(1);
    }
}
// DEBUG=app:* node scripts/mongo/seedApiKeys.js

seedApiKeys();
