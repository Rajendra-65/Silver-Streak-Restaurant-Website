import { connectDb } from "@/utils/ConnectDb"
import { Menu } from "@/models/Menu"
import { NextResponse } from "next/server";

export const dimsums = [
  {
    name: "Ching Kao (Momo)",
    category: "Dimsum",
    description: "Soft steamed momos served with chutney",
    image: "/menuImages/Dimsums/ching-kao.jpg",
    variants: [
      { size: "Small", price: 110 },
      { size: "Regular", price: 176 }
    ],
    choices: [
      { name: "Veg" },
      {
        name: "Non-Veg",
        extraPriceBySize: { Small: 10, Regular: 37 }
      }
    ]
  },

  {
    name: "Pan Fried Ching Kao (Momo)",
    category: "Dimsum",
    description: "Pan-fried momos with crispy base",
    image: "/menuImages/Dimsums/pan-fried-ching-kao.jpg",
    variants: [
      { size: "Small", price: 133 },
      { size: "Regular", price: 213 }
    ],
    choices: [
      { name: "Veg" },
      {
        name: "Non-Veg",
        extraPriceBySize: { Small: 10, Regular: 17 }
      }
    ]
  },

  {
    name: "Spring Roll",
    category: "Dimsum",
    description: "Crispy fried rolls",
    image: "/menuImages/Dimsums/spring-roll.jpg",
    variants: [{ size: "Regular", price: 152 }],
    choices: [
      { name: "Veg" },
      { name: "Non-Veg", extraPrice: 29 }
    ]
  },

  {
    name: "Dragon Roll",
    category: "Dimsum",
    description: "Crispy dragon-style rolls",
    image: "/menuImages/Dimsums/dragon-roll.jpg",
    variants: [{ size: "Regular", price: 190 }],
    choices: [
      { name: "Veg" },
      { name: "Non-Veg", extraPrice: 39 }
    ]
  }
];

export const soups = [
  {
    name: "Chicken Soup",
    category: "Soup",
    description: "Light and healthy chicken soup",
    image: "/menuImages/Soups/chicken-soup.jpg",
    variants: [{ size: "Regular", price: 119 }],
    choices: []
  },
  {
    name: "veg Soup",
    category: "Soup",
    description: "Light and healthy veg soup",
    image: "/menuImages/Soups/veg-soup.jpg",
    variants: [{ size: "Regular", price: 110 }],
    choices: []
  },

  {
    name: "Spicy Corn Soup",
    category: "Soup",
    description: "Sweet corn soup with a spicy kick",
    image: "/menuImages/Soups/sweet-corn.jpg",
    variants: [{ size: "Regular", price: 110 }],
    choices: [
      { name: "Veg", extraPrice: 0 },
      { name: "Non-Veg", extraPrice: 9 }
    ]
  },

  {
    name: "Burnt Garlic Soup",
    category: "Soup",
    description: "Garlic-flavored soup with smoky aroma",
    image: "/menuImages/Soups/Burnt-garlic-soup.jpg",
    variants: [{ size: "Regular", price: 110 }],
    choices: [
      { name: "Veg", extraPrice: 0 },
      { name: "Non-Veg", extraPrice: 9 }
    ]
  },

  {
    name: "Lemon Coriander Soup",
    category: "Soup",
    description: "Refreshing soup with lemon and coriander",
    image: "/menuImages/Soups/lemon-coriander-soup.jpg",
    variants: [{ size: "Regular", price: 110 }],
    choices: [
      { name: "Veg", extraPrice: 0 },
      { name: "Non-Veg", extraPrice: 9 }
    ]
  },

  {
    name: "Hot & Sour Soup",
    category: "Soup",
    description: "Classic hot and sour Chinese soup",
    image: "/menuImages/Soups/sweet-&-sour.jpg",
    variants: [{ size: "Regular", price: 110 }],
    choices: [
      { name: "Veg", extraPrice: 0 },
      { name: "Non-Veg", extraPrice: 9 }
    ]
  },

  {
    name: "Sweet Corn Soup",
    category: "Soup",
    description: "Classic sweet corn soup",
    image: "/menuImages/Soups/sweet-corn-soup.jpg",
    variants: [{ size: "Regular", price: 110 }],
    choices: [
      { name: "Veg", extraPrice: 0 },
      { name: "Non-Veg", extraPrice: 9 }
    ]
  },

  {
    name: "Tom Yum Soup",
    category: "Soup",
    description: "Thai style spicy and sour soup",
    image: "/menuImages/Soups/tom-Yum-Soup.jpg",
    variants: [{ size: "Regular", price: 119 }],
    choices: [
      { name: "Veg", extraPrice: 0 },
      { name: "Non-Veg", extraPrice: 14 }
    ]
  },

  {
    name: "Lung Fung Soup",
    category: "Soup",
    description: "Rich and flavorful Lung Fung soup",
    image: "/menuImages/Soups/lung-fung-soup.jpg",
    variants: [{ size: "Regular", price: 110 }],
    choices: [
      { name: "Veg", extraPrice: 0 },
      { name: "Non-Veg", extraPrice: 14 }
    ]
  },

  {
    name: "Tomato Soup",
    category: "Soup",
    description: "Classic creamy tomato soup",
    image: "/menuImages/Soups/Tomato-Soup.jpg",
    variants: [{ size: "Regular", price: 119 }],
    choices: [
      { name: "Veg", extraPrice: 0 }
    ]
  },

  {
    name: "Chicken Noodles Soup",
    category: "Soup",
    description: "Chicken noodles soup with vegetables",
    image: "/menuImages/Soups/chicken-Noodles-soup.jpg",
    variants: [{ size: "Regular", price: 143 }],
    choices: [
      { name: "Non-Veg", extraPrice: 0 }
    ]
  },

  {
    name: "Manchow Soup (Our Speciality)",
    category: "Soup",
    description: "Signature spicy Manchow soup",
    image: "/menuImages/Soups/manchow-soup.jpg",
    variants: [{ size: "Regular", price: 133 }],
    choices: [
      { name: "Veg", extraPrice: 0 },
      { name: "Non-Veg", extraPrice: 10 }
    ]
  }
];

