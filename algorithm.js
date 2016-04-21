//These commits are coming from the user akim14 because I'm currently
//borrowing a friend's computer to do this (mine is dead). It's me, Josh!

//I'm assuming that checkIn is a business, as described on the Yelp API site.

//Also, if businesses is global or something I won't need to pass it every
//time. I have it in there though, to show what info each function needs.

function algorithm(businesses, checkIn) {
	var theBase = base(businesses, checkIn);
	var theBonus = bonus(businesses, checkIn);
	var thePenalty = penalty(businesses, checkIn);

	return theBase + theBonus - thePenalty;
}

function base(businesses, checkIn) {
  var base = 0;

  for (var i = 0; i < top100.length; i++) {
    if (top100[i]["restaurant"] == checkIn.name) {
      base = -Math.sqrt(101 - top100[i]["rank"]);
      return base;
    }
  }

  var avg_reviews = avgNumReviews(businesses);
  if (checkIn.review_count != 0 && avg_reviews != 0) {
    base = 10 - 4 * Math.log(checkIn.review_count / avg_reviews);
  }
  else {
    base = 10;
  }

  return base;
}

function bonus(businesses, checkIn) {
  var bonus_tags = ["csa", "ethnicgrocery", "ethnicmarkets", 
    "farmersmarket", "foodtrucks", "internetcafe", "kombucha",
    "organic_stores", "healthmarkets", "streetvendors", "vegan", 
    "vegetarian"];
  var num_tags = 0;
  var bonus = 0;

  for (var i = 0; i < bonus_tags.length; i++) {
    for (var j = 0; j < checkIn.categories.length; j++) {
  	  if (bonus_tags[i] == checkIn.categories[j][1]) {
  		num_tags += 1;
  	  }
  	}
  }

  if (num_tags == 1) {
    bonus = 5;
  }
  else if (num_tags == 2) {
  	bonus = 10;
  }
  else if (num_tags > 2) {
  	bonus = 20;
  }

  if (checkIn.review_count == 0) {
  	bonus = bonus * 1.5;
  }

  return bonus;
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