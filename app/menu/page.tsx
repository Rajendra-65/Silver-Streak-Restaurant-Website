"use client"

import { useState } from "react"
import Footer from "@/components/footer"
import Image from "next/image"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  spicy: boolean
}

const menuItems: MenuItem[] = [
  // Dismus
  // last two have to up to date
  {
    id: "1",
    name: "Ching Kao",
    description: "Ching Kao (Momo) is a delicious Chinese-style steamed dumpling filled with finely chopped vegetables or meat, delicately seasoned with aromatic spices. Soft on the outside and juicy inside, it is served hot with a tangy, spicy chutney that perfectly enhances its flavor. A light yet satisfying appetizer, Ching Kao is loved for its fresh taste and comforting bite.",
    price: 110,
    category: "Dismus",
    image: "/menuImages/Dismus/ching-kao.jpg",
    spicy: false,
  },
  {
    id: "2",
    name: "Pan Fried Ching Kao",
    description: "Pan-Fried Ching Kao (Momo) is a perfect blend of crispy and juicy textures. Lightly pan-seared until golden on the outside, these momos have a soft, flavorful filling inside, infused with aromatic Chinese spices. Served hot with a spicy, tangy chutney, they offer a rich, smoky taste and a satisfying crunch in every bite—an ideal choice for momo lovers who enjoy bold flavors.",
    price: 133,
    category: "Dismus",
    image: "/menuImages/Dismus/pan-fried-ching-kao.jpg",
    spicy: false,
  },
  {
    id: "3",
    name: "Spring Roll",
    description: "Shrimp paste on crispy toast, topped with sesame seeds. A signature starter.",
    price: 152,
    category: "Dismus",
    image: "/shrimp-toast.jpg",
    spicy: false,
  },
  {
    id: "4",
    name: "Dragon Roll",
    description: "Spicy wings coated in Szechuan sauce with numbing peppercorns. Bold and flavorful.",
    price: 190,
    category: "Dismus",
    image: "/chicken-wings.jpg",
    spicy: true,
  },

  // Soups
  {
    id: "5",
    name: "chicken soup",
    description: "Chicken Soup is a warm and comforting classic made with tender chicken pieces simmered in a flavorful broth. Infused with aromatic herbs, mild spices, and fresh vegetables, this light yet nourishing soup delivers a soothing taste with every sip. Perfect as a starter, it refreshes the palate while preparing you for a wholesome meal.",
    price: 110,
    category: "Soups",
    image: "/menuImages/Soups/chicken-soup.jpg",
    spicy: true,
  },
  {
    id: "6",
    name: "veg soup",
    description: "Veg Soup is a light and healthy blend of fresh seasonal vegetables gently simmered in a flavorful, aromatic broth. Packed with natural goodness, herbs, and mild spices, it offers a refreshing taste and comforting warmth. Perfect as a starter, this soup is both nourishing and satisfying, making it a great choice for any meal.",
    price: 110,
    category: "Soups",
    image: "/menuImages/Soups/veg-soup.jpg",
    spicy: true,
  },
  {
    id: "7",
    name: "Spicy Corn Soup",
    description: "Spicy Corn Soup is a hearty and flavorful soup made with sweet corn kernels simmered in a rich, thickened broth. Enhanced with fresh vegetables, aromatic spices, and a hint of chili heat, it delivers a perfect balance of sweetness and spice. Warm, comforting, and satisfying, this soup is an ideal starter for those who enjoy bold flavors.",
    price: 110,
    category: "Soups",
    image: "/menuImages/Soups/sweet-corn.jpg",
    spicy: true,
  },
  {
    id: "8",
    name: "Burnt Garlic Soup",
    description: "Burnt Garlic Soup is a bold and aromatic soup known for its deep, smoky flavor. Made by sautéing garlic until perfectly golden and releasing its rich aroma, it is simmered in a savory broth with fresh vegetables and subtle spices. Light yet intensely flavorful, this soup is a perfect starter for garlic lovers who enjoy a warm, comforting kick.",
    price: 110,
    category: "Soups",
    image: "/menuImages/Soups/Burnt-garlic-soup.jpg",
    spicy: false,
  },
  {
    id: "9",
    name: "Lemon Coriander Soup",
    description: "Lemon Coriander Soup is a light, refreshing soup made with clear vegetable broth infused with fresh coriander leaves and a hint of tangy lemon. Delicately seasoned with mild spices and herbs, it offers a soothing aroma and a clean, zesty flavor. Perfect as a starter, this soup is both comforting and rejuvenating, ideal for any time of the day.",
    price: 110,
    category: "Soups",
    image: "/menuImages/Soups/lemon-coriander-soup.jpg",
    spicy: false,
  },
  {
    id: "10",
    name: "Hot & Sour Soup",
    description: "Hot & Sour Soup is a classic Chinese soup known for its bold balance of spicy heat and tangy sourness. Prepared with a rich, flavorful broth, fresh vegetables, and aromatic seasonings, it delivers a warming kick with every spoonful. Perfectly comforting yet invigorating, this soup is an ideal starter for those who love strong, well-balanced flavors.",
    price: 110,
    category: "Soups",
    image: "/menuImages/Soups/sweet-&-sour.jpg",
    spicy: true,
  },
  {
    id: "11",
    name: "Sweet Corn Soup",
    description: "Sweet Corn Soup is a comforting and mildly sweet soup made with juicy corn kernels simmered in a smooth, flavorful broth. Enhanced with finely chopped vegetables and gentle seasoning, it offers a perfect balance of sweetness and warmth. Light yet satisfying, this classic soup is an ideal starter for all age groups.",
    price: 110,
    category: "Soups",
    image: "/menuImages/Soups/sweet-corn-soup.jpg",
    spicy: false,
  },
  {
    id: "12",
    name: "Tom Yum Soup",
    description: "Tom Yum Soup is a classic Thai-style soup known for its bold, aromatic flavors. Made with a fragrant broth infused with lemongrass, kaffir lime leaves, galangal, and chili, it delivers a perfect balance of spicy, sour, and savory notes. Light yet intensely flavorful, this soup is refreshing and comforting, making it an ideal starter for lovers of zesty cuisine",
    price: 119,
    category: "Soups",
    image: "/menuImages/Soups/tom-Yum-Soup.jpg",
    spicy: false,
  },
  {
    id: "13",
    name: "Lung Fung Soup",
    description: "Lung Fung Soup is a rich and flavorful Chinese-style soup known for its smooth texture and comforting taste. Prepared with a thick, savory broth infused with aromatic spices, fresh vegetables, and delicate seasonings, it offers a mild yet deeply satisfying flavor. Warm and nourishing, this classic soup is a perfect starter for those who enjoy traditional Chinese comfort food.",
    price: 110,
    category: "Soups",
    image: "/menuImages/Soups/lung-fung-soup.jpg",
    spicy: false,
  },
  {
    id: "15",
    name: "Tomato Soup",
    description: "Tomato Soup is a classic, comforting soup made from ripe tomatoes simmered into a smooth, rich blend. Gently seasoned with herbs and mild spices, it delivers a perfect balance of natural sweetness and tanginess. Warm, light, and flavorful, this timeless soup is an ideal starter or a comforting choice on its own.",
    price: 119,
    category: "Soups",
    image: "/menuImages/Soups/Tomato-Soup.jpg",
    spicy: false,
  },
  {
    id: "16",
    name: "Chicken Noodles Soup",
    description: "Chicken Noodles Soup is a hearty and comforting soup made with tender chicken pieces, soft noodles, and fresh vegetables simmered in a flavorful, aromatic broth. Lightly seasoned with herbs and spices, it offers a perfect balance of warmth and nourishment. This classic soup is ideal as a starter or a wholesome meal on its own.",
    price: 143,
    category: "Soups",
    image: "/menuImages/Soups/chicken-noodles-soup.jpg",
    spicy: false,
  },
  {
    id: "17",
    name: "Manchow Soup (our Speciality)",
    description: "Manchow Soup is a popular Indo-Chinese soup known for its bold, spicy flavors and rich texture. Made with finely chopped vegetables or chicken simmered in a savory broth, it is seasoned with garlic, soy, and aromatic spices. Topped with crispy fried noodles, this soup offers a perfect balance of heat, crunch, and comfort—making it a favorite starter for those who enjoy strong, flavorful dishes.",
    price: 133,
    category: "Soups",
    image: "/menuImages/Soups/manchow-soup.jpg",
    spicy: false,
  },

  // VEG Starter 

  {
    id: "18",
    name: "Cottage Cheese Tai-pan",
    description: "Cottage Cheese Tai-Pan is a flavorful Indo-Chinese dish made with soft cubes of cottage cheese (paneer) stir-fried in a bold, aromatic sauce. Tossed with crunchy vegetables, garlic, chilies, and Tai-Pan style spices, it delivers a perfect balance of heat, savoriness, and smoky wok flavor. Rich, spicy, and satisfying, this dish is a great choice for lovers of bold Chinese cuisine.",
    price: 157,
    category: "Veg-Starter",
    image: "/menuImages/Veg-Starter/cottage-cheese-tai-pan.jpg",
    spicy: false,
  },
  {
    id: "19",
    name: "Paneer Five Spicy",
    description: "Paneer Five Spicy is a bold and flavorful Indo-Chinese dish made with soft paneer cubes tossed in a rich sauce infused with five-spice seasoning. Stir-fried with crunchy vegetables, garlic, and chilies, it delivers a perfect balance of heat, aroma, and savory depth. Spicy, smoky, and irresistibly delicious, this dish is ideal for those who love strong and adventurous flavors.",
    price: 157,
    category: "Veg-Starter",
    image: "/menuImages/Veg-Starter/paneer-five-spicy.jpg",
    spicy: false,
  },
  {
    id: "20",
    name: "Spicy Cottage Cheese Black Pepper",
    description: "Spicy Cottage Cheese Black Pepper is a bold and aromatic Indo-Chinese dish made with soft paneer cubes stir-fried in a rich black pepper sauce. Infused with freshly crushed black pepper, garlic, and soy-based seasonings, it delivers a deep, smoky heat balanced with savory flavors. Tossed with crunchy vegetables, this dish is spicy, fragrant, and perfect for those who enjoy peppery, robust tastes.",
    price: 157,
    category: "Veg-Starter",
    image: "/menuImages/Veg-Starter/spicy-cottage-cheese-black-peper.jpg",
    spicy: false,
  },
  {
    id: "21",
    name: "Dry Chilly Paneer",
    description: "Dry Chilly Paneer is a popular Indo-Chinese appetizer made with crispy paneer cubes tossed in a spicy, tangy sauce. Stir-fried with garlic, green chilies, onions, and bell peppers, it delivers a perfect balance of heat, crunch, and savory flavor. Finished with a smoky wok touch and fresh spring onions, this dry dish is bold, flavorful, and a favorite among spice lovers.",
    price: 157,
    category: "Veg-Starter",
    image: "/menuImages/Veg-Starter/Dry-Chilli-Paneer.jpg",
    spicy: false,
  },
  {
    id: "22",
    name: "Crispy Chilly Babycorn",
    description: "Crispy Chilly Babycorn is a popular Indo-Chinese appetizer made with crunchy babycorn pieces tossed in a spicy, tangy chili sauce. Coated in a light crispy batter and stir-fried with garlic, green chilies, onions, and bell peppers, it delivers a perfect balance of crisp texture and bold flavors. Served hot and garnished with spring onions, this dish is a favorite among spice lovers.",
    price: 228,
    category: "Veg-Starter",
    image: "/menuImages/Veg-Starter/crispy-chilli-babycorn.jpg",
    spicy: false,
  },
  {
    id: "23",
    name: "Babycorn In Garlic Peper",
    description: "Babycorn in Garlic Pepper is a bold and aromatic Indo-Chinese dish made with crisp babycorn stir-fried in a rich garlic-infused black pepper sauce. Cooked with fresh garlic, crushed black pepper, onions, capsicum, and spring onions, it delivers a perfect balance of smoky heat and savory flavor. Spicy, fragrant, and full of crunch, this dish is an excellent choice for those who enjoy strong garlic and peppery tastes.",
    price: 228,
    category: "Veg-Starter",
    image: "/menuImages/Veg-Starter/chilli-baby-corn-black-peper.jpg",
    spicy: false,
  },
  {
    id: "24",
    name: "Crispy Babycorn & Mushroom",
    description: "Crispy Babycorn & Mushroom is a delicious Indo-Chinese appetizer featuring crunchy babycorn and mushrooms coated in a light, crispy batter. Tossed in a flavorful sauce with garlic, chilies, onions, and bell peppers, it offers a perfect balance of crisp texture and bold, savory taste. Served hot and garnished with spring onions, this dish is a favorite for those who enjoy crispy bites with a spicy kick.",
    price: 229,
    category: "Veg-Starter",
    image: "/menuImages/Veg-Starter/baby-corn-and-mushroom.jpg",
    spicy: false,
  },
  {
    id: "25",
    name: "Crispy Chilly American Corn",
    description: "Crispy Chilly American Corn is a crunchy and flavorful Indo-Chinese appetizer made with sweet American corn kernels tossed in a light, crispy coating. Stir-fried with garlic, green chilies, onions, and bell peppers, it’s finished in a spicy, tangy chili sauce that perfectly balances sweetness and heat. Served hot and garnished with spring onions, this dish is a crowd favorite for its irresistible crunch and bold taste.",
    price: 219,
    category: "Veg-Starter",
    image: "/menuImages/Veg-Starter/American-chilli-corn.jpg",
    spicy: false,
  },
  {
    id: "26",
    name: "Crispy Chilly Potato",
    description: "Crispy Chilly Potato is a popular Indo-Chinese appetizer made with thinly sliced potatoes fried until golden and crispy. Tossed in a spicy, tangy chili sauce with garlic, green chilies, onions, and capsicum, it delivers a perfect balance of crunch, heat, and flavor. Garnished with spring onions and sesame seeds, this dish is a favorite for its irresistible crispiness and bold taste.",
    price: 219,
    category: "Veg-Starter",
    image: "/menuImages/Veg-Starter/chilly-potato.jpg",
    spicy: false,
  },
  {
    id: "27",
    name: "Chilly Honey Potato",
    description: "Chilly Honey Potato is a delicious Indo-Chinese appetizer made with crispy fried potato fingers tossed in a sweet and spicy honey-chili sauce. Perfectly balanced with the mild sweetness of honey and the heat of chilies and garlic, this dish offers a crunchy texture with a glossy, flavorful coating. Garnished with sesame seeds and spring onions, it’s a crowd-pleaser that combines sweetness, spice, and crispiness in every bite.",
    price: 219,
    category: "Veg-Starter",
    image: "/menuImages/Veg-Starter/chilly-honey-pottato.jpg",
    spicy: false,
  },
  {
    id: "28",
    name: "Mixed Veg Salt & Pepper",
    description: "Mixed Veg Salt & Pepper is a light yet flavorful Indo-Chinese dish made with a mix of fresh vegetables stir-fried over high heat. Seasoned simply with crushed black pepper, garlic, green chilies, and a touch of salt, it delivers a bold, smoky aroma and a crisp texture. Healthy, aromatic, and mildly spicy, this dish is perfect for those who enjoy clean flavors with a peppery kick.",
    price: 219,
    category: "Veg-Starter",
    image: "/menuImages/Veg-Starter/mixed-veg-salt-pepper.jpg",
    spicy: false,
  },
  {
    id: "29",
    name: "Konjee Crispy Veg",
    description: "Konjee Crispy Veg is a crunchy and flavorful Indo-Chinese appetizer made with finely chopped vegetables mixed in a light batter and deep-fried until perfectly crisp. Seasoned with subtle spices and served hot, it offers a delightful crunch on the outside with a soft, savory center. Light, crispy, and addictive, this dish is a great choice for those who enjoy texture-rich starters.",
    price: 219,
    category: "Veg-Starter",
    image: "/menuImages/Veg-Starter/konjee-crispy-veg.jpg",
    spicy: false,
  },
  {
    id: "30",
    name: "Mushroom Salt & Pepper",
    description: "Mushroom Salt & Pepper is a simple yet bold Indo-Chinese dish made with crispy fried mushrooms tossed in crushed black pepper, garlic, green chilies, and a touch of salt. Stir-fried over high heat with onions and capsicum, it delivers a smoky aroma, crunchy texture, and a strong peppery kick. Light, flavorful, and addictive, this dish is perfect for those who enjoy clean, spicy flavors without heavy sauces.",
    price: 229,
    category: "Veg-Starter",
    image: "/menuImages/Veg-Starter/mushroom-salt-and-pepper.jpg",
    spicy: false,
  },
  {
    id: "31",
    name: "Chilly Mushroom Dry",
    description: "Chilly Mushroom Dry is a classic Indo-Chinese appetizer made with crispy fried mushrooms tossed in a spicy, tangy chili sauce. Stir-fried with garlic, green chilies, onions, and capsicum, it delivers a perfect balance of crunch, heat, and savory flavor. Finished with a smoky wok touch and fresh spring onions, this dry dish is bold, flavorful, and a favorite among spice lovers.",
    price: 229,
    category: "Veg-Starter",
    image: "/menuImages/Veg-Starter/mushroom-dry.jpg",
    spicy: false,
  },
  {
    id: "32",
    name: "Szechuan Babycorn Dry",
    description: "Szechuan Babycorn Dry is a fiery Indo-Chinese delicacy made with crispy babycorn tossed in a bold Szechuan-style sauce. Stir-fried with garlic, dried red chilies, onions, and bell peppers, it delivers intense heat, smoky aroma, and a rich, spicy flavor. Finished with a signature Szechuan kick and fresh spring onions, this dry dish is perfect for those who love strong, spicy Chinese flavors.",
    price: 229,
    category: "Veg-Starter",
    image: "/menuImages/Veg-Starter/szchwan-dry.jpg",
    spicy: false,
  },
  {
    id: "33",
    name: "Mongolian Potato",
    description: "Mongolian Potato is a flavorful Indo-Chinese dish made with crispy fried potato strips tossed in a rich, mildly sweet and spicy Mongolian-style sauce. Stir-fried with garlic, spring onions, and a blend of aromatic sauces, it offers a perfect balance of crunch, sweetness, and savory depth. Glossy, comforting, and delicious, this dish is a great choice for those who enjoy bold yet well-balanced flavors.",
    price: 219,
    category: "Veg-Starter",
    image: "/menuImages/Veg-Starter/mongolian-potato.jpg",
    spicy: false,
  },
  {
    id: "34",
    name: "Masala Stream Corn",
    description: "Masala Steam Corn is a light, healthy, and flavorful snack made with freshly steamed sweet corn tossed in aromatic Indian spices. Seasoned with butter, chaat masala, red chili powder, salt, and a splash of lemon juice, it delivers a perfect balance of warmth, tanginess, and natural sweetness. Simple yet satisfying, this dish is ideal as a quick starter or evening snack.",
    price: 219,
    category: "Veg-Starter",
    image: "/menuImages/Veg-Starter/masala-steam-corn.jpg",
    spicy: false,
  },

  // NON-veg-starter

  {
    id: "35",
    name: "Crispy Szechuan Chicken",
    description:
      "Crispy chicken pieces coated in a bold Szechuan spice blend with numbing peppercorns and dried chilies.",
    price: 171,
    category: "Non-Veg-Starter",
    image: "/menuImages/Non-Veg-Starter/crispy-szechuan-chicken.jpg",
    spicy: true,
  },
  {
    id: "36",
    name: "Chicken Tai-Pai",
    description: "Tender chicken in a special Tai-Pai sauce with aromatic spices and a perfect balance of flavors.",
    price: 171,
    category: "Non-Veg-Starter",
    image: "/menuImages/Non-Veg-Starter/chicken-tai-pai.jpg",
    spicy: false,
  },
  {
    id: "37",
    name: "Chilly Chicken Dry",
    description: "Crispy chicken pieces tossed with fresh chilies, bell peppers, and spicy Indian-Chinese spices.",
    price: 171,
    category: "Non-Veg-Starter",
    image: "/menuImages/Non-Veg-Starter/chilly-chicken-dry.jpg",
    spicy: true,
  },
  {
    id: "38",
    name: "Roast Mongolian Chicken",
    description: "Tender chicken roasted with Mongolian spices, topped with fresh scallions and sesame seeds.",
    price: 267,
    category: "Non-Veg-Starter",
    image: "/menuImages/Non-Veg-Starter/roast-mongolian-chicken.jpg",
    spicy: true,
  },
  {
    id: "39",
    name: "Chicken Wings In Red Wine",
    description: "Succulent chicken wings braised in aromatic red wine sauce with ginger, garlic, and spices.",
    price: 205,
    category: "Non-Veg-Starter",
    image: "/menuImages/Non-Veg-Starter/chicken-wings-red-wine.jpg",
    spicy: false,
  },
  {
    id: "40",
    name: "Drum of Heaven Hong Kong Style",
    description: "Marinated chicken drumsticks with a crispy exterior and tender, juicy interior. A Hong Kong classic.",
    price: 205,
    category: "Non-Veg-Starter",
    image: "/menuImages/Non-Veg-Starter/drum-heaven-hong-kong.jpg",
    spicy: false,
  },
  {
    id: "41",
    name: "Chicken Drumstick In Garlic Pepper",
    description: "Crispy chicken drumsticks coated in a fragrant garlic and black pepper seasoning.",
    price: 205,
    category: "Non-Veg-Starter",
    image: "/menuImages/Non-Veg-Starter/chicken-drumstick-garlic-pepper.jpg",
    spicy: true,
  },
  {
    id: "42",
    name: "Tai Chin Chicken",
    description: "Premium chicken prepared in authentic Tai Chin style with a perfect blend of traditional spices.",
    price: 171,
    category: "Non-Veg-Starter",
    image: "/menuImages/Non-Veg-Starter/tai-chin-chicken.jpg",
    spicy: false,
  },
  {
    id: "43",
    name: "Crispy Chicken Hong Kong Style",
    description: "Golden-fried chicken with a crispy exterior and succulent meat, served Hong Kong style.",
    price: 171,
    category: "Non-Veg-Starter",
    image: "/menuImages/Non-Veg-Starter/crispy-chicken-hong-kong.jpg",
    spicy: false,
  },
  {
    id: "44",
    name: "Chicken Tai-pan",
    description: "Tender chicken in a premium Tai-pan sauce with aromatic herbs and authentic Chinese flavors.",
    price: 171,
    category: "Non-Veg-Starter",
    image: "/menuImages/Non-Veg-Starter/chicken-tai-pan.jpg",
    spicy: false,
  },
  {
    id: "45",
    name: "Slice Chicken Pepper Salt",
    description: "Sliced chicken breast seasoned with crispy salt and pepper, offering a simple yet delicious taste.",
    price: 171,
    category: "Non-Veg-Starter",
    image: "/menuImages/Non-Veg-Starter/slice-chicken-pepper-salt.jpg",
    spicy: true,
  },
  {
    id: "46",
    name: "Dragon Chicken",
    description:
      "Exquisite chicken dish prepared with aromatic spices, fresh herbs, and a signature dragon-inspired sauce.",
    price: 171,
    category: "Non-Veg-Starter",
    image: "/menuImages/Non-Veg-Starter/dragon-chicken.jpg",
    spicy: true,
  },
  {
    id: "47",
    name: "Chicken Salt & Pepper",
    description:
      "Crispy chicken pieces seasoned with aromatic salt and freshly ground black pepper, lightly fried to perfection.",
    price: 171,
    category: "Non-Veg-Starter",
    image: "/menuImages/Non-Veg-Starter/chicken-salt-pepper.jpg",
    spicy: true,
  },
  {
    id: "48",
    name: "Sweet & Spicy Crispy Chicken",
    description:
      "Golden-fried chicken coated in a delightful balance of sweet and spicy sauce with a perfectly crispy exterior.",
    price: 171,
    category: "Non-Veg-Starter",
    image: "/menuImages/Non-Veg-Starter/sweet-spicy-crispy-chicken.jpg",
    spicy: true,
  },
  {
    id: "49",
    name: "Lat Mei Kai",
    description:
      "Traditional Cantonese-style chicken with crispy skin, tender meat, and aromatic seasoning that melts in your mouth.",
    price: 171,
    category: "Non-Veg-Starter",
    image: "/menuImages/Non-Veg-Starter/lat-mei-kai.jpg",
    spicy: false,
  },
  {
    id: "50",
    name: "Crispy Chilly Honey Chicken",
    description:
      "Crispy fried chicken glazed with sweet honey and spicy chili sauce, creating a perfect sweet and hot balance.",
    price: 171,
    category: "Non-Veg-Starter",
    image: "/menuImages/Non-Veg-Starter/crispy-chilly-honey-chicken.jpg",
    spicy: true,
  },
  {
    id: "51",
    name: "Five Spice Chicken",
    description:
      "Aromatic chicken infused with the classic five spice blend of star anise, cloves, cinnamon, Szechuan pepper, and fennel.",
    price: 171,
    category: "Non-Veg-Starter",
    image: "/menuImages/Non-Veg-Starter/five-spice-chicken.jpg",
    spicy: true,
  },
  {
    id: "52",
    name: "Bar B Q Chicken",
    description: "Succulent barbecue chicken with a smoky flavor, glazed with a tangy and savory BBQ sauce.",
    price: 171,
    category: "Non-Veg-Starter",
    image: "/menuImages/Non-Veg-Starter/bbq-chicken.jpg",
    spicy: false,
  },

  // Sea-Food

  {
    id: "53",
    name: "Five Spice Prawns",
    description:
      "Succulent prawns infused with the classic five spice blend of star anise, cloves, cinnamon, Szechuan pepper, and fennel.",
    price: 276,
    category: "Sea-Food-Starter",
    image: "/menuImages/Sea-Food-Starter/five-spice-prawns.jpg",
    spicy: false,
  },
  {
    id: "54",
    name: "Chili Honey Prawn",
    description:
      "Succulent prawns glazed with sweet honey and fiery chili sauce, creating a perfect balance of heat and sweetness.",
    price: 276,
    category: "Sea-Food-Starter",
    image: "/menuImages/Sea-Food-Starter/chili-honey-prawn.jpg",
    spicy: true,
  },
  {
    id: "55",
    name: "Prawn Salt & Pepper",
    description:
      "Crispy prawns seasoned with aromatic salt and freshly ground black pepper, lightly fried to perfection.",
    price: 276,
    category: "Sea-Food-Starter",
    image: "/menuImages/Sea-Food-Starter/prawn-salt-pepper.jpg",
    spicy: true,
  },
  {
    id: "56",
    name: "Pan Fried Szechuan Prawn",
    description:
      "Pan-fried prawns coated in a bold Szechuan spice blend with numbing peppercorns, fresh chilies, and aromatic garlic.",
    price: 276,
    category: "Sea-Food-Starter",
    image: "/menuImages/Sea-Food-Starter/pan-fried-szechuan-prawn.jpg",
    spicy: true,
  },
  {
    id: "57",
    name: "Burn & Chilly Plum Sauce Prawn",
    description:
      "Charred prawns in a tangy plum sauce with fiery chilies, creating an explosion of complex flavors on the palate.",
    price: 276,
    category: "Sea-Food-Starter",
    image: "/menuImages/Sea-Food-Starter/burn-chilly-plum-sauce-prawn.jpg",
    spicy: true,
  },
  {
    id: "58",
    name: "Fish Tai-pan",
    description:
      "Premium fish fillet prepared in authentic Tai-pan style with aromatic spices and a perfect blend of traditional flavors.",
    price: 276,
    category: "Sea-Food-Starter",
    image: "/menuImages/Sea-Food-Starter/fish-tai-pan.jpg",
    spicy: false,
  },
  {
    id: "59",
    name: "Fish Salt & Pepper",
    description:
      "Crispy fish fillet seasoned with aromatic salt and freshly ground black pepper, lightly fried until golden and crispy.",
    price: 276,
    category: "Sea-Food-Starter",
    image: "/menuImages/Sea-Food-Starter/fish-salt-pepper.jpg",
    spicy: true,
  },
  {
    id: "60",
    name: "Crispy Fish Garlic Pepper",
    description:
      "Golden-fried fish coated in a fragrant garlic and black pepper seasoning, creating a savory and aromatic delight.",
    price: 276,
    category: "Sea-Food-Starter",
    image: "/menuImages/Sea-Food-Starter/crispy-fish-garlic-pepper.jpg",
    spicy: true,
  },
  {
    id: "61",
    name: "Crispy Fish Sweet Chilly",
    description:
      "Golden-fried fish glazed with sweet and spicy chili sauce, offering a perfect balance of heat and sweetness.",
    price: 276,
    category: "Sea-Food-Starter",
    image: "/menuImages/Sea-Food-Starter/crispy-fish-sweet-chilly.jpg",
    spicy: true,
  },
  {
    id: "62",
    name: "Mustard Chilly Fish",
    description:
      "Tender fish fillet in a bold mustard and chili sauce with fresh herbs, delivering a unique tangy and spicy kick.",
    price: 276,
    category: "Sea-Food-Starter",
    image: "/menuImages/Sea-Food-Starter/mustard-chilly-fish.jpg",
    spicy: true,
  },
  {
    id: "63",
    name: "Crispy Szechuan Fish Dry",
    description:
      "Crispy fish pieces coated in a bold Szechuan spice blend with numbing peppercorns and dried chilies, utterly addictive.",
    price: 276,
    category: "Sea-Food-Starter",
    image: "/menuImages/Sea-Food-Starter/crispy-szechuan-fish-dry.jpg",
    spicy: true,
  },

  // VEGETARIAN

  {
    id: "64",
    name: "Paneer Manchurian",
    description:
      "Crispy paneer cubes tossed in a tangy and spicy Manchurian sauce with bell peppers and onions, delivering authentic Indo-Chinese flavors.",
    price: 167,
    category: "Vegetarian",
    image: "/menuImages/Vegetarian/paneer-manchurian.jpg",
    spicy: true,
  },
  {
    id: "65",
    name: "Chilly Paneer",
    description:
      "Tender paneer cubes stir-fried with fresh green and red chilies, onions, and aromatic spices for a fiery kick.",
    price: 167,
    category: "Vegetarian",
    image: "/menuImages/Vegetarian/chilly-paneer.jpg",
    spicy: true,
  },
  {
    id: "66",
    name: "Szechuan Paneer",
    description:
      "Succulent paneer coated in a bold Szechuan spice blend with numbing peppercorns, fresh chilies, and aromatic garlic.",
    price: 167,
    category: "Vegetarian",
    image: "/menuImages/Vegetarian/szechuan-paneer.jpg",
    spicy: true,
  },
  {
    id: "67",
    name: "Babycorn & Mushroom Hong Kong",
    description:
      "Fresh baby corn and tender mushrooms stir-fried in a light Hong Kong-style sauce with aromatic spices and sesame oil.",
    price: 167,
    category: "Vegetarian",
    image: "/menuImages/Vegetarian/babycorn-mushroom-hong-kong.jpg",
    spicy: false,
  },
  {
    id: "68",
    name: "Devil's Veg",
    description:
      "A spicy medley of mixed vegetables in a fiery chili and garlic sauce with a perfect balance of heat and flavor.",
    price: 167,
    category: "Vegetarian",
    image: "/menuImages/Vegetarian/devils-veg.jpg",
    spicy: true,
  },
  {
    id: "69",
    name: "Mixed Veg In Chinese Parsley",
    description:
      "Fresh mixed vegetables including broccoli, carrots, and bell peppers tossed with fragrant Chinese parsley and light sauce.",
    price: 167,
    category: "Vegetarian",
    image: "/menuImages/Vegetarian/mixed-veg-chinese-parsley.jpg",
    spicy: false,
  },
  {
    id: "70",
    name: "Mixed In Bar B Q Sauce",
    description: "Mixed vegetables glazed in a tangy and smoky barbecue sauce with a perfect caramelized finish.",
    price: 167,
    category: "Vegetarian",
    image: "/menuImages/Vegetarian/mixed-bbq-sauce.jpg",
    spicy: false,
  },
  {
    id: "71",
    name: "Exotic Veg Thai Curry (Red/Green)",
    description:
      "A vibrant blend of exotic vegetables in a creamy and aromatic Thai curry sauce, available in red or green variety.",
    price: 181,
    category: "Vegetarian",
    image: "/menuImages/Vegetarian/exotic-veg-thai-curry.jpg",
    spicy: true,
  },
  {
    id: "72",
    name: "Szechuan Mushroom",
    description:
      "Tender mushrooms coated in a bold Szechuan spice blend with numbing peppercorns, dried chilies, and aromatic garlic.",
    price: 171,
    category: "Vegetarian",
    image: "/menuImages/Vegetarian/szechuan-mushroom.jpg",
    spicy: true,
  },
  {
    id: "73",
    name: "Tsing Hoi Potato",
    description:
      "Crispy potato cubes stir-fried with fresh vegetables and aromatic herbs in a traditional Tsing Hoi style sauce.",
    price: 171,
    category: "Vegetarian",
    image: "/menuImages/Vegetarian/tsing-hoi-potato.jpg",
    spicy: false,
  },
  {
    id: "74",
    name: "Gobi Manchurian",
    description:
      "Crispy cauliflower florets tossed in a tangy and spicy Manchurian sauce with bell peppers and onions, a vegetarian favorite.",
    price: 171,
    category: "Vegetarian",
    image: "/menuImages/Vegetarian/gobi-manchurian.jpg",
    spicy: true,
  },
  {
    id: "75",
    name: "Veg Manchurian",
    description:
      "Mixed vegetables in a delicious Manchurian sauce with a perfect blend of tangy, spicy, and savory flavors.",
    price: 171,
    category: "Vegetarian",
    image: "/menuImages/Vegetarian/veg-manchurian.jpg",
    spicy: true,
  },

  // Vegetable

  {
    id: "76",
    name: "Mix Veg Honey Lemon Sauce",
    description:
      "A delightful combination of fresh seasonal vegetables tossed in a sweet honey and tangy lemon sauce, perfectly balanced flavors.",
    price: 171,
    category: "Vegetable",
    image: "/menuImages/Vegetable/mix-veg-honey-lemon-sauce.jpg",
    spicy: false,
  },
  {
    id: "77",
    name: "Chilli Potato",
    description:
      "Crispy potato cubes stir-fried with green chilies, bell peppers, and onions in a spicy chili-garlic sauce.",
    price: 162,
    category: "Vegetable",
    image: "/menuImages/Vegetable/chilli-potato.jpg",
    spicy: true,
  },
  {
    id: "78",
    name: "Hunan Veg",
    description:
      "Mixed vegetables prepared in the bold and spicy Hunan style with dried chilies, garlic, and a signature savory sauce.",
    price: 171,
    category: "Vegetable",
    image: "/menuImages/Vegetable/hunan-veg.jpg",
    spicy: true,
  },
  {
    id: "79",
    name: "Tsing Hoi American Corn & Potato",
    description:
      "Sweet corn kernels and tender potatoes tossed together in a light, savory sauce with a perfect blend of textures.",
    price: 171,
    category: "Vegetable",
    image: "/menuImages/Vegetable/tsing-hoi-american-corn-potato.jpg",
    spicy: false,
  },
  {
    id: "80",
    name: "Veg Dumpling Chilly Soya",
    description:
      "Steamed vegetable dumplings served with a fiery chilly soya sauce, combining soft, savory, and spicy notes.",
    price: 171,
    category: "Vegetable",
    image: "/menuImages/Vegetable/veg-dumpling-chilly-soya.jpg",
    spicy: true,
  },
  {
    id: "81",
    name: "Babycorn Mushroom Malak Oil",
    description:
      "Tender babycorn and fresh mushrooms cooked in fragrant malak oil with aromatic spices for a unique flavor profile.",
    price: 171,
    category: "Vegetable",
    image: "/menuImages/Vegetable/babycorn-mushroom-malak-oil.jpg",
    spicy: false,
  },
  {
    id: "82",
    name: "Three Treasure Veg",
    description:
      "A premium mix of three special vegetables prepared in a rich, savory sauce with aromatic spices and herbs.",
    price: 171,
    category: "Vegetable",
    image: "/menuImages/Vegetable/three-treasure-veg.jpg",
    spicy: false,
  },
  {
    id: "83",
    name: "Mushroom Manchurian",
    description:
      "Tender mushroom pieces tossed in a tangy and spicy Manchurian sauce with vegetables, a delicious meat-free option.",
    price: 171,
    category: "Vegetable",
    image: "/menuImages/Vegetable/mushroom-manchurian.jpg",
    spicy: true,
  },

  // Chicken

  

]