export const vegStarters = [
  {
    name: "Cottage Cheese Tai-Pan",
    category: "Veg-Starter",
    description: "Paneer tossed in tai-pan style sauce",
    image: "/menuImages/Veg-Starter/cottage-cheese-tai-pan.jpg",
    variants: [
      { size: "Small", price: 157 },
      { size: "Regular", price: 229 }
    ],
    choices: []
  },

  {
    name: "Paneer Five Spicy",
    category: "Veg-Starter",
    description: "Paneer cooked with five-spice seasoning",
    image: "/menuImages/Veg-Starter/paneer-five-spicy.jpg",
    variants: [
      { size: "Small", price: 157 },
      { size: "Regular", price: 229 }
    ],
    choices: []
  },

  {
    name: "Spicy Cottage Cheese Black Pepper",
    category: "Veg-Starter",
    description: "Paneer tossed in black pepper sauce",
    image: "/menuImages/Veg-Starter/spicy-cottage-cheese-black-peper.jpg",
    variants: [
      { size: "Small", price: 157 },
      { size: "Regular", price: 229 }
    ],
    choices: []
  },

  {
    name: "Dry Chilly Paneer",
    category: "Veg-Starter",
    description: "Crispy paneer tossed in chilli sauce",
    image: "/menuImages/Veg-Starter/Dry-Chilli-Paneer.jpg",
    variants: [
      { size: "Small", price: 157 },
      { size: "Regular", price: 229 }
    ],
    choices: []
  },

  {
    name: "Crispy Chilly Babycorn",
    category: "Veg-Starter",
    description: "Crispy babycorn tossed in chilli sauce",
    image: "/menuImages/Veg-Starter/crispy-chilli-babycorn.jpg",
    variants: [{ size: "Regular", price: 228 }],
    choices: []
  },

  {
    name: "Babycorn In Garlic Pepper",
    category: "Veg-Starter",
    description: "Babycorn tossed in garlic pepper sauce",
    image: "/menuImages/Veg-Starter/chilli-baby-corn-black-peper.jpg",
    variants: [{ size: "Regular", price: 229 }],
    choices: []
  },

  {
    name: "Crispy Babycorn & Mushroom",
    category: "Veg-Starter",
    description: "Crispy babycorn and mushroom mix",
    image: "/menuImages/Veg-Starter/baby-corn-and-mushroom.jpg",
    variants: [{ size: "Regular", price: 229 }],
    choices: []
  },

  {
    name: "Crispy Chilly American Corn",
    category: "Veg-Starter",
    description: "Crispy American corn tossed in chilli sauce",
    image: "/menuImages/Veg-Starter/American-chilli-corn.jpg",
    variants: [{ size: "Regular", price: 219 }],
    choices: []
  },

  {
    name: "Crispy Chilly Potato",
    category: "Veg-Starter",
    description: "Crispy potatoes tossed in chilli sauce",
    image: "/menuImages/Veg-Starter/chilly-potato.jpg",
    variants: [{ size: "Regular", price: 219 }],
    choices: []
  },

  {
    name: "Chilly Honey Potato",
    category: "Veg-Starter",
    description: "Crispy potatoes in honey chilli sauce",
    image: "/menuImages/Veg-Starter/chilly-honey-pottato.jpg",
    variants: [{ size: "Regular", price: 219 }],
    choices: []
  },

  {
    name: "Mixed Veg Salt & Pepper",
    category: "Veg-Starter",
    description: "Mixed vegetables tossed with salt & pepper",
    image: "/menuImages/Veg-Starter/mixed-veg-salt-pepper.jpg",
    variants: [{ size: "Regular", price: 219 }],
    choices: []
  },

  {
    name: "Konjee Crispy Veg",
    category: "Veg-Starter",
    description: "Crispy vegetable fritters",
    image: "/menuImages/Veg-Starter/konjee-crispy-veg.jpg",
    variants: [{ size: "Regular", price: 219 }],
    choices: []
  },

  {
    name: "Mushroom Salt & Pepper",
    category: "Veg-Starter",
    description: "Crispy mushrooms tossed with salt & pepper",
    image: "/menuImages/Veg-Starter/mushroom-salt-and-pepper.jpg",
    variants: [{ size: "Regular", price: 229 }],
    choices: []
  },

  {
    name: "Chilly Mushroom Dry",
    category: "Veg-Starter",
    description: "Mushrooms tossed in chilli salt & pepper",
    image: "/menuImages/Veg-Starter/mushroom-salt-and-pepper.jpg",
    variants: [{ size: "Regular", price: 229 }],
    choices: []
  },

  {
    name: "Szechuan Babycorn Dry",
    category: "Veg-Starter",
    description: "Babycorn tossed in spicy Szechuan sauce",
    image: "/menuImages/Veg-Starter/szchwan-dry.jpg",
    variants: [{ size: "Regular", price: 229 }],
    choices: []
  },

  {
    name: "Mongolian Potato",
    category: "Veg-Starter",
    description: "Potatoes tossed in Mongolian sauce",
    image: "/menuImages/Veg-Starter/mongolian-potato.jpg",
    variants: [{ size: "Regular", price: 219 }],
    choices: []
  },

  {
    name: "Masala Steam Corn",
    category: "Veg-Starter",
    description: "Steamed corn tossed in masala spices",
    image: "/menuImages/Veg-Starter/masala-steam-corn.jpg",
    variants: [{ size: "Regular", price: 219 }],
    choices: []
  }
];

export const nonVegStarters = [
  {
    name: "Crispy Szechuan Chicken",
    category: "Non-Veg-Starter",
    description: "Crispy chicken tossed in spicy Szechuan sauce",
    image: "/menuImages/Non-Veg-Starter/crispy-szechuan-chicken.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 243 }
    ],
    choices: []
  },

  {
    name: "Chicken Tai-Pai",
    category: "Non-Veg-Starter",
    description: "Chicken cooked in classic tai-pai style sauce",
    image: "/menuImages/Non-Veg-Starter/chicken-tai-pai.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 243 }
    ],
    choices: []
  },

  {
    name: "Chilly Chicken Dry",
    category: "Non-Veg-Starter",
    description: "Dry chilli chicken with bold flavours",
    image: "/menuImages/Non-Veg-Starter/chilly-chicken-dry.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 243 }
    ],
    choices: []
  },


  {
    name: "Roast Mongolian Chicken",
    category: "Non-Veg-Starter",
    description: "Roasted chicken tossed in Mongolian sauce",
    image: "/menuImages/Non-Veg-Starter/roast-mongolian-chicken.jpg",
    variants: [
      { size: "Small", price: 267 },
      { size: "Regular", price: 314 }
    ],
    choices: []
  },

  {
    name: "Chicken Wings In Red Wine",
    category: "Non-Veg-Starter",
    description: "Chicken wings cooked in rich red wine sauce",
    image: "/menuImages/Non-Veg-Starter/chicken-wings-red-wine.jpg",
    variants: [
      { size: "Small", price: 205 },
      { size: "Regular", price: 252 }
    ],
    choices: []
  },

  {
    name: "Drum of Heaven Hong Kong Style",
    category: "Non-Veg-Starter",
    description: "Crispy drumsticks in Hong Kong style sauce",
    image: "/menuImages/Non-Veg-Starter/drum-heaven-hong-kong.jpg",
    variants: [
      { size: "Small", price: 205 },
      { size: "Regular", price: 243 }
    ],
    choices: []
  },

  {
    name: "Chicken Drumstick In Garlic Pepper",
    category: "Non-Veg-Starter",
    description: "Drumsticks tossed in garlic pepper sauce",
    image: "/menuImages/Non-Veg-Starter/chicken-drumstick-garlic-pepper.jpg",
    variants: [
      { size: "Small", price: 205 },
      { size: "Regular", price: 243 }
    ],
    choices: []
  },

  {
    name: "Tai Chin Chicken",
    category: "Non-Veg-Starter",
    description: "Chicken cooked in tai chin sauce",
    image: "/menuImages/Non-Veg-Starter/tai-chin-chicken.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 243 }
    ],
    choices: []
  },

  {
    name: "Crispy Chicken Hong Kong Style",
    category: "Non-Veg-Starter",
    description: "Crispy chicken tossed in Hong Kong style sauce",
    image: "/menuImages/Non-Veg-Starter/crispy-chicken-hong-kong.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 243 }
    ],
    choices: []
  },

  {
    name: "Chicken Tai-Pan",
    category: "Non-Veg-Starter",
    description: "Chicken tossed in tai-pan style sauce",
    image: "/menuImages/Non-Veg-Starter/chicken-tai-pan.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 243 }
    ],
    choices: []
  },

  {
    name: "Slice Chicken Pepper Salt",
    category: "Non-Veg-Starter",
    description: "Sliced chicken tossed with salt & pepper",
    image: "/menuImages/Non-Veg-Starter/slice-chicken-pepper-salt.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 243 }
    ],
    choices: []
  },

  {
    name: "Dragon Chicken",
    category: "Non-Veg-Starter",
    description: "Crispy dragon-style chicken",
    image: "/menuImages/Non-Veg-Starter/dragon-chicken.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 243 }
    ],
    choices: []
  },

  {
    name: "Chicken Salt & Pepper",
    category: "Non-Veg-Starter",
    description: "Chicken tossed in classic salt & pepper seasoning",
    image: "/menuImages/Non-Veg-Starter/chicken-salt-pepper.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 243 }
    ],
    choices: []
  },

  {
    name: "Sweet & Spicy Crispy Chicken",
    category: "Non-Veg-Starter",
    description: "Crispy chicken in sweet and spicy sauce",
    image: "/menuImages/Non-Veg-Starter/sweet-spicy-crispy-chicken.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 243 }
    ],
    choices: []
  },

  {
    name: "Lat Mei Kai",
    category: "Non-Veg-Starter",
    description: "Classic Lat Mei Kai style chicken",
    image: "/menuImages/Non-Veg-Starter/lat-mei-kai.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 243 }
    ],
    choices: []
  },

  {
    name: "Crispy Chilly Honey Chicken",
    category: "Non-Veg-Starter",
    description: "Crispy chicken tossed in honey chilli sauce",
    image: "/menuImages/Non-Veg-Starter/crispy-chilly-honey-chicken.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 243 }
    ],
    choices: []
  },

  {
    name: "Five Spicy Chicken",
    category: "Non-Veg-Starter",
    description: "Chicken cooked with five-spice seasoning",
    image: "/menuImages/Non-Veg-Starter/five-spice-chicken.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 243 }
    ],
    choices: []
  },

  {
    name: "Bar B Q Chicken",
    category: "Non-Veg-Starter",
    description: "BBQ style grilled chicken",
    image: "/menuImages/Non-Veg-Starter/bbq-chicken.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 243 }
    ],
    choices: []
  }
];

