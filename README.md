# What Even Is A React (And So Can You!)

This is a set of exercises for learning about React by reimplementing its core
functionality from scratch. It takes the form of a series of automated tests
that you must gradually enable. As you make each test pass, you’ll learn more
about the React API and how it works under the hood.

To get started:

* Clone this repo and `cd` into it.
* Run `npm install`.
* Run `npm test`. You’ll see a lot of pending tests and (hopefully) no
  failures.
* Open `lib/fake-react.js` and `lib/fake-react-dom.js` in your editor. This is
  where your reimplementations of React and ReactDOM will live.
* Open `spec/react.spec.js` in your editor and follow the instructions in the
  comments there. As you enable each test, run `npm test` again to see it fail,
  then write the necessary code in `lib/fake-react.js` and
  `lib/fake-react-dom.js` to make it pass.
* If you get all the way to the end, open `demo.html` in your browser to see a
  working React app that uses the implementation you’ve just built.

There’s a [cheat sheet](cheat-sheet.pdf) with a summary of React, ReactDOM, DOM
and JavaScript APIs that might be helpful for completing the exercises.
