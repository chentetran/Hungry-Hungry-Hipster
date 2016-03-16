Project title:

Problem statement (i.e., what is the problem?)
It’s easy for people to fall into a rut of visiting the same well-established
places for food over and over again. People are afraid of stepping out of their
comfort zone and need motivation to go and try both new and lesser-known 
things.

How do you solve the problem?
We can solve this problem by gamifying the search for lesser-known restaurants.
Once at a restaurant of their choice, the user will check in, allowing the
restaurant they’re in to be determined from their current location; nearby
restaurants will then be listed in order for the user to specify the correct 
one. Once the restaurant is determined, we will use a combination of factors
(Yelp reviews, number of previous check-ins, is it a major chain, etc.) in
order to assign a score for the “hipsterness” of the restaurant; the more 
hipster, the more points. The user will not know the restaurant’s score until
after they check in, at which point the score, be it high or low, will be added
to their personal total. They will then be able to compare their scores with 
their Facebook friends, and some statistics (their personal average score, 
recent high scores, change in hipster level over time, etc.) will be provided.
In theory, this is a fun way to push users to eat at unique, less-frequented 
establishments.

List of all the features that your team will implement:
	- Geolocation
	- Client-side data pers
	- Front-end framework including Bootstrap
	- Reporting with charts and graphs

What data will your prototype be using and collecting
	- Location (at each check in)
	- Social information (either by having access to Facebook friends list in 
	  order to compete with them, or adding friends individually)
	- Username/password 

Any algorithms or special techniques that will be necessary
We will need to create an algorithm for calculating how “hipster” a restaurant
is, based on Yelp reviews (the fewer reviews, the better). Additionally, the 
more of your friends check in at a location, the fewer points you could earn 
from the place. Other factors that influence points for a restaurant include:
less common food types/ones you haven’t visited yet, “hipster” ambiance on
Yelp, fewer searches on Google, accessibility to public transportation, etc.

Electronic mockups:
![Mockup1](/images/mockup1.png)
![Mockup2](/images/mockup2.jpg)

#Comments by Ming
* How will your team determine what restaurants are "lesser known"?  Your team listed the pick 4 but not what you are going to do with them (i.e., features).  Example of a feature: "Show hipness using charts and graphs".  What third-party APIs or data will your team be using for restaurants?
* 12 / 15