export const seaFoodStarters = [
  {
    name: "Five Spice Prawns",
    category: "Sea-Food-Starter",
    description: "Prawns tossed with aromatic five-spice seasoning",
    image: "/menuImages/Sea-Food-Starter/five-spice-prawns.jpg",
    variants: [
      { size: "Small", price: 276 },
      { size: "Regular", price: 514 }
    ],
    choices: []
  },

  {
    name: "Chili Honey Prawn",
    category: "Sea-Food-Starter",
    description: "Crispy prawns in sweet and spicy honey chilli sauce",
    image: "/menuImages/Sea-Food-Starter/chili-honey-prawn.jpg",
    variants: [
      { size: "Small", price: 276 },
      { size: "Regular", price: 514 }
    ],
    choices: []
  },

  {
    name: "Prawn Salt & Pepper",
    category: "Sea-Food-Starter",
    description: "Prawns tossed with salt and cracked black pepper",
    image: "/menuImages/Sea-Food-Starter/prawn-salt-pepper.jpg",
    variants: [
      { size: "Small", price: 276 },
      { size: "Regular", price: 514 }
    ],
    choices: []
  },

  {
    name: "Pan Fried Szechuan Prawn",
    category: "Sea-Food-Starter",
    description: "Pan-fried prawns in spicy Szechuan sauce",
    image: "/menuImages/Sea-Food-Starter/pan-fried-szechuan-prawn.jpg",
    variants: [
      { size: "Small", price: 276 },
      { size: "Regular", price: 514 }
    ],
    choices: []
  },

  {
    name: "Burnt & Chilly Plum Prawn",
    category: "Sea-Food-Starter",
    description: "Prawns tossed in burnt chilli and plum sauce",
    image: "/menuImages/Sea-Food-Starter/burn-chilly-plum-sauce-prawn.jpg",
    variants: [
      { size: "Small", price: 176 },
      { size: "Regular", price: 514 }
    ],
    choices: []
  },

  {
    name: "Fish Tai-Pan",
    category: "Sea-Food-Starter",
    description: "Fish cooked in classic tai-pan style sauce",
    image: "/menuImages/Sea-Food-Starter/fish-tai-pan.jpg",
    variants: [
      { size: "Small", price: 276 },
      { size: "Regular", price: 419 }
    ],
    choices: []
  },

  {
    name: "Fish Salt & Pepper",
    category: "Sea-Food-Starter",
    description: "Fish tossed with salt and pepper seasoning",
    image: "/menuImages/Sea-Food-Starter/fish-salt-pepper.jpg",
    variants: [
      { size: "Small", price: 276 },
      { size: "Regular", price: 419 }
    ],
    choices: []
  },

  {
    name: "Crispy Fish Garlic Pepper",
    category: "Sea-Food-Starter",
    description: "Crispy fish tossed in garlic pepper sauce",
    image: "/menuImages/Sea-Food-Starter/crispy-fish-garlic-pepper.jpg",
    variants: [
      { size: "Small", price: 276 },
      { size: "Regular", price: 419 }
    ],
    choices: []
  },

  {
    name: "Crispy Fish Sweet Chilly",
    category: "Sea-Food-Starter",
    description: "Crispy fish in sweet chilli sauce",
    image: "/menuImages/Sea-Food-Starter/crispy-fish-sweet-chilly.jpg",
    variants: [
      { size: "Small", price: 276 },
      { size: "Regular", price: 419 }
    ],
    choices: []
  },

  {
    name: "Mustard Chilly Fish",
    category: "Sea-Food-Starter",
    description: "Fish tossed in mustard and chilli sauce",
    image: "/menuImages/Sea-Food-Starter/mustard-chilly-fish.jpg",
    variants: [
      { size: "Small", price: 276 },
      { size: "Regular", price: 419 }
    ],
    choices: []
  },

  {
    name: "Crispy Szechuan Fish Dry",
    category: "Sea-Food-Starter",
    description: "Crispy fish tossed in dry Szechuan spices",
    image: "/menuImages/Sea-Food-Starter/crispy-szechuan-fish-dry.jpg",
    variants: [
      { size: "Small", price: 276 },
      { size: "Regular", price: 419 }
    ],
    choices: []
  }
];

