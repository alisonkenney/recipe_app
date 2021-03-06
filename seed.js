require('dotenv').config();
var db = require('./models');

//Recipe Array

var users_list = {
    facebook: {
        id: process.env.FACEBOOKID,
        token: process.env.FACEBOOKTOKEN,
        email: process.env.FACEBOOKEMAIL,
        name: "Alison Kenney",
        photos: "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/16420_10152954362555073_7251658784302027888_n.jpg?oh=443fb963d0a81cdffd07cff71d9c121c&oe=5855D082",
    },
        recipes : [
            {
            	title: "Easy Chicken Gyro",
                image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRHzQE9x_nzGFYQJzZ7fep5EQegqkhjD17MjcAqMlcUqFN83LSXcA",
                description: "Greek-inspired Mediterranean chicken gyro.",
                ingredients: 	[ "- 1 (16 ounce) container Greek yogurt",
                			   	  "- 1 cucumber, peeled and coarsely chopped",
                			   	  "- 1 1/2 teaspoons dried dill weed",
                			   	  "- 2 cloves garlic, minced",
                			   	  "- 1 teaspoon distilled white vinegar",
                			   	  "- 1 teaspoon lemon juice",
                			   	  "- 1 tablespoon extra-virgin olive oil",
                			   	  "- salt and ground black pepper to taste",
                			   	  "- 4 cloves garlic, minced",
                			   	  "- lemon, juiced",
                			   	  "- 2 teaspoons red wine vinegar",
                			   	  "- 2 tablespoons extra-virgin olive oil",
                			   	  "- 1 tablespoon dried oregano",
                			   	  "- 1 1/4 pounds skinless, boneless chicken breast halves - cut into strips",
                			   	  "- 6 (6 inch) pita bread rounds",
                			   	  "- 1 teaspoon olive oil",
                			   	  "- 1 tomato, diced",
                			   	  "- 1 red onion, thinly sliced",
                			   	  "- 1/2 head iceberg lettuce, chopped",
                				],
                directions: "Place Greek yogurt, cucumber, dill weed, 2 cloves garlic, white vinegar, 1 teaspoon lemon juice, 1 tablespoon olive oil, salt, and black pepper in a blender. Blend until smooth; set aside. Whisk together 4 cloves minced garlic, juice of 1 lemon, red wine vinegar, 2 tablespoons olive oil, and oregano in a large glass or ceramic bowl. Season to taste with salt and black pepper. Stir in chicken strips and toss to evenly coat. Cover the bowl with plastic wrap and marinate in the refrigerator for 1 hour. Preheat the oven's broiler and set the oven rack about 6 inches from the heat source. Remove chicken from the marinade and shake off excess. Discard the remaining marinade. Place chicken on a large baking sheet. Broil the chicken in the preheated oven until lightly browned and no longer pink in the center, 2 to 4 minutes per side. Transfer cooked chicken to a plate and allow to rest for 5 minutes. Heat 1 teaspoon olive oil in a large skillet over medium heat; place each pita bread into the skillet until warm and soft, about 2 minutes per pita. Serve warmed pita bread topped with chicken strips, yogurt sauce, tomatoes, onion, and lettuce.",
                prep_time: "20 minutes",
                cook_time: "20 minutes",
            },
            {
            	title: "Holy Guacamole",
                image: "data:image/jpeg;base64,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",
                description: "Quick, easy, and addictive! Add more salt, lime juice, or cilantro to your taste preference!",
                ingredients: [ "- 3 avocados, peeled and pitted",
                			   "- 1 teaspoon sea salt",
                			   "- 1 teaspoon garlic powder",
                			   "- 2 tablespoons fresh lime juice",
                			   "- 1/2 cup diced onion",
                			   "- 2 roma (plum) tomatoes, diced",
                			   "- 3 tablespoons chopped cilantro",
                			   "- 1 pinch cayenne pepper, or more to taste (optional)",
                				],
                directions: "Mash avocados, sea salt, garlic powder, and lime juice in a bowl using a fork. Mix onion, tomatoes, and cilantro into avocado mixture; season with cayenne pepper.",
                prep_time: "20 minutes",
                cook_time: "N/A",
            },
            {
                title: "Fettuccine Alfredo",
                image: "http://foodnetwork.sndimg.com/content/dam/images/food/fullset/2011/2/4/1/RX-FNM_030111-Lighten-Up-012_s4x3.jpg.rend.sniipadlarge.jpeg",
                description: "Warning..Not for the health conscious.",
                ingredients: [ "- 24 ounces dry fettuccini pasta",
                               "- 1 cup butter",
                               "- 3/4 pint heavy cream",
                               "- salt and pepper to taste",
                               "- 1 dash garlic salt",
                               "- 3/4 cup grated Romano cheese",
                               "- 1/2 cup grated Parmesan cheese",
                                ],
                directions: "Bring a large pot of lightly salted water to a boil. Add fettuccini and cook for 8 to 10 minutes or until al dente; drain. In a large saucepan, melt butter into cream over low heat. Add salt, pepper and garlic salt. Stir in cheese over medium heat until melted; this will thicken the sauce. Add pasta to sauce. Use enough of the pasta so that all of the sauce is used and the pasta is thoroughly coated. Serve immediately.",
                prep_time: "15 minutes",
                cook_time: "15 minutes",
            },
            {
                title: "Meatball Nirvana",
                image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR41z6NBREqVkZBMr0BGjKTpGIrJxINhhlQyyWooitXaZFkCypI",
                description: "Cover with your favorite red sauce and serve with pasta or in crusty garlic bread rolls.",
                ingredients: [ "- 1 pound extra lean ground beef",
                               "- 1/2 teaspoon sea salt",
                               "- 1 small onion, diced",
                               "- 1/2 teaspoon garlic salt",
                               "- 1 1/2 teaspoons Italian seasoning",
                               "- 3/4 teaspoon dried oregano",
                               "- 3/4 teaspoon crushed red pepper flakes",
                               "- 1 dash hot pepper sauce (such as Frank's RedHot®), or to taste",
                               "- 1 1/2 tablespoons Worcestershire sauce",
                               "- 1/3 cup skim milk",
                               "- 1/4 cup grated Parmesan cheese",
                               "- 1/2 cup seasoned bread crumbs",
                                ],
                directions: "Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
                prep_time: "20 minutes",
                cook_time: "20 minutes",
            },
            {
                title: "Slow Cooker Chicken BBQ",
                image: "http://www.melskitchencafe.com/wp-content/uploads/2013/04/BBQ-Chicken-jpg.jpg",
                description: "Use your slow cooker to prepare this great twist on basic barbecue chicken.",
                ingredients: [ "- 6 frozen skinless, boneless chicken breast halves",
                               "- 1 (12 ounce) bottle barbeque sauce",
                               "- 1/2 cup Italian salad dressing",
                               "- 1/4 cup brown sugar",
                               "- 2 tablespoons Worcestershire sauce",
                                ],
                directions: "Place chicken in a slow cooker. In a bowl, mix the barbecue sauce, Italian salad dressing, brown sugar, and Worcestershire sauce. Pour over the chicken. Cover, and cook 3 to 4 hours on High or 6 to 8 hours on Low.",
                prep_time: "10 minutes",
                cook_time: "4 hours",
            },
            {
                title: "Filipino Ribs",
                image: "http://foodnetwork.sndimg.com/content/dam/images/food/fullset/2012/4/16/0/NY0301_kansas-city-style-pork-ribs-6_s4x3.jpg",
                description: "Spareribs glazed with the sweet, tangy taste of the Philippines.",
                ingredients: [ "- 6 pounds pork spareribs",
                               "- 2 medium onions, cut into wedges",
                               "- 1 medium onion, finely chopped",
                               "- 6 tablespoons soy sauce",
                               "- 1/4 teaspoon ground black pepper",
                               "- 6 whole star anise pods",
                               "- 1 tablespoon vegetable oil",
                               "- 1 tablespoon grated fresh ginger",
                               "- 1/2 cup honey",
                               "- 2 tablespoons brown sugar",
                               "- 1 tablespoon Worcestershire sauce",
                               "- 1 tablespoon lemon juice",
                                ],
                directions: "Place ribs in a 5 to 6 quart stock pot with the 2 wedged onions, 4 tablespoons of the soy sauce, pepper and star anise. Bring all to a boil. Reduce heat to medium low, cover and let simmer in meat juices until ribs are tender when pierced, about 1 1/4 hours. Stir occasionally. Meanwhile, heat oil in a medium skillet over medium heat. Add remaining chopped onion and saute, stirring often, until onion is soft. Blend in the ginger, honey, sugar, Worcestershire sauce, lemon juice and remaining 2 tablespoons of soy sauce. Cook all together, stirring, until well blended. Remove from heat. Preheat oven to 400 degrees F (200 degrees C).Using tongs, remove ribs from stock pot and arrange in a single layer in an 11x16 inch baking dish. Brush evenly with the honey mixture and bake in the preheated oven, basting often with pan drippings, about 30 minutes or until ribs are well glazed.",
                prep_time: "30 minutes",
                cook_time: "2 hours",
            },
            {
                title: "Cashew Chicken Stir Fry",
                image: "http://www.newsnish.com/wp-content/uploads/2015/03/honey-cashew-chicken-with-rice.jpg",
                description: "A healthy and delightful one dish meal. Low sodium soy sauce can be used.",
                ingredients: [ "- 4 skinless, boneless chicken breast halves, cut into bite-size pieces",
                               "- 1 tablespoon Cajun seasoning blend (such as Tony Chachere's®), or to taste",
                               "- 1 1/4 cups chicken broth",
                               "- 1 tablespoon cornstarch",
                               "- 4 teaspoons soy sauce, divided",
                               "- 2 tablespoons olive oil, divided",
                               "- 10 small spears fresh asparagus, trimmed and cut into bite-size pieces",
                               "- 3 stalks celery, chopped",
                               "- 1/2 red bell pepper, cut into thin strips",
                               "- 2 green onions, chopped",
                               "- 1 (8 ounce) can sliced bamboo shoots, drained",
                               "- 1/2 cup cashews",
                               "- 1 pinch paprika, or to taste (optional)",
                                ],
                directions: "Sprinkle chicken pieces with Cajun seasoning. Whisk chicken broth, cornstarch, and 3 teaspoons soy sauce together in a bowl until completely blended. Heat 1 tablespoon olive oil in a deep frying pan or wok over high heat. Cook and stir chicken in hot oil until cooked through, 6 to 10 minutes. Remove chicken from pan and drain any accumulated liquids. Heat remaining 1 tablespoon olive oil in the frying pan or wok over high heat. Stir fry cabbage, snap peas, asparagus, celery, red bell pepper, green onions, and bamboo shoots for 1 minute. Stir in 1 teaspoon soy sauce. Continue cooking until vegetables are tender but still crisp, about 3 minutes. Stir chicken into cabbage mixture. Pour chicken broth mixture over chicken mixture, reduce heat to medium, and simmer until sauce thickens, about 1 minute. Reduce heat to low; add cashews and cook until heated through, 1 minute. Sprinkle with paprika.",
                prep_time: "25 minutes",
                cook_time: "15 minutes",
            },
            {
                title: "French Toast Waffles",
                image: "http://images.media-allrecipes.com/userphotos/720x405/3242413.jpg",
                description: "All the custardy richness of French toast plus waffle's signature crispy ridges.",
                ingredients: [ "- cooking spray",
                               "- 1/2 cup whole milk",
                               "- 2 large eggs",
                               "- 1 tablespoon maple syrup",
                               "- 1/2 teaspoon vanilla extract",
                               "- 1 pinch salt",
                               "- 4 pieces 1/2-inch thick pieces brioche",
                                ],
                directions: "Place chicken in a slow cooker. In a bowl, mix the barbecue sauce, Italian salad dressing, brown sugar, and Worcestershire sauce. Pour over the chicken. Cover, and cook 3 to 4 hours on High or 6 to 8 hours on Low.",
                prep_time: "10 minutes",
                cook_time: "3 minutes",
            },
            {
                title: "Nova Scotia Blueberry Cream Cake",
                image: "http://images.media-allrecipes.com/userphotos/720x405/467756.jpg",
                description: "A dense cake layer is topped with a rich blueberry and sour cream layer. ",
                ingredients: [ "- 1 1/2 cups all-purpose flour",
                               "- 1/2 cup white sugar",
                               "- 1 1/2 teaspoons baking powder",
                               "- 1/2 cup butter",
                               "- 1 egg",
                               "- 1 teaspoon vanilla extract",
                               "- 4 cups blueberries",
                               "- 2 cups sour cream",
                               "- 2 egg yolks",
                                ],               
                directions: "Preheat the oven to 375 degrees F (190 degrees C). Grease a 9 inch springform pan. In a medium bowl, stir together the flour, 1/2 cup of sugar, and baking powder. Mix in the butter by pinching between your fingers or using a pastry blender until the mixture resembles coarse crumbs. Stir in the egg and 1 teaspoon of vanilla. Pat lightly into the bottom of the prepared pan. Pour blueberries over the top. In another medium bowl, whisk together the sour cream, 1/2 cup of sugar, egg yolks and 1 teaspoon of vanilla until smooth. Pour over the blueberries. Bake for 60 to 70 minutes in the preheated oven, until the top is lightly browned. Cool, then run a knife around the edge of the pan. Remove the outer ring of the pan, and cut into wedges to serve.",
                prep_time: "20 minutes",
                cook_time: "1 hour",
            },
            {
                title: "Baked Zucchini Fries",
                image: "https://lh4.googleusercontent.com/-bUfBWuvU3tg/UBQE6VJH0HI/AAAAAAAAHjg/Dmb_96MqfRw/s640/Zucchini+Fries+plate.jpg",
                description: "This recipe is easy and delicious! Can be used for appetizers or part of the main course!",
                ingredients: [ "- cooking spray",
                               "- 1/2 cup bread crumbs",
                               "- 2 eggs, beaten",
                               "- 3 zucchinis - ends trimmed, halved, and cut into 1/2-inch strips",
                                ],
                directions: "Preheat oven to 425 degrees F (220 degrees C). Line a baking sheet with aluminum foil and spray with cooking spray. Stir bread crumbs and Parmesan cheese together in a shallow bowl. Whisk eggs in a separate shallow bowl. Working in batches, dip zucchini strips into egg mixture, shake to remove any excess, and roll strips in bread crumb mixture to coat. Transfer coated zucchini strips to the prepared baking sheet. Bake zucchini fries in the preheated oven, turning once, until golden and crisp, 20 to 24 minutes.",
                prep_time: "15 minutes",
                cook_time: "20 minutes",

            },
            {
                title: "Slow Cooker Mongolian Beef",
                image: "http://thewoksoflife.com/wp-content/uploads/2015/06/mongolian-beef-8.jpg",
                description: "Quick and easy freezer slow cooker meal.",
                ingredients: [ "- 1/4 cup cornstarch",
                               "- 1 1/2 pounds beef flank steak",
                               "- 3/4 cup water",
                               "- 3/4 cup soy sauce",
                               "- 3/4 cup brown sugar",
                               "- 1/2 cup shredded carrots",
                               "- 3 green onions, chopped",
                               "- 2 tablespoons olive oil",
                               "- 2 cloves garlic, minced",
                               "- 1/2 teaspoon minced fresh ginger root",
                                ],
                directions: "Spread cornstarch into a wide, shallow bowl. Dredge flank steak in the cornstarch to coat completely; put into a large resealable plastic bag. Stir water, soy sauce, brown sugar, carrots, green onions, olive oil, garlic, and ginger together in a bowl; pour into the bag with the beef and seal. Put bag of marinating beef in the freezer until the day before you wish to prepare it. Remove bag from freezer and put bag into a bowl and place in refrigerator to thaw, at least 24 hours before you wish to prepare the beef. Empty bag into the crock of a slow cooker. Cook on High until the beef is tender, 2 to 3 hours. Alternately, you can cook this on Low for 4 to 5 hours.",
                prep_time: "5 minutes",
                cook_time: "2 hours",
            },
            {
                title: "Delicious Apple Pie",
                image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Apple_pie.jpg",
                description: "Melt in your mouth good.",
                ingredients: [ "- 1 recipe pastry for a 9 inch double crust pie",
                               "- 1/2 cup unsalted butter",
                               "- 3 tablespoons all-purpose flour",
                               "- 1/4 cup water",
                               "- 1/2 cup white sugar",
                               "- 1/2 cup packed brown sugar",
                               "- 8 Granny Smith apples - peeled, cored and sliced",
                                ],
                directions: "Preheat oven to 425 degrees F (220 degrees C). Melt the butter in a saucepan. Stir in flour to form a paste. Add water, white sugar and brown sugar, and bring to a boil. Reduce temperature and let simmer. Place the bottom crust in your pan. Fill with apples, mounded slightly. Cover with a lattice work crust. Gently pour the sugar and butter liquid over the crust. Pour slowly so that it does not run off. Bake 15 minutes in the preheated oven. Reduce the temperature to 350 degrees F (175 degrees C). Continue baking for 35 to 45 minutes, until apples are soft.",
                prep_time: "30 minutes",
                cook_time: "1 hour",
            },
        ]        
};

// remove all records that match {} -- which means remove ALL records
db.User.remove({}, function(err, users){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all users');

    // create new records based on the array recipes_list
    db.User.create(users_list, function(err, users){
      if (err) { return console.log('err', err); }
      console.log("created", users.length, "users");
      process.exit();
    });
  }
});





// db.Recipe.remove({}, function(err, recipes){
//   if(err) {
//     console.log('Error occurred in remove', err);
//   } else {
//     console.log('removed all recipes');

//     // create new records based on the array recipes_list
//     db.Recipe.create(recipes_list, function(err, recipes){
//       if (err) { return console.log('err', err); }
//       console.log("created", recipes.length, "recipes");
//       process.exit();
//     });
//   }
// });