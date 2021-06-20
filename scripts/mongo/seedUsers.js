const mongoStore = require('../../store/mongodb');
const userController = require('../../api/components/user/controller');
const usersMock = require('../../utils/mocks/user');

async function seedUsers() {
  try {
    mongoStore();

    const promises = usersMock.map(async (user) => {
      
      await userController.createUser(user);
    });

    await Promise.all(promises);

    console.log(`${promises.length} users have been created succesfully`);

    process.exit(0);
    
  } catch (error) {

    console.error(error);
    process.exit(1);
  };
};

seedUsers();