export const vegetarian = [
  {
    name: "Paneer Manchurian",
    category: "Vegetarian",
    description: "Paneer tossed in classic Manchurian sauce",
    image: "/menuImages/Vegetarian/paneer-manchurian.jpg",
    variants: [
      { size: "Small", price: 167 },
      { size: "Regular", price: 205 }
    ],
    choices: []
  },

  {
    name: "Chilly Paneer",
    category: "Vegetarian",
    description: "Paneer tossed in spicy chilli sauce",
    image: "/menuImages/Vegetarian/chilly-paneer.jpg",
    variants: [
      { size: "Small", price: 167 },
      { size: "Regular", price: 205 }
    ],
    choices: []
  },

  {
    name: "Szechuan Paneer",
    category: "Vegetarian",
    description: "Paneer cooked in bold Szechuan sauce",
    image: "/menuImages/Vegetarian/szechuan-paneer.jpg",
    variants: [
      { size: "Small", price: 167 },
      { size: "Regular", price: 205 }
    ],
    choices: []
  },

  {
    name: "Babycorn & Mushroom Hong Kong",
    category: "Vegetarian",
    description: "Babycorn and mushroom cooked Hong Kong style",
    image: "/menuImages/Vegetarian/babycorn-mushroom-hong-kong.jpg",
    variants: [
      { size: "Small", price: 167 },
      { size: "Regular", price: 205 }
    ],
    choices: []
  },

  {
    name: "Devil's Veg",
    category: "Vegetarian",
    description: "Spicy mixed vegetables in devil sauce",
    image: "/menuImages/Vegetarian/devils-veg.jpg",
    variants: [
      { size: "Small", price: 167 },
      { size: "Regular", price: 205 }
    ],
    choices: []
  },

  {
    name: "Mixed Veg In Chinese Parsley",
    category: "Vegetarian",
    description: "Mixed vegetables tossed with Chinese parsley",
    image: "/menuImages/Vegetarian/mixed-veg-chinese-parsley.jpg",
    variants: [
      { size: "Small", price: 167 },
      { size: "Regular", price: 205 }
    ],
    choices: []
  },

  {
    name: "Mixed Veg In Bar B Q Sauce",
    category: "Vegetarian",
    description: "Mixed vegetables tossed in BBQ sauce",
    image: "/menuImages/Vegetarian/mixed-bbq-sauce.jpg",
    variants: [
      { size: "Small", price: 167 },
      { size: "Regular", price: 205 }
    ],
    choices: []
  },

  {
    name: "Exotic Veg Thai Curry (Red / Green)",
    category: "Vegetarian",
    description: "Exotic vegetables cooked in Thai red or green curry",
    image: "/menuImages/Vegetarian/exotic-veg-thai-curry.jpg",
    variants: [
      { size: "Small", price: 181 },
      { size: "Regular", price: 214 }
    ],
    choices: []
  },

  {
    name: "Szechuan Mushroom",
    category: "Vegetarian",
    description: "Mushrooms tossed in spicy Szechuan sauce",
    image: "/menuImages/Vegetarian/szechuan-mushroom.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 205 }
    ],
    choices: []
  },

  {
    name: "Tsing Hoi Potato",
    category: "Vegetarian",
    description: "Potatoes tossed in tsing hoi sauce",
    image: "/menuImages/Vegetarian/tsing-hoi-potato.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 205 }
    ],
    choices: []
  },

  {
    name: "Gobi Manchurian",
    category: "Vegetarian",
    description: "Crispy cauliflower tossed in Manchurian sauce",
    image: "/menuImages/Vegetarian/gobi-manchurian.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 205 }
    ],
    choices: []
  },

  {
    name: "Veg Manchurian",
    category: "Vegetarian",
    description: "Vegetable balls cooked in Manchurian sauce",
    image: "/menuImages/Vegetarian/veg-manchurian.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 205 }
    ],
    choices: []
  }
];

export const vegetables = [
  {
    name: "Mix Veg Honey Sauce",
    category: "Vegetable",
    description: "Mixed vegetables tossed in sweet honey sauce",
    image: "/menuImages/Vegetable/mix-veg-honey-lemon-sauce.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 205 }
    ],
    choices: []
  },

  {
    name: "Chilli Potato",
    category: "Vegetable",
    description: "Crispy potatoes tossed in spicy chilli sauce",
    image: "/menuImages/Vegetable/chilli-potato.jpg",
    variants: [
      { size: "Small", price: 162 },
      { size: "Regular", price: 190 }
    ],
    choices: []
  },

  {
    name: "Hunan Veg",
    category: "Vegetable",
    description: "Mixed vegetables cooked in Hunan style sauce",
    image: "/menuImages/Vegetable/hunan-veg.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 205 }
    ],
    choices: []
  },

  {
    name: "Tsing Hoi American Corn & Potato",
    category: "Vegetable",
    description: "American corn and potato tossed in tsing hoi sauce",
    image: "/menuImages/Vegetable/tsing-hoi-american-corn-potato.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 205 }
    ],
    choices: []
  },

  {
    name: "Veg Dumpling Chilly Soya",
    category: "Vegetable",
    description: "Vegetable dumplings tossed in chilli soya sauce",
    image: "/menuImages/Vegetable/veg-dumpling-chilly-soya.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 205 }
    ],
    choices: []
  },

  {
    name: "Babycorn Mushroom Malak Oil",
    category: "Vegetable",
    description: "Babycorn and mushroom tossed in malak oil sauce",
    image: "/menuImages/Vegetable/babycorn-mushroom-malak-oil.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 205 }
    ],
    choices: []
  },

  {
    name: "Three Treasure Veg (White Garlic)",
    category: "Vegetable",
    description: "Three-vegetable combination tossed in white garlic sauce",
    image: "/menuImages/Vegetable/three-treasure-veg.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 205 }
    ],
    choices: []
  },

  {
    name: "Mushroom Manchurian",
    category: "Vegetable",
    description: "Mushrooms tossed in classic Manchurian sauce",
    image: "/menuImages/Vegetable/mushroom-manchurian.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 205 }
    ],
    choices: []
  }
];

export const chicken = [
  {
    name: "Stir Fried Chicken With Veg",
    category: "Chicken",
    description: "Stir-fried chicken cooked with fresh vegetables",
    image: "/menuImages/Chicken/stir-fried1.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 314 }
    ],
    choices: []
  },

  {
    name: "Garlic Pepper Chicken",
    category: "Chicken",
    description: "Chicken tossed in garlic and black pepper sauce",
    image: "/menuImages/Chicken/garlic-pepper-chicekn.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 314 }
    ],
    choices: []
  },

  {
    name: "Shredded Chicken Chilly Garlic",
    category: "Chicken",
    description: "Shredded chicken cooked in chilli garlic sauce",
    image: "/menuImages/Chicken/shreaded-chicken-garlic.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 314 }
    ],
    choices: []
  },

  {
    name: "Sliced Chicken In Choice of Sauce (Chilly Oyster / Hot Garlic Devil's)",
    category: "Chicken",
    description: "Sliced chicken cooked in choice of spicy sauces",
    image: "/menuImages/Chicken/sliced-chicken-oyster.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 314 }
    ],
    choices: []
  },

  {
    name: "Slice Chicken In Choice of Sauce (Red Curry / Green Curry)",
    category: "Chicken",
    description: "Chicken slices cooked in Thai red or green curry",
    image: "/menuImages/Chicken/slice-chicken-rg-curry.jpg",
    variants: [
      { size: "Small", price: 243 },
      { size: "Regular", price: 360 }
    ],
    choices: []
  },

  {
    name: "Sliced Chicken Ginger Sauce",
    category: "Chicken",
    description: "Chicken slices tossed in ginger-flavored sauce",
    image: "/menuImages/Chicken/sliced-chicken-ginger-sauce.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 314 }
    ],
    choices: []
  },

  {
    name: "Bon Bon Chicken (With Bone)",
    category: "Chicken",
    description: "Juicy chicken cooked with bone in special sauce",
    image: "/menuImages/Chicken/bon-bon-chicken.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 314 }
    ],
    choices: []
  },

  {
    name: "Chicken Manchurian",
    category: "Chicken",
    description: "Chicken cooked in classic Manchurian sauce",
    image: "/menuImages/Chicken/chicken-manchurian.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 314 }
    ],
    choices: []
  },

  {
    name: "Slice Hoisin Chicken Stir-Fry",
    category: "Chicken",
    description: "Chicken stir-fried in rich hoisin sauce",
    image: "/menuImages/Chicken/slice-hoisin-chicken-stir-fry.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 314 }
    ],
    choices: []
  },
  {
    name: "Chicken Veg Garlic Pepper",
    category: "Chicken",
    description: "Chicken and vegetables tossed together",
    image: "/menuImages/Chicken/chicken-veg-garlic-pepper.jpg",
    variants: [
      {
        size: "small", price: 171
      },
      {
        size: "Regular", price: 314
      }
    ]
  },

  {
    name: "Devil's Chicken",
    category: "Chicken",
    description: "Spicy devil-style chicken preparation",
    image: "/menuImages/Chicken/Devil-Chicken.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 314 }
    ],
    choices: []
  },

  {
    name: "Tsing Hoi Chicken",
    category: "Chicken",
    description: "Chicken cooked in tsing hoi sauce",
    image: "/menuImages/Chicken/tsing-hoi-chicken.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 314 }
    ],
    choices: []
  },

  {
    name: "Szechuan Chicken",
    category: "Chicken",
    description: "Chicken cooked in spicy Szechuan sauce",
    image: "/menuImages/Chicken/sezuan-chicken.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 314 }
    ],
    choices: []
  },

  {
    name: "Chilly Honey Chicken",
    category: "Chicken",
    description: "Chicken tossed in sweet and spicy honey chilli sauce",
    image: "/menuImages/Chicken/chilly-honey-chicken.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 314 }
    ],
    choices: []
  },

  {
    name: "Sweet & Sour Chicken",
    category: "Chicken",
    description: "Classic sweet and sour chicken",
    image: "/menuImages/Chicken/sweet-sour-chicken.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 314 }
    ],
    choices: []
  },

  {
    name: "Gooloo Chicken",
    category: "Chicken",
    description: "Chicken cooked in Gooloo-style sauce",
    image: "/menuImages/Chicken/goloo-chicken.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 314 }
    ],
    choices: []
  },

  {
    name: "Hunan Chicken",
    category: "Chicken",
    description: "Chicken cooked in spicy Hunan sauce",
    image: "/menuImages/Chicken/hunan-chicken.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 314 }
    ],
    choices: []
  },

  {
    name: "Chicken Chilly Wine",
    category: "Chicken",
    description: "Chicken cooked in chilli wine sauce",
    image: "/menuImages/Chicken/chicken-chilly-wine.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 314 }
    ],
    choices: []
  },

  {
    name: "Cantonese Chicken",
    category: "Chicken",
    description: "Chicken cooked in Cantonese-style sauce",
    image: "/menuImages/Chicken/contonese-chicken.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 314 }
    ],
    choices: []
  },

  {
    name: "Kung Pao Chicken",
    category: "Chicken",
    description: "Chicken cooked in classic Kung Pao sauce",
    image: "/menuImages/Chicken/kung-pao-chicken.jpg",
    variants: [
      { size: "Small", price: 171 },
      { size: "Regular", price: 314 }
    ],
    choices: []
  }
];

