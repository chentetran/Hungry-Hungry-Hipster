//These commits are coming from the user akim14 because I'm currently
//borrowing a friend's computer to do this (mine is dead). It's me, Josh!

function algorithm(businesses) {
	var base = base_score(businesses);
	var plus = bonus(businesses);
	var minus = penalty(businesses);

	return base + plus - minus;
}

function base_score(businesses) {
	var top100 = JSON.parse('top100restaurants.json');
	for (var i = 0; i < top100.length; i++) {
		//if on list, no soup for you
	}

}

function bonus(businesses) {

}

function penalty(businesses) {

}