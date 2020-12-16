## 🚀 Get Up and Running in 5 Minutes

This is a simple demo book API that allows you to view, create, update and delete books and run two simple unit tests using mocha, should, sinon and supertest.

1. **Install the node_modules**

   ```shell
   npm install
   ```

2. **Create a MongoDB database**

   Either download and install locally or use MongoDB Atlas, create a database called bookAPI and a collection called books, to run the tests also create a database called BookAPI_test.

3. **Create a .env file and add the following**

   ```shell
   NODE_ENV = development
   PORT = 4000
   MONGO_URI = <ENTER YOUR CONNECTION STRING>
   MONGO_TEST_URI = <ENTER YOUR CONNECTION STRING>
   ```

4. **Upload demo data to the database**

If you've installed MongoDB locally you can use booksJson.js running the command

```shell
mongo bookAPI < booksJson.js
```

If you've used MongoDB Atlas you can import the books.json file into MongoDB Atlas.

5. **Run the server**

```shell
npm start
```

When the server has started simply go to http://localhost:4000/api/books

6. **Running the tests**

To run the demo tests simply run

```shell
npm test
```