export const seaFood = [
  {
    name: "Sliced Fish Choice of Sauce (Chilly Oyster / Mustard / Chilly Wine)",
    category: "Sea-Food",
    description: "Sliced fish cooked in your choice of sauce",
    image: "/menuImages/Sea-Food/sliced-fish-choice-of-sauce.jpg",
    variants: [
      { size: "Small", price: 276 },
      { size: "Regular", price: 386 }
    ],
    choices: []
  },

  {
    name: "Sliced Fish Thai Curry (Red / Green)",
    category: "Sea-Food",
    description: "Sliced fish cooked in Thai red or green curry",
    image: "/menuImages/Sea-Food/sliced-fish-thai-curry.jpg",
    variants: [
      { size: "Small", price: 300 },
      { size: "Regular", price: 402 }
    ],
    choices: []
  },

  {
    name: "Szechuan Fish",
    category: "Sea-Food",
    description: "Fish cooked in spicy Szechuan sauce",
    image: "/menuImages/Sea-Food/szechuan-fish.jpg",
    variants: [
      { size: "Small", price: 276 },
      { size: "Regular", price: 386 }
    ],
    choices: []
  },

  {
    name: "Sliced Fish Chilly Mustard",
    category: "Sea-Food",
    description: "Sliced fish tossed in chilli mustard sauce",
    image: "/menuImages/Sea-Food/fish-chilly-mustard.jpg",
    variants: [
      { size: "Small", price: 276 },
      { size: "Regular", price: 386 }
    ],
    choices: []
  },

  {
    name: "Prawn Butter Garlic",
    category: "Sea-Food",
    description: "Prawns tossed in rich butter garlic sauce",
    image: "/menuImages/Sea-Food/prawn-butter-garlic.jpg",
    variants: [
      { size: "Small", price: 276 },
      { size: "Regular", price: 516 }
    ],
    choices: []
  },

  {
    name: "Cantonese Prawn",
    category: "Sea-Food",
    description: "Prawns cooked in Cantonese-style sauce",
    image: "/menuImages/Sea-Food/cantonese-prawn.jpg",
    variants: [
      { size: "Small", price: 276 },
      { size: "Regular", price: 516 }
    ],
    choices: []
  },

  {
    name: "Devil's Prawn",
    category: "Sea-Food",
    description: "Spicy devil-style prawn preparation",
    image: "/menuImages/Sea-Food/devil-prawn.jpg",
    variants: [
      { size: "Small", price: 276 },
      { size: "Regular", price: 516 }
    ],
    choices: []
  },

  {
    name: "Hong Kong Prawn",
    category: "Sea-Food",
    description: "Prawns cooked Hong Kong style",
    image: "/menuImages/Sea-Food/hong-kong-prawn.jpg",
    variants: [
      { size: "Small", price: 276 },
      { size: "Regular", price: 516 }
    ],
    choices: []
  },

  {
    name: "Prawn In Choice of Sauce (Hot Garlic / Chilly Garlic / Chilly Wine)",
    category: "Sea-Food",
    description: "Prawns cooked in your choice of sauce",
    image: "/menuImages/Sea-Food/prawn-in-choice.jpg",
    variants: [
      { size: "Small", price: 276 },
      { size: "Regular", price: 516 }
    ],
    choices: []
  },

  {
    name: "Prawn Thai Curry",
    category: "Sea-Food",
    description: "Prawns cooked in Thai curry sauce",
    image: "/menuImages/Sea-Food/prawn-thai.jpg",
    variants: [
      { size: "Small", price: 300 },
      { size: "Regular", price: 543 }
    ],
    choices: []
  }
];