const categories = ["All Items", ...Array.from(new Set(menuItems.map((item) => item.category)))]

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Items")

  const filteredItems =
    selectedCategory === "All Items" ? menuItems : menuItems.filter((item) => item.category === selectedCategory)

  return (
    <>
      <main className="bg-neutral-950 text-foreground">
        {/* Hero Section */}
        <section className="relative w-full h-80 bg-linear-to-br from-neutral-800 to-neutral-900 overflow-hidden border-t border-t-white">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center z-10">
              <h1 className="text-5xl md:text-6xl font-bold text-text-balance text-accent mb-4">
                Our <span className="text-accent">Menu</span>
              </h1>
              <p className="text-xl text-accent">
                Authentic Chinese cuisine crafted with premium ingredients
              </p>
            </div>
          </div>
        </section>

        {/* Menu Content */}
        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto border-t border-t-white">
          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-card text-foreground hover:bg-border"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-linear-to-br from-neutral-800 to-neutral-900 rounded-lg overflow-hidden border border-border hover:border-accent transition-colors group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden ">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="bg-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {item.spicy && (
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      🌶️ Spicy
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-accent">{item.name}</h3>
                  <p className="text-accent text-sm mb-4 leading-relaxed">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-accent">₹{item.price.toFixed(2)}</span>
                    <button className="bg-yellow-400 text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                      order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
