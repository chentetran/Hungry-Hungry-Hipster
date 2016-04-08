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

  var top100 = JSON.parse('top100restaurants.json');
  for (var i = 0; i < top100.length; i++) {
	if (top100[i]["restaurant"] == checkIn.name) {
	  base = -Math.sqrt(101 - top100[i]["rank"]);
	  return base;
  }

  var avg_reviews = avgNumReviews(businesses);
  if (checkIn.review_count != 0 && avg_reviews != 0) {
    base = 10 / (checkIn.review_count / avg_reviews);
  }
  else {
  	base = 10;
  }

  return base;
}

function bonus(businesses, checkIn) {

}

function penalty(businesses, checkIn) {
  var penalty_tags = ["convenience", "grocery", "tradamerican",
	"italian", "pizza", "chinese", "cafeteria", "hotdogs"];
  var num_tags = 0;
  var penalty = 0;
  
  for (var i = 0; i < penalty_tags.length; i++) {
  	for (var j = 0; j < checkIn.categories.length; j++) {
  	  if (penalty_tags[i] == checkIn.categories[j][1]) {
  		num_tags += 1;
  	  }
  	}
  }

  if (num_tags == 1) {
    penalty = 5;
  }
  else if (num_tags > 1) {
  	penalty = 10;
  }

  if (businesses.length == 1) {
  	penalty = penalty / 4;
  }

  //Penalty for visiting the same business twice?

  return penalty;
}

function avgNumReviews(businesses) {
  var sum = 0;
  
  for (var i = 0; i < businesses.length; i++) {
	sum += businesses[i].review_count;
  }

  return sum / businesses.length;
}