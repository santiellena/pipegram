const config = require('../../config');

const usersMock = [
    {
        name: 'Santiago',
        username: 'santi',
        password: 'santi',
        email: 'santi@mail.com',
        profilePhoto: `${config.api.host}:${config.api.port}/${config.api.public.files}${config.api.public.defaultPhoto}`,
        contacts: [],
    },
    {
        name: 'Pedro',
        username: 'rey',
        password: 'rey',
        email: 'rey@mail.com',
        contacts: [],
    },
    {
        name: 'Ronnie',
        username: 'ronnie',
        password: 'ronnie',
        email: 'ronnie@mail.com',
        contacts: [],
    },
    {
        name: 'Pablo',
        username: 'djpablo',
        password: 'djpablo',
        email: 'djpablo@mail.com',
        contacts: [],
    },
];

module.exports = usersMock;