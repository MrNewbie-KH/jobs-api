# What is the structure that we use ?

1. controllers folder
   - controllers contains different functionality to the system
   - here we can require the **error handlers** which we need to use
   - also include the **model** or schema that this functionality will use
   - This must be export the functionality which gonna be used in **routers**
2. db contains only the connection to mongoose
   absolutely what we require here is the mongoose only

```js
const mongoose = require("mongoose");
const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};
module.exports = connectDB;
```

3. errors folder containing different error classes so each can be used in different situation
4. middleware folder here different middlewares must be implemented in order to be then called in the main app
5. models folder :
   here we have different models schemas that are implemented in by mongoose for example here in the current project we have schema for the jobs itself and another schema for each user who logs to the system
6. routers:
   at routers we implement different routes which gonna be get post delete patch ...etc.
7. .env file that we use to keep our secrets
8. app.js the main file that we use in order to make our project works easily.

---

# How to start the project ?

    1. start with controllers functions here we have two diferrent controllers
       1. Authentication such as login and signUp or register
       2. jobs functionality just CRUD operations

---

---

# How to hash a password?

look man we gonna use _bcrypt_ for hashing algorithm
instead of using it in the controllers itself
we gonna make the hashing using **mongoose_middleware** as it gonna be used as pre save. this is much cleaner to be done.

---

---

# What is the expiration time in the token and why verify the token?

- ***

  ***

# How I built this app :

1. Build controllers
   diffrent controolers were built just as demo
2. routers connected to the controllers
3. database connection to atlas by connecting to **connectDB**
4. building two different models in the schema and export them to the controllers where they will be used
5. testing in **POSTMAN**
6. instead of having dummy messages in each controller we start the true work by using schemas we've built to create usere and so on.
7. validation for input fields in the request must be taken into consideration
8. Hash the password using **bcrypt.js**

   - take into consideration that implementing the hashing algorithm can be done in two different places in the controller or in the model itself using preSave

   ```js
   // ============================================================
   const { name, email, password } = req.body;
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
   const tempUser = { name, email, password: hashedPassword };
   // ============================================================
   ```

   _instead of this we used_

   ```js
   // ============================================================
   const bcrypt = require("bcryptjs");
   userSchema.pre("save", async function (next) {
     const salt = await bscrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password, salt);
     next();
   });

   // ============================================================
   ```

   so here pre saving we did the hashing we wanted.

9. Time to create **Tokens**
   - always make the token like userID somethingID and so on
   - but this way can be done in two ways :
     - fisrt way by using jwt in the controller itself **"Not dood enough"**
     - second way using **instance methods** in the mongoose itself.
10. after finishing the register then we start controling the **login**
    what login is about?

- Look if this user already have an account
- comparing provided password to the stored one. by building comparing **instance method** and be called in the controller in order to add level of abstraction.

11. Build authenticartion middleware
    here a middleware for authentication must be provided?
    yeah it is a must cuz when token verified then userId can be passed to the **job routes** to start handling his own account
    look when we registered a token was created and also when log in we create a token, but why ?
    _if token not provided as in header then how can we say what can be done by who_
12. create job model :

- each job should have company, createdBy, position
  **Never forget to export the model**
- timestamps ia added to track created at and modifies at

13. controllers for each CRUD operation in the jobs

- create job
- get all jobs
- get single job
  here in the single job there is a note about it
  we look for a specific job by its **id**
- update job
- delete job

14. during the work we said it is a must to make token dynamically in postman instead of **ctrl+c ctrl+v**
15. Make error messages friendly not a block of code or any stupid one.

- Duplicate error such as when someone register with same email.

---

# Steps to do :

#### steps to do token verification in auth middleware

1. check the header
2. extract the token from the header
3. take the **payload** and attach the userId to be sent to the job routes
4. always use next() and also export the auth function cuz it will be used in the jobs
