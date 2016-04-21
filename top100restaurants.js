//The following site was used to convert the list from CSV to JSON:
//http://www.convertcsv.com/csv-to-json.htm

var top100 = [
  {
    "rank":1,
    "restaurant":"McDonald's"
  },
  {
    "rank":2,
    "restaurant":"Subway"
  },
  {
    "rank":3,
    "restaurant":"Starbucks Coffee"
  },
  {
    "rank":3,
    "restaurant":"Starbucks"
  },
  {
    "rank":4,
    "restaurant":"Burger King"
  },
  {
    "rank":5,
    "restaurant":"Wendy's"
  },
  {
    "rank":6,
    "restaurant":"Taco Bell"
  },
  {
    "rank":7,
    "restaurant":"Dunkin' Donuts"
  },
  {
    "rank":8,
    "restaurant":"Pizza Hut"
  },
  {
    "rank":9,
    "restaurant":"KFC"
  },
  {
    "rank":10,
    "restaurant":"Applebee's Neighborhood Grill & Bar"
  },
  {
    "rank":10,
    "restaurant":"Applebee's"
  },
  {
    "rank":11,
    "restaurant":"Chick-fil-A"
  },
  {
    "rank":12,
    "restaurant":"Sonic, America's Drive-In"
  },
  {
    "rank":12,
    "restaurant":"Sonic"
  },
  {
    "rank":13,
    "restaurant":"Olive Garden"
  },
  {
    "rank":14,
    "restaurant":"Chili's Grill & Bar"
  },
  {
    "rank":14,
    "restaurant":"Chili's"
  },
  {
    "rank":15,
    "restaurant":"Domino's Pizza"
  },
  {
    "rank":15,
    "restaurant":"Domino's"
  },
  {
    "rank":16,
    "restaurant":"Panera Bread"
  },
  {
    "rank":17,
    "restaurant":"Jack in the Box"
  },
  {
    "rank":18,
    "restaurant":"Arby's"
  },
  {
    "rank":19,
    "restaurant":"Dairy Queen"
  },
  {
    "rank":20,
    "restaurant":"Red Lobster"
  },
  {
    "rank":21,
    "restaurant":"IHOP"
  },
  {
    "rank":22,
    "restaurant":"Denny's"
  },
  {
    "rank":23,
    "restaurant":"Outback Steakhouse"
  },
  {
    "rank":24,
    "restaurant":"Chipotle Mexican Grill"
  },
  {
    "rank":24,
    "restaurant":"Chipotle"
  },
  {
    "rank":25,
    "restaurant":"Papa John's Pizza"
  },
  {
    "rank":25,
    "restaurant":"Papa John's"
  },
  {
    "rank":26,
    "restaurant":"Buffalo Wild Wings Grill & Bar"
  },
  {
    "rank":26,
    "restaurant":"Buffalo Wild Wings"
  },
  {
    "rank":27,
    "restaurant":"Cracker Barrel Old Country Store"
  },
  {
    "rank":27,
    "restaurant":"Cracker Barrel"
  },
  {
    "rank":28,
    "restaurant":"Hardee's"
  },
  {
    "rank":29,
    "restaurant":"T.G.I. Friday's"
  },
  {
    "rank":30,
    "restaurant":"7-Eleven"
  },
  {
    "rank":31,
    "restaurant":"Popeyes Louisiana Kitchen"
  },
  {
    "rank":31,
    "restaurant":"Popeyes"
  },
  {
    "rank":32,
    "restaurant":"Golden Corral"
  },
  {
    "rank":33,
    "restaurant":"The Cheesecake Factory"
  },
  {
    "rank":34,
    "restaurant":"Panda Express"
  },
  {
    "rank":35,
    "restaurant":"Disney theme parks, hotels & resorts"
  },
  {
    "rank":35,
    "restaurant":"Disney"
  },
  {
    "rank":36,
    "restaurant":"Little Caesars Pizza"
  },
  {
    "rank":36,
    "restaurant":"Little Caesars"
  },
  {
    "rank":37,
    "restaurant":"Carl's Jr."
  },
  {
    "rank":38,
    "restaurant":"Ruby Tuesday"
  },
  {
    "rank":39,
    "restaurant":"Texas Roadhouse"
  },
  {
    "rank":40,
    "restaurant":"Whataburger"
  },
  {
    "rank":41,
    "restaurant":"Marriott Hotels & Resorts"
  },
  {
    "rank":41,
    "restaurant":"Marriott"
  },
  {
    "rank":42,
    "restaurant":"Red Robin Gourmet Burgers & Spirits"
  },
  {
    "rank":42,
    "restaurant":"Red Robin"
  },
  {
    "rank":43,
    "restaurant":"Hilton Hotels"
  },
  {
    "rank":44,
    "restaurant":"LongHorn Steakhouse"
  },
  {
    "rank":45,
    "restaurant":"Jimmy John's"
  },
  {
    "rank":46,
    "restaurant":"Waffle House"
  },
  {
    "rank":47,
    "restaurant":"Bob Evans Restaurants"
  },
  {
    "rank":47,
    "restaurant":"Bob Evans"
  },
  {
    "rank":48,
    "restaurant":"Five Guys Burgers and Fries"
  },
  {
    "rank":48,
    "restaurant":"Five Guys"
  },
  {
    "rank":49,
    "restaurant":"P.F. Chang's China Bistro"
  },
  {
    "rank":49,
    "restaurant":"P.F. Chang's"
  },
  {
    "rank":50,
    "restaurant":"Sheraton Hotels"
  },
  {
    "rank":50,
    "restaurant":"Sheraton"
  },
  {
    "rank":51,
    "restaurant":"Church's Chicken"
  },
  {
    "rank":52,
    "restaurant":"Hooters"
  },
  {
    "rank":53,
    "restaurant":"Holiday Inn"
  },
  {
    "rank":54,
    "restaurant":"Quiznos Sub"
  },
  {
    "rank":54,
    "restaurant":"Quiznos"
  },
  {
    "rank":55,
    "restaurant":"Zaxby's"
  },
  {
    "rank":56,
    "restaurant":"Steak n Shake"
  },
  {
    "rank":57,
    "restaurant":"Bojangles' Famous Chicken 'n Biscuits"
  },
  {
    "rank":57,
    "restaurant":"Bojangles'"
  },
  {
    "rank":57,
    "restaurant":"Bojangles"
  },
  {
    "rank":58,
    "restaurant":"Culver's"
  },
  {
    "rank":59,
    "restaurant":"Long John Silver's"
  },
  {
    "rank":60,
    "restaurant":"Papa Murphy's Take 'N' Bake Pizza"
  },
  {
    "rank":60,
    "restaurant":"Papa Murphy's"
  },
  {
    "rank":61,
    "restaurant":"Perkins Restaurant and Bakery"
  },
  {
    "rank":62,
    "restaurant":"Carrabba's Italian Grill"
  },
  {
    "rank":63,
    "restaurant":"California Pizza Kitchen"
  },
  {
    "rank":64,
    "restaurant":"Logan's Roadhouse"
  },
  {
    "rank":65,
    "restaurant":"Romano's Macaroni Grill"
  },
  {
    "rank":66,
    "restaurant":"BJ's Restaurant & Brewery"
  },
  {
    "rank":66,
    "restaurant":"BJ's Restaurant & Brewhouse"
  },
  {
    "rank":67,
    "restaurant":"In-N-Out Burger"
  },
  {
    "rank":68,
    "restaurant":"Del Taco"
  },
  {
    "rank":69,
    "restaurant":"Hyatt Hotels"
  },
  {
    "rank":69,
    "restaurant":"Hyatt"
  },
  {
    "rank":70,
    "restaurant":"Circle K"
  },
  {
    "rank":71,
    "restaurant":"Friendly's Ice Cream"
  },
  {
    "rank":71,
    "restaurant":"Friendly's"
  },
  {
    "rank":72,
    "restaurant":"El Pollo Loco"
  },
  {
    "rank":73,
    "restaurant":"Costco"
  },
  {
    "rank":74,
    "restaurant":"Jason's Deli"
  },
  {
    "rank":75,
    "restaurant":"O'Charley's"
  },
  {
    "rank":76,
    "restaurant":"Boston Market"
  },
  {
    "rank":77,
    "restaurant":"Krispy Kreme Doughnuts"
  },
  {
    "rank":77,
    "restaurant":"Krispy Kreme"
  },
  {
    "rank":78,
    "restaurant":"Wawa"
  },
  {
    "rank":79,
    "restaurant":"Qdoba Mexican Grill"
  },
  {
    "rank":79,
    "restaurant":"Qdoba"
  },
  {
    "rank":80,
    "restaurant":"White Castle"
  },
  {
    "rank":81,
    "restaurant":"Cici's Pizza"
  },
  {
    "rank":81,
    "restaurant":"Cici's"
  },
  {
    "rank":82,
    "restaurant":"Casey's General Store"
  },
  {
    "rank":82,
    "restaurant":"Casey's"
  },
  {
    "rank":83,
    "restaurant":"Baskin-Robbins"
  },
  {
    "rank":84,
    "restaurant":"Famous Dave's"
  },
  {
    "rank":85,
    "restaurant":"Tim Hortons"
  },
  {
    "rank":86,
    "restaurant":"Ruth's Chris Steak House"
  },
  {
    "rank":87,
    "restaurant":"Target Cafe"
  },
  {
    "rank":87,
    "restaurant":"Target"
  },
  {
    "rank":88,
    "restaurant":"Westin Hotels & Resorts"
  },
  {
    "rank":88,
    "restaurant":"Westin"
  },
  {
    "rank":89,
    "restaurant":"Bonefish Grill"
  },
  {
    "rank":90,
    "restaurant":"Sheetz"
  },
  {
    "rank":91,
    "restaurant":"Jamba Juice"
  },
  {
    "rank":92,
    "restaurant":"Cheddar's"
  },
  {
    "rank":93,
    "restaurant":"Einstein Bros. Bagels"
  },
  {
    "rank":93,
    "restaurant":"Einstein Brothers Bagels"
  },
  {
    "rank":93,
    "restaurant":"Einstein Bros"
  },
  {
    "rank":94,
    "restaurant":"Captain D's Seafood"
  },
  {
    "rank":94,
    "restaurant":"Captain D's"
  },
  {
    "rank":95,
    "restaurant":"Checkers"
  },
  {
    "rank":96,
    "restaurant":"Sbarro, The Italian Eatery"
  },
  {
    "rank":96,
    "restaurant":"Sbarro"
  },
  {
    "rank":97,
    "restaurant":"Krystal"
  },
  {
    "rank":98,
    "restaurant":"Chuck E. Cheese's"
  },
  {
    "rank":99,
    "restaurant":"Big Boy Restaurant & Bakery"
  },
  {
    "rank":99,
    "restaurant":"Frisch's Big Boy"
  },
  {
    "rank":99,
    "restaurant":"Bob's Big Boy"
  },
  {
    "rank":99,
    "restaurant":"Big Boy"
  },
  {
    "rank":100,
    "restaurant":"On the Border Mexican Grill & Cantina"
  }
];