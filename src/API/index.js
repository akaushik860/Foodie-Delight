  //MIMIC POST API for storing data as I don't have any actual API
 const addRestuarant = (newData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate API success response with the new data
            resolve(newData);
        }, 1000); // Simulate a 1-second delay
    });
};

export default addRestuarant;

