# flashcards [![Codacy Badge][grade-image]][grade][![Codacy Badge][coverage-image]][coverage]
A mobile flashcard app that lets you create different categories of flashcards called decks, add flashcards to those decks, then take quizzes on those decks.

## Setup

```sh
yarn install
```

## How to run

```sh
yarn start
```
## Tests

```sh
yarn test
```

## Screenshots
### Main screen
The primary view, seen when the app loads, is a list of created decks which includes the name of each deck and the number of cards.

![main-screen][main-screen-image]
### Create/Edit screen
The Create/Edit view includes a form with the deck fields and a FAB to create a new flashcard with a question and answer fields.

![create-edit-screen][create-edit-screen-image]
### Details screen
The individual deck view, seen when the deck is pressed, includes:
- List of created decks
- Option to start a quiz for that deck
- Option to edit that deck

![create-edit-screen][details-screen-image]
### Quiz screen
The quiz view displays all flashcards for that deck, each flashcard is displayed, along with a button to show the answer.
Buttons are included to allow the student to mark their guess as 'Correct' or 'Incorrect'. When the last flashcard is answered, a score is displayed

![create-edit-screen][quiz-screen-image]

[grade-image]: https://api.codacy.com/project/badge/Grade/db0ec79b4b484186a99a12e6ba89ad2b
[grade]: https://app.codacy.com/app/bruno.f.castro12/flashcards?utm_source=github.com&utm_medium=referral&utm_content=brunohkbx/flashcards&utm_campaign=Badge_Grade_Dashboard
[coverage-image]: https://api.codacy.com/project/badge/Coverage/2143017ebe4142d88e4a45391694f385
[coverage]: https://www.codacy.com/app/bruno.f.castro12/flashcards?utm_source=github.com&utm_medium=referral&utm_content=brunohkbx/flashcards&utm_campaign=Badge_Coverage
[main-screen-image]: screenshots/main.jpeg
[create-edit-screen-image]: screenshots/create-edit.jpeg
[details-screen-image]: screenshots/details.jpeg
[quiz-screen-image]: screenshots/quiz.jpeg
