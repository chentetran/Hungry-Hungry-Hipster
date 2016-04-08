//These commits are coming from the user akim14 because I'm currently
//borrowing a friend's computer to do this (mine is dead). It's me, Josh!

function algorithm(business) {
	var base = base_score(business);
	var plus = bonus(business);
	var minus = penalty(business);

	return base + plus - minus;
}

function base_score(business) {

}

function bonus(business) {

}

function penalty(business) {
	var top100 = JSON.parse('top100restaurants.json');

}