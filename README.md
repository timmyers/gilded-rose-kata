# timmyers Universe

Hi and welcome to team Gilded Rose in the timmyers universe.

Information shared with the circleci universe GildedRose is found [below](#circleci-universe).

This version is implemented in javascript.  

Current build status can be viewed at https://circleci.com/gh/timmyers/gilded-rose-kata. (currently failing due to failed test)  
Current test status can be seen visually at https://friendly-snyder-a6b587.netlify.com/.

## Local Instructions
The simplest way to run locally requires `yarn` or equivalent. Clone the repo, then:
```
cd js && yarn
```
To view the visual test results:
```
yarn test:local
```
To run the tests on the CLI:
```
yarn test:ci
```

If you do not want to install dependencies, you can also view the test results visually by opening
the `SpecRunner.html` and `TexttestFixture.html` files in your browser.


# CircleCI Universe

As you know, we are a small inn with a prime location in a prominent city ran
by a friendly innkeeper named Allison.  We also buy and sell only the finest
goods. Unfortunately, our goods are constantly degrading in quality as they
approach their sell by date.

We have a system in place that updates our inventory for us. It was developed
by a no-nonsense type named Leeroy, who has moved on to new adventures. Your
task is to add the new feature to our system so that we can begin selling a
new category of items.

First an introduction to our system:

  - All items have a sell-in value which denotes the number of days we have to
    sell the item

  - All items have a quality value which denotes how valuable the item is

  - At the end of each day our system lowers both values for every item

Pretty simple, right? Well this is where it gets interesting:

  - Once the sell by date has passed, quality degrades twice as fast

  - The quality of an item is never negative

  - "Aged Brie" actually increases in quality the older it gets

  - The quality of an item is never more than 50

  - "Sulfuras", being a legendary item, never has to be sold or decreases in
    quality

  - "Backstage passes", like aged brie, increases in quality as it's sell-in
    value approaches; quality increases by 2 when there are 10 days or less
    and by 3 when there are 5 days or less but quality drops to 0 after the
    concert

We have recently signed a supplier of conjured items. This requires an update
to our system:

  - "Conjured" items degrade in quality twice as fast as normal items

Feel free to make any changes to the update-quality method and add any new code
as long as everything still works correctly. However, do not alter the item
function as that belongs to the goblin in the corner who will insta-rage and
one-shot you as he doesn't believe in shared code ownership.


Just for clarification, an item can never have its quality increase above 50,
however "Sulfuras" is a legendary item and as such its quality is 80 and it
never alters.
