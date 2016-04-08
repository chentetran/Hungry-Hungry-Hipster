//These commits are coming from the user akim14 because I'm currently
//borrowing a friend's computer to do this (mine is dead). It's me, Josh!

//I'm using "checkIn" as a placeholder for the business the user checks in
//from. This will have to be adjusted to agree with the actual syntax. I'm
//assuming that checkIn is a business, as described on the Yelp API site.

function algorithm(businesses, checkIn) {
	var base = base_score(businesses, checkIn);
	var plus = bonus(businesses, checkIn);
	var minus = penalty(businesses, checkIn);

	return base + plus - minus;
}

function base_score(businesses, checkIn) {
  var base = 0;

  //base score hit if on the list of 100 largest restaurants
  var top100 = JSON.parse('top100restaurants.json');
  for (var i = 0; i < top100.length; i++) {
	if (top100[i]["restaurant"] == checkIn.name) {
	  base = -Math.sqrt(101 - top100[i]["rank"]);
	  return base;
  }

  //base score boost if fewer reviews than other nearby restaurants, and vice versa
  var avg_reviews = avgNumReviews(businesses);

  if (checkIn.review_count != 0 && avg_reviews != 0) {
    base = 10 / (checkIn.review_count / avg_reviews);
  }
  else {
  	base = 10;
  }

  return base;
}

//

}

function bonus(businesses, checkIn) {

}

function penalty(businesses, checkIn) {

}

function avgNumReviews(businesses) {

}