export const noodles = [
  {
    name: "Hakka Noodles",
    category: "Noodles",
    description: "Classic hakka style stir fried noodles",
    image: "/menuImages/Noodles/hakka-Noodles.jpg",
    variants: [
      { size: "Small", price: 102 },
      { size: "Regular", price: 132 }
    ],
    choices: [
      { name: "Veg" },
      { name: "Egg", extraPriceBySize: { Small: 18, Regular: 24 } },
      { name: "Chicken", extraPriceBySize: { Small: 18, Regular: 24 } },
      { name: "Mixed", extraPriceBySize: { Small: 54, Regular: 60 } }
    ]
  },

  {
    name: "Chilly Garlic Noodles",
    category: "Noodles",
    description: "Noodles tossed in spicy chilli garlic sauce",
    image: "/menuImages/Noodles/chilly-garlic-noodles.jpg",
    variants: [
      { size: "Small", price: 112 },
      { size: "Regular", price: 144 }
    ],
    choices: [
      { name: "Veg" },
      { name: "Egg", extraPriceBySize: { Small: 14, Regular: 24 } },
      { name: "Chicken", extraPriceBySize: { Small: 14, Regular: 24 } },
      { name: "Mixed", extraPriceBySize: { Small: 50, Regular: 60 } }
    ]
  },

  {
    name: "E Fu Noodles",
    category: "Noodles",
    description: "Flat noodles cooked in traditional style",
    image: "/menuImages/Noodles/e-fu-noodles.jpg",
    variants: [
      { size: "Small", price: 122 },
      { size: "Regular", price: 154 }
    ],
    choices: [
      { name: "Veg" },
      { name: "Egg", extraPriceBySize: { Small: 14, Regular: 24 } },
      { name: "Chicken", extraPriceBySize: { Small: 14, Regular: 24 } },
      { name: "Mixed", extraPriceBySize: { Small: 50, Regular: 60 } }
    ]
  },

  {
    name: "Mee Fung Noodles",
    category: "Noodles",
    description: "Noodles cooked in med fung style sauce",
    image: "/menuImages/Noodles/mee-fung-noodles.jpg",
    variants: [
      { size: "Small", price: 144 },
      { size: "Regular", price: 180 }
    ],
    choices: [
      { name: "Veg" },
      { name: "Egg", extraPriceBySize: { Small: 24, Regular: 24 } },
      { name: "Chicken", extraPriceBySize: { Small: 24, Regular: 24 } },
      { name: "Mixed", extraPriceBySize: { Small: 42, Regular: 48 } }
    ]
  },

  {
    name: "Jai Thai Noodles",
    category: "Noodles",
    description: "Thai style noodles with aromatic flavours",
    image: "/menuImages/Noodles/jai-thai-noodles.jpg",
    variants: [
      { size: "Small", price: 144 },
      { size: "Regular", price: 180 }
    ],
    choices: [
      { name: "Veg" },
      { name: "Egg", extraPriceBySize: { Small: 24, Regular: 24 } },
      { name: "Chicken", extraPriceBySize: { Small: 24, Regular: 24 } },
      { name: "Mixed", extraPriceBySize: { Small: 16, Regular: 24 } }
    ]
  },

  {
    name: "Hong Kong Noodles",
    category: "Noodles",
    description: "Crispy noodles cooked Hong Kong style",
    image: "/menuImages/Noodles/hong-kong-noodles.jpg",
    variants: [
      { size: "Small", price: 120 },
      { size: "Regular", price: 144 }
    ],
    choices: [
      { name: "Veg" },
      { name: "Egg", extraPriceBySize: { Small: 24, Regular: 36 } },
      { name: "Chicken", extraPriceBySize: { Small: 24, Regular: 36 } },
      { name: "Mixed", extraPriceBySize: { Small: 40, Regular: 60 } }
    ]
  },

  {
    name: "Singapore Noodles",
    category: "Noodles",
    description: "Thin noodles cooked with Singapore spices",
    image: "/menuImages/Noodles/singapore-noodles.jpg",
    variants: [
      { size: "Small", price: 120 },
      { size: "Regular", price: 144 }
    ],
    choices: [
      { name: "Veg" },
      { name: "Egg", extraPriceBySize: { Small: 24, Regular: 36 } },
      { name: "Chicken", extraPriceBySize: { Small: 24, Regular: 36 } },
      { name: "Mixed", extraPriceBySize: { Small: 40, Regular: 60 } }
    ]
  },

  {
    name: "Cantonese Noodles",
    category: "Noodles",
    description: "Cantonese style noodles",
    image: "/menuImages/Noodles/cantonese-noodles.jpg",
    variants: [{ size: "Regular", price: 156 }],
    choices: [
      { name: "Veg" },
      { name: "Egg", extraPrice: 24 },
      { name: "Chicken", extraPrice: 24 },
      { name: "Mixed", extraPrice: 48 }
    ]
  },

  {
    name: "Pan Fried Noodles",
    category: "Noodles",
    description: "Pan fried crispy noodles",
    image: "/menuImages/Noodles/pan-fried-noodles.jpg",
    variants: [{ size: "Regular", price: 156 }],
    choices: [
      { name: "Veg" },
      { name: "Egg", extraPrice: 24 },
      { name: "Chicken", extraPrice: 24 },
      { name: "Mixed", extraPrice: 48 }
    ]
  },

  {
    name: "American Chopsuey",
    category: "Noodles",
    description: "Crispy noodles with sweet and sour sauce",
    image: "/menuImages/Noodles/american-chopusy.jpg",
    variants: [{ size: "Regular", price: 156 }],
    choices: [
      { name: "Veg" },
      { name: "Egg", extraPrice: 24 },
      { name: "Chicken", extraPrice: 24 },
      { name: "Mixed", extraPrice: 48 }
    ]
  },

  {
    name: "Chinese Chopsuey",
    category: "Noodles",
    description: "Chinese style chopsuey with crispy noodles",
    image: "/menuImages/Noodles/chinese-chopusy.jpg",
    variants: [{ size: "Regular", price: 156 }],
    choices: [
      { name: "Veg" },
      { name: "Egg", extraPrice: 24 },
      { name: "Chicken", extraPrice: 24 },
      { name: "Mixed", extraPrice: 48 }
    ]
  }
];

