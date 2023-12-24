const { v4: uuidv4 } = require('uuid');
exports.generateUUID = () => {
    const myUUID = uuidv4();
    console.log('Generated UUID:', myUUID);
}