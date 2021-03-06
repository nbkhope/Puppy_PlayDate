# Puppy Play Date

Puppy Play Date is a community-based network connecting dogs to a healthy environment of other dogs.

## Screenshots

<div align="center">
<img src="screenshots/collage/login_signup_playdatemap.png">
<img src="screenshots/collage/userprofile_dogprofile_editdog.png">
<img src="screenshots/collage/playdate_page_alone.png">
</div>

You can see each screenshot in more detail in the [screenshots/](screenshots/README.md) directory.

## Team Members:

* [Ryan Wilkins](https://github.com/Tooconfident)
* [Carlos González](https://github.com/cyberpolin)
* [Renan Martins](https://github.com/nbkhope)
* [Buck Melton](https://github.com/buckmelton)

## Technologies

* React Native
* Ruby on Rails
* PostgreSQL

## User Stories

- A group is a collection of dogs, a set regular time and location.

- As a user I can
	- Create an account (sign-up, login)
	- Create a profile for user
	- Create a profile for my dogs
		- photo, name, breed, age, temperament, location
	- Look for groups in my area, or in my dog's area, or anywhere on the map
		- Click on the group pin to access group info
			- Choose to join the groups / contact the group creator
		- I can define how far away I want to look
	- Chat with my groups
		- Communicate with my group about status, special events, to build community, provide real-time flexibility for group


	- Create a group with a ... (location, set time)
	- Can make my group private or public
	- Select types of dogs your group is looking for (put tags on groups)
	- Accept new dogs into your group
	- Edit your group details

- A dog joins a group

- A user who has created a group can edit the group.
- A user who has created a group can leave the group, and an email gets sent to all other members of the group saying someone needs to become new creator otherwise group will be deleted within 14 days.


## Database Schema

![Database Schema](schema.png)

## Installation (MAC OS X)

### Front-End Environment

The front-end is an iOS application built using React Native.

You will need Brew, NodeJS and Xcode.

Then, install the React Native command line tools:

```
npm install -g react-native-cli
```

Install Watchman and Flow:
```
brew install watchman

brew install flow
```

To run the application, navigate to its directory and run the command:

```
react-native run-ios
```

#### Front-End Installation Notes

You might need to also to take care of Node dependencies using

```
npm install
```

In case you get an error where the development server is not running, type:

```
npm start
```

If you have trouble with the version of Node, you can install a newer version using:

```
npm install -g n
n v4.1.2

# Verify the Node version
node -v
```

##### JavaScript Linter

An **ESLint** configuration file (`.eslintrc`) has been added to use the `eslint-config-rallycoding` set of rules from npm. In order to enable ESLint, you have to install the ESLint module for your text editor. For example, for **Atom**, you need only install the **linter-eslint** package.

### Back-End Server

The backend is a Rails API application that serves JSON. It is located in the [puppy_play_date/](puppy_play_date/) directory.

After changing into the `puppy_play_date/` directory, run bundle to install all dependencies:

```
bundle install
```

Then, create, migrate, and seed the database:

```
bin/rake db:create db:migrate db:seed
```

(if you already have the database, but want to start from scratch, use `bin/rake db:drop` before executing the command above)

Run the server using:

```
bin/rails server
```

The backend API will be available at <http://localhost:3000/>

The API endpoints are:

```
/users/:id	(includes the user's dogs)
/dogs/:id
/playdates/:id  (includes the playdate's users)
```

Run `bin/rake routes` for more details about the endpoints.