export const rice = [
  {
    name: "Fried Rice",
    category: "Rice",
    description: "Classic Chinese style fried rice",
    image: "/menuImages/Rice/fried-rice.jpg",
    variants: [
      { size: "Small", price: 118 },
      { size: "Regular", price: 142 }
    ],
    choices: [
      { name: "Veg" },
      { name: "Egg", extraPriceBySize: { Small: 24, Regular: 24 } },
      { name: "Chicken", extraPriceBySize: { Small: 24, Regular: 24 } },
      { name: "Mixed", extraPriceBySize: { Small: 36, Regular: 38 } }
    ]
  },

  {
    name: "Egg Wrap Fried Rice",
    category: "Rice",
    description: "Fried rice wrapped with egg",
    image: "/menuImages/Rice/egg-wrap-fried-rice.jpg",
    variants: [
      { size: "Small", price: 152 },
      { size: "Regular", price: 178 }
    ],
    choices: [
      { name: "Egg" },
      { name: "Chicken" },
      { name: "Mixed", extraPriceBySize: { Small: 26, Regular: 14 } }
    ]
  },

  {
    name: "Szechuan Fried Rice",
    category: "Rice",
    description: "Spicy Szechuan style fried rice",
    image: "/menuImages/Rice/szechuan-rice.jpg",
    variants: [
      { size: "Small", price: 120 },
      { size: "Regular", price: 144 }
    ],
    choices: [
      { name: "Veg" },
      { name: "Egg", extraPriceBySize: { Small: 22, Regular: 24 } },
      { name: "Chicken", extraPriceBySize: { Small: 22, Regular: 24 } },
      { name: "Mixed", extraPriceBySize: { Small: 48, Regular: 48 } }
    ]
  },

  {
    name: "Burnt Garlic Rice",
    category: "Rice",
    description: "Fried rice tossed with burnt garlic flavour",
    image: "/menuImages/Rice/burnt-garlic-fried-rice.jpg",
    variants: [
      { size: "Small", price: 120 },
      { size: "Regular", price: 144 }
    ],
    choices: [
      { name: "Veg" },
      { name: "Egg", extraPriceBySize: { Small: 22, Regular: 24 } },
      { name: "Chicken", extraPriceBySize: { Small: 22, Regular: 24 } },
      { name: "Mixed", extraPriceBySize: { Small: 48, Regular: 48 } }
    ]
  },

  {
    name: "Singapore Rice",
    category: "Rice",
    description: "Rice cooked with Singapore spices",
    image: "/menuImages/Rice/singapore-rice.jpg",
    variants: [
      { size: "Small", price: 120 },
      { size: "Regular", price: 144 }
    ],
    choices: [
      { name: "Veg" },
      { name: "Egg", extraPriceBySize: { Small: 22, Regular: 24 } },
      { name: "Chicken", extraPriceBySize: { Small: 22, Regular: 24 } },
      { name: "Mixed", extraPriceBySize: { Small: 48, Regular: 48 } }
    ]
  },

  {
    name: "Oyster Fried Rice",
    category: "Rice",
    description: "Rice tossed with oyster sauce flavour",
    image: "/menuImages/Rice/oyster-fried-rice.jpg",
    variants: [
      { size: "Small", price: 120 },
      { size: "Regular", price: 144 }
    ],
    choices: [
      { name: "Veg" },
      { name: "Egg", extraPriceBySize: { Small: 22, Regular: 24 } },
      { name: "Chicken", extraPriceBySize: { Small: 22, Regular: 24 } },
      { name: "Mixed", extraPriceBySize: { Small: 48, Regular: 48 } }
    ]
  },

  {
    name: "Tripal Szechuan Rice",
    category: "Rice",
    description: "Triple Szechuan flavoured fried rice",
    image: "/menuImages/Rice/tripal-szechuan-rice.jpg",
    variants: [
      { size: "Small", price: 120 },
      { size: "Regular", price: 144 }
    ],
    choices: [
      { name: "Veg" },
      { name: "Egg", extraPriceBySize: { Small: 22, Regular: 24 } },
      { name: "Chicken", extraPriceBySize: { Small: 22, Regular: 24 } },
      { name: "Mixed", extraPriceBySize: { Small: 48, Regular: 48 } }
    ]
  },

  {
    name: "Malak Fried Rice",
    category: "Rice",
    description: "Fried rice cooked in malak oil style",
    image: "/menuImages/Rice/malak-fried-rice.jpg",
    variants: [
      { size: "Small", price: 120 },
      { size: "Regular", price: 144 }
    ],
    choices: [
      { name: "Veg" },
      { name: "Egg", extraPriceBySize: { Small: 22, Regular: 24 } },
      { name: "Chicken", extraPriceBySize: { Small: 22, Regular: 24 } },
      { name: "Mixed", extraPriceBySize: { Small: 48, Regular: 48 } }
    ]
  },

  {
    name: "Beijing Fried Rice",
    category: "Rice",
    description: "Beijing style fried rice",
    image: "/menuImages/Rice/beijing-fried-rice.jpg",
    variants: [{ size: "Regular", price: 144 }],
    choices: [
      { name: "Veg" },
      { name: "Egg", extraPrice: 24 },
      { name: "Chicken", extraPrice: 24 },
      { name: "Mixed", extraPrice: 50 }
    ]
  },

  {
    name: "Korean Rice",
    category: "Rice",
    description: "Korean style flavoured rice",
    image: "/menuImages/Rice/korian-rice.jpg",
    variants: [{ size: "Regular", price: 170 }],
    choices: [
      { name: "Veg" },
      { name: "Egg", extraPrice: 10 },
      { name: "Chicken", extraPrice: 10 },
      { name: "Mixed", extraPrice: 12 }
    ]
  },

  {
    name: "Steam Rice",
    category: "Rice",
    description: "Plain steamed rice",
    image: "/menuImages/Rice/steamed-rice.jpg",
    variants: [{ size: "Regular", price: 90 }],
    choices: [{ name: "Veg" }]
  }
];

export const mocktail = [
  {
    name: "Black Virgin Mojito",
    category: "Mocktail",
    description: "Refreshing black virgin mojito with mint and lemon",
    image: "/menuImages/Drinks/Mocktail/black-virgin-mojito.jpg",
    variants: [{ size: "Regular", price: 99 }],
    choices: []
  },
  {
    name: "Virgin Mojito",
    category: "Mocktail",
    description: "Classic virgin mojito with mint and lime",
    image: "/menuImages/Drinks/Mocktail/classic-virgin-mojito.jpg",
    variants: [{ size: "Regular", price: 99 }],
    choices: []
  },
  {
    name: "Ginger Fizz",
    category: "Mocktail",
    description: "Zesty ginger-based refreshing drink",
    image: "/menuImages/Drinks/Mocktail/ginger-based-refreshing-drink.jpg",
    variants: [{ size: "Regular", price: 89 }],
    choices: []
  },
  {
    name: "Mint Fizz",
    category: "Mocktail",
    description: "Cool mint fizz with soda",
    image: "/menuImages/Drinks/Mocktail/mint-fizz-soda.jpg",
    variants: [{ size: "Regular", price: 89 }],
    choices: []
  },
  {
    name: "Blue Heaven",
    category: "Mocktail",
    description: "Sweet and refreshing blue heaven mocktail",
    image: "/menuImages/Drinks/Mocktail/blue-heaven.jpg",
    variants: [{ size: "Regular", price: 89 }],
    choices: []
  },
  {
    name: "Ice Tea Lemon",
    category: "Mocktail",
    description: "Chilled lemon iced tea",
    image: "/menuImages/Drinks/Mocktail/ice-tea-lemon.jpg",
    variants: [{ size: "Regular", price: 89 }],
    choices: []
  },
  {
    name: "Ice Green Apple",
    category: "Mocktail",
    description: "Refreshing green apple iced drink",
    image: "/menuImages/Drinks/Mocktail/ice-green-apple.jpg",
    variants: [{ size: "Regular", price: 89 }],
    choices: []
  },
  {
    name: "Cola Float",
    category: "Mocktail",
    description: "Classic cola topped with vanilla ice cream",
    image: "/menuImages/Drinks/Mocktail/cola-float.jpg",
    variants: [{ size: "Regular", price: 89 }],
    choices: []
  },
  {
    name: "Fresh Lime Soda",
    category: "Mocktail",
    description: "Fresh lime with soda water",
    image: "/menuImages/Drinks/Mocktail/fresh-lime-soda.jpg",
    variants: [{ size: "Regular", price: 49 }],
    choices: []
  },
  {
    name: "Lime Cola",
    category: "Mocktail",
    description: "Cola blended with fresh lime",
    image: "/menuImages/Drinks/Mocktail/lime-cola.jpg",
    variants: [{ size: "Regular", price: 49 }],
    choices: []
  },
  {
    name: "Masala Soft Drinks",
    category: "Mocktail",
    description: "Indian-style masala flavored soft drink",
    image: "/menuImages/Drinks/Mocktail/masala-soda.jpg",
    variants: [{ size: "Regular", price: 49 }],
    choices: []
  },
  {
    name: "Soft Drinks",
    category: "Mocktail",
    description: "Assorted carbonated soft drinks",
    image: "/menuImages/Drinks/Mocktail/carbonated-drink.jpg",
    variants: [{ size: "Regular", price: 39 }],
    choices: []
  }
]

