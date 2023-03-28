const firebase = require('../firebase');
const { index } = require('../algolia');

const servicesRef = firebase.db.collection('ServicesInfo');

async function manualSync() {
  try {
    const servicesSnapshot = await servicesRef.get();
    const services = [];
  
    servicesSnapshot.forEach((doc) => {
      const serviceData = doc.data();
      services.push({ ...serviceData, objectID: doc.id });
    });
  
    await index.saveObjects(services);
    
  } catch (error) {
    console.log(error)
  }
}

module.exports = { manualSync };