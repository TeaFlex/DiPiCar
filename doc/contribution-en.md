# Contribute to the project

If you want to help us in the development of DiPi Car, you can follow these few steps in order to have a ready-to-go project.

> Note: This project must be developed on a Raspberry Pi of any model.

1. **Clone the repository**

With the command:
```
git clone https://github.com/teaflex/dipicar
```
Then checkout to the wip branch:
```
git checkout wip
```

2. **Install the dependencies**

In the dipicar directory, run this script:
```
sudo ./scripts/devInstall.py
```
The above script will install all the aptitude dependencies and then the npm ones.

3. **Run the tests**

This is not necessary but if all the previous steps were correctly done, these must run without any problem.
```
npm run test
```
> Note: The script creating the access point is runned before the tests.

4. **Start contributing**

Now you just need to add your features to the project ! You can start the project with `npm start` and nodemon will got you covered when you'll make a change in the code.
If you want to build your own debian package, you can run `npm run build` and a .deb file will spawn inside a "build" folder.

5. **Work with HTTPS**

To easily generate certificate, use the following command:
```
npm run genssl
```
You will then, at the next `npm start`, benefit a HTTPS connection.
> Note: generated certificates can be replaced by any other certificate.