export const sundaes = [
  {
    name: "Chocolate Sundae",
    category: "Sundaes",
    description: "Classic chocolate sundae with rich sauce",
    image: "/menuImages/Drinks/Sundae/chocolate-sundae.jpg",
    variants: [{ size: "Regular", price: 99 }],
    choices: []
  },
  {
    name: "Butterscotch Sundae",
    category: "Sundaes",
    description: "Creamy butterscotch flavored sundae",
    image: "/menuImages/Drinks/Sundae/butterscotch-sundae.jpg",
    variants: [{ size: "Regular", price: 99 }],
    choices: []
  },
  {
    name: "Nutty Chocolate Sundae",
    category: "Sundaes",
    description: "Chocolate sundae topped with crunchy nuts",
    image: "/menuImages/Drinks/Sundae/nutty-chocolate-sundae.jpg",
    variants: [{ size: "Regular", price: 99 }],
    choices: []
  },
  {
    name: "Mango / Lychee Sundae",
    description: "Fruit-flavored sundae with mango or lychee",
    price: 89,
    category: "Sundaes",
    image: "/menuImages/Drinks/Sundae/fruit-flavored-mango.jpg",
    variants: [{ size: "Regular", price: 89 }],
    spicy: false
  },
  {
    id: "strawberry-sundae",
    name: "Strawberry Sundae",
    description: "Strawberry flavored ice cream sundae",
    price: 89,
    category: "Sundaes",
    image: "/menuImages/Drinks/Sundae/strawberry-sundae.jpg",
    variants: [{ size: "Regular", price: 89 }],
    spicy: false
  },
  {
    id: "fruit-sundae",
    name: "Fruit Sundae",
    description: "Mixed fruit ice cream sundae",
    price: 89,
    category: "Sundaes",
    image: "/menuImages/Drinks/Sundae/fruit-sundae.jpg",
    variants: [{ size: "Regular", price: 89 }],
    spicy: false
  },
  {
    id: "caramel-sundae",
    name: "Caramel Sundae",
    description: "Sweet caramel flavored sundae",
    price: 89,
    category: "Sundaes",
    image: "/menuImages/Drinks/Sundae/caramel-sundae.jpg",
    variants: [{ size: "Regular", price: 89 }],
    spicy: false
  },
]

export const Dessert = [
  {
    name: "Caramel Fudge Brownie",
    category: "Dessert",
    description: "Warm brownie topped with rich caramel fudge",
    image: "/menuImages/Drinks/Dessert/caramel-fudge-brownie.jpg",
    variants: [
      { size: "Regular", price: 149 }
    ],
    choices: []
  },
  {
    name: "Fruit Exotic",
    category: "Dessert",
    description: "Exotic mix of fresh seasonal fruits",
    image: "/menuImages/Drinks/Dessert/exotic-fruit-drink.jpg",
    variants: [
      { size: "Regular", price: 149 }
    ],
    choices: []
  },
  {
    name: "Love Twist",
    category: "Dessert",
    description: "Signature dessert with a sweet romantic twist",
    image: "/menuImages/Drinks/Dessert/love-twist.jpg",
    variants: [
      { size: "Regular", price: 149 }
    ],
    choices: []
  },
  {
    name: "Wicked Brownie",
    category: "Dessert",
    description: "Rich and indulgent chocolate brownie",
    image: "/menuImages/Drinks/Dessert/wicked-brownie.jpg",
    variants: [
      { size: "Regular", price: 129 }
    ],
    choices: []
  },
  {
    name: "Chunky Choco",
    category: "Dessert",
    description: "Chunky chocolate dessert delight",
    image: "/menuImages/Drinks/Dessert/chunkey-chocolate.jpg",
    variants: [
      { size: "Regular", price: 149 }
    ],
    choices: []
  },
  {
    name: "Fruit Fantasy",
    category: "Dessert",
    description: "Creamy fruity dessert with a refreshing taste",
    image: "/menuImages/Drinks/Dessert/fruit-fantasy.jpg",
    variants: [
      { size: "Regular", price: 130 }
    ],
    choices: []
  }
]

export const Cold_Coffee_and_Shake = [
  {
    name: "Cafe Frappe",
    category: "Cold-Coffee-&-Shake",
    description: "Chilled coffee frappe with rich flavor",
    image: "/menuImages/Drinks/Cold-Cofee-and-shake/cofee-frape.jpg",
    variants: [{ size: "Regular", price: 99 }],
    choices: []
  },
  {
    name: "Heavenly Mocha",
    category: "Cold-Coffee-&-Shake",
    description: "Smooth mocha coffee drink",
    image: "/menuImages/Drinks/Cold-Cofee-and-shake/heavenly-mocha.jpg",
    variants: [{ size: "Regular", price: 129 }],
    choices: []
  },
  {
    name: "Choco Frappe",
    category: "Cold-Coffee-&-Shake",
    description: "Chocolate flavored frappe",
    image: "/menuImages/Drinks/Cold-Cofee-and-shake/choco-frappe.jpg",
    variants : [{size: "Regular", price: 129}],
    choices  : []
  },
  {
    name: "Thick Velvet Choco Shake",
    category: "Cold-Coffee-&-Shake",
    description: "Thick and creamy chocolate shake",
    image: "/menuImages/Drinks/Cold-Cofee-and-shake/thick-velvet-choco-shake.jpg",
    variants : [{size : "Regular", price: 109}],
    choices : []
  },
]

export const hot_beverage = [
  {
    name: "Chai Latte",
    category: "Hot-Beverages",
    description: "Hot spiced chai latte brewed with milk and aromatic spices",
    image: "/menuImages/Drinks/hot-and-beverage/chai-latte.jpg",
    variants: [
      { size: "Regular", price: 59 }
    ],
    choices: []
  },
  {
    name: "Coffee Latte",
    category: "Hot-Beverages",
    description: "Smooth hot coffee blended with steamed milk",
    image: "/menuImages/Drinks/hot-and-beverage/cofee-latte.jpg",
    variants: [
      { size: "Regular", price: 59 }
    ],
    choices: []
  },
  {
    name: "Hot Chocolate",
    category: "Hot-Beverages",
    description: "Rich and creamy hot chocolate made with premium cocoa",
    image: "/menuImages/Drinks/hot-and-beverage/hot-chocolate.jpg",
    variants: [
      { size: "Regular", price: 99 }
    ],
    choices: []
  }
]

export const smoothie = [
  {
    name: "Mango Smoothie",
    category: "Smoothies",
    description: "Fresh mango blended into a thick and refreshing smoothie",
    image: "/menuImages/Drinks/Smoothie/mango-smoothie.jpg",
    variants: [
      { size: "Regular", price: 99 }
    ],
    choices: []
  },
  {
    name: "Strawberry Smoothie",
    category: "Smoothies",
    description: "Sweet and refreshing strawberry smoothie made from fresh fruit",
    image: "/menuImages/Drinks/Smoothie/strawberry-smoothie.jpg",
    variants: [
      { size: "Regular", price: 99 }
    ],
    choices: []
  },
  {
    name: "Lychee Smoothie",
    category: "Smoothies",
    description: "Chilled lychee smoothie with a light and fruity taste",
    image: "/menuImages/Drinks/Smoothie/lychee-smoothie.jpg",
    variants: [
      { size: "Regular", price: 99 }
    ],
    choices: []
  }
]

export const POST = async () => {
  try {
    await connectDb()
    await Menu.insertMany([
      ...dimsums,
      ...soups,
      ...vegStarters,
      ...vegetarian,
      ...vegetables,
      ...nonVegStarters,
      ...seaFoodStarters,
      ...chicken,
      ...seaFood,
      ...noodles,
      ...rice,
      ...mocktail,
      ...sundaes,
      ...Dessert,
      ...Cold_Coffee_and_Shake,
      ...hot_beverage,
      ...smoothie
    ],{ordered : false});
    console.log("success")
    return NextResponse.json({
      sucess: true
    })
  }
  catch (e) {
    console.log(e)
    return NextResponse.json({
      sucess: false
    })
  }


}