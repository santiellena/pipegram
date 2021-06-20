const scopes = {
    public: [
        'login:auth',
        'register:auth',
        'read:user-chats',
        'read:user',
        'create:user-messages',
        'create:user-chats',
        'delete:user-messages',
    ],
    admin: [
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
    ],
};

module.exports = scopes;