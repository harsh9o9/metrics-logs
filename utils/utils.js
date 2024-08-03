function someHeavyTask() {
  // Random delay between 1 and 3 seconds
  const delay = Math.floor(Math.random() * 2000) + 1000;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve("Heavy task completed successfully");
      } else {
        let errors = [
          "Internal Server error",
          "Invalid input",
          "Database error",
          "Network error",
          "Unknown error",
        ];
        const randomNumber = Math.floor(Math.random() * 5);
        reject(new Error(errors[randomNumber]));
      }
    }, delay);
  });
}

module.exports = { someHeavyTask };
