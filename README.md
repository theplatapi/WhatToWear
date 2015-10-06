#TODO

##Technical debt
* Upgrade Meteor
* Replace font awesome with Meteor package
* Replace all templates with React components

##Profile Tab
* Icons needed for
  * Clubbing (disco ball)
  * Cold
  * Hipster (face with glasses)
* Have side bar close when a profile is selected
* See if we can make the pane size responsively
* Put the pane in it's own template

##Temperature Information
* Make a city search

##Avatar
* Have profile selecting change the avatar's clothes
* Pick better icons for some profiles
* Clothes needed
  * Sweatshirt
  * Undershirt
  * Boxers
  * Clothes for clubbing
  * Clothes for cold
  * Clothes for formal
  * Clothes for exercise
  * Clothes for hipster

##Dial
* Dial needs to tell day, time, and weather details.
* Intuitive way to know if the clock is wound up

##Settings under profiles
* Switch between male and female
  * If it's a user's first time, show top notification that gender can be set. Save gender and last selected profile in db.
  * Randomly select the order of the male and female buttons (?)
* Change number of days to look ahead. Default to end of second day.
  * Have a number with - and + buttons around it.

##Tests
###Unit Tests
* Make sure profiles returns clothes every degree between -100 and 100
###Acceptance Tests
* Make sure weather is in correct spot on mobile and desktop