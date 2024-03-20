#! /usr/bin/env node

console.log(
  'This script populates specified mongoDB database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require("./models/category");
const Item = require("./models/item");


const categories = [];
const items = [];


const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategory();
  await createItem();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name, description, url_search, url_picture, date_created, created_by) {
  const category = new Category({
    name: name,
    description: description,
    url_search: url_search,
    url_picture: url_picture,
    created_by: created_by,
  });
    if (date_created != false) category.date_created = date_created;


  if (date_created != false) category.date_created = date_created;
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${category}`);
}


async function itemCreate(index, title, description, url_search, url_picture, date_created, created_by, category) {
  const itemdetail = {
    title: title,
    description: description,
    url_picture: url_picture,
    created_by: created_by,
  };
  if (category != false) itemdetail.category = category;
  if (url_search != false) itemdetail.url_search = url_search;
  if (date_created != false) itemdetail.date_created = date_created;

  const item = new Item(itemdetail);
  await item.save();
  items[index] = item;
  console.log(`Added item: ${title}`);
}


async function createCategory() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(0, "Buildings", "Beautiful photos of Buildings, from all around the world", "https://www.google.com/search?q=beautiful%20buildings", "https://c4.wallpaperflare.com/wallpaper/913/460/978/beautiful-city-night-photography-light-architecture-skyscraper-buildings-wallpaper-preview.jpg", false, "sveto"),
    categoryCreate(1, "Nature", "Beautiful photos of Nature, from all parts of the world", "https://www.google.com/search?q=beautiful%20nature", "https://images.unsplash.com/photo-1618588507085-c79565432917?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXRpZnVsJTIwbmF0dXJlfGVufDB8fDB8fHww", false, "sveto"),
    categoryCreate(2, "Paintings", "Beautiful paintings, from different cultures", "https://www.google.com/search?q=beautiful%20paintings", "https://e0.pxfuel.com/wallpapers/680/518/desktop-wallpaper-best-paintings-of-nature-beautiful-paintings.jpg", false, "sveto"),
  ]);
}

async function createItem() {
  console.log("Adding items");
  await Promise.all([
    itemCreate(0, "Blue Mosque", "The Blue Mosque in Istanbul, also known by its official name, the Sultan Ahmed Mosque, is an Ottoman-era historical imperial mosque located in Istanbul, Turkey. It was constructed between 1609 and 1617 during the rule of Ahmed I and remains a functioning mosque today. It also attracts a large number of tourists and is one of the most iconic and popular monuments of Ottoman architecture.", "https://en.wikipedia.org/wiki/Blue_Mosque,_Istanbul", "https://idsb.tmgrup.com.tr/ly/uploads/images/2023/04/21/268740.jpg", false, "sveto", categories[0]),
    itemCreate(1, "Casa Milà", "Casa Milà, popularly known as La Pedrera in reference to its unconventional rough-hewn appearance, is a Modernista building in Barcelona, Catalonia, Spain. It was the last private residence designed by architect Antoni Gaudí and was built between 1906 and 1912.", "https://en.wikipedia.org/wiki/Casa_Mil%C3%A0", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Casa_Mil%C3%A0%2C_general_view.jpg/1280px-Casa_Mil%C3%A0%2C_general_view.jpg", false, "sveto", categories[0]),
    itemCreate(2, "Fallingwater", "Fallingwater is a house designed by the architect Frank Lloyd Wright in 1935. Situated in the Mill Run section of Stewart township, in the Laurel Highlands of southwest Pennsylvania, about 70 miles (110 km) southeast of Pittsburgh in the United States, it is built partly over a waterfall on the Bear Run river. The house was designed to serve as a weekend retreat for Liliane and Edgar J. Kaufmann, the owner of Pittsburgh's Kaufmann's Department Store. ", "https://en.wikipedia.org/wiki/Fallingwater", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Fallingwater3.jpg/1920px-Fallingwater3.jpg", false, "sveto", categories[0]),
    itemCreate(3, "Baobab Trees", "Stretching across the African landscape, the Baobab tree, possesses an awe-inspiring presence. It is often nicknamed the “upside-down tree” due to its root-like branches. And with a colossal trunk that can reach up to 80 feet in circumference, the Baobab tree can hold 30,000 gallons of water or more, depending on the species. This exceptional water-holding capacity allows the baobab tree to survive in arid and drought-prone regions where water availability is scarce. In addition to their size and water storing capacity, baobab trees have a unique feature: they bloom at night, with their large white flowers opening under the moonlight, creating a mesmerizing sight in the African landscape.", "https://en.wikipedia.org/wiki/Adansonia", "https://g5d2h4c6.rocketcdn.me/wp-content/uploads/baobab-1024x536.jpg", false, "sveto", categories[1]),
    itemCreate(4, "Kenai River", "The Kenai River called Kahtnu in the Dena'ina language, is the longest river in the Kenai Peninsula of southcentral Alaska. It runs 82 miles (132 km) westward from Kenai Lake in the Kenai Mountains, through the Kenai National Wildlife Refuge and Skilak Lake to its outlet into the Cook Inlet of the Pacific Ocean near Kenai and Soldotna.", "https://en.wikipedia.org/wiki/Kenai_River", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Kenai_River.jpg/1280px-Kenai_River.jpg", false, "sveto", categories[1]),
    itemCreate(5, "Matterhorn", "The Matterhorn is a mountain of the Alps, straddling the main watershed and border between Italy and Switzerland. It is a large, near-symmetric pyramidal peak in the extended Monte Rosa area of the Pennine Alps, whose summit is 4,478 metres (14,692 ft) above sea level, making it one of the highest summits in the Alps and Europe. The four steep faces, rising above the surrounding glaciers, face the four compass points and are split by the Hörnli, Furggen, Leone/Lion, and Zmutt ridges. The mountain overlooks the Swiss town of Zermatt, in the canton of Valais, to the northeast; and the Italian town of Breuil-Cervinia in the Aosta Valley to the south. Just east of the Matterhorn is Theodul Pass, the main passage between the two valleys on its north and south sides, which has been a trade route since the Roman Era. ", "https://en.wikipedia.org/wiki/Matterhorn", "https://upload.wikimedia.org/wikipedia/commons/6/60/Matterhorn_from_Domh%C3%BCtte_-_2.jpg", false, "sveto", categories[1]),
    itemCreate(6, "The Kiss (Klimt)", `The Kiss (German: Der Kuss) is an oil-on-canvas painting with added gold leaf, silver and platinum by the Austrian Symbolist painter Gustav Klimt.[3] It was painted at some point in 1907 and 1908, during the height of what scholars call his "Golden Period".[4] It was exhibited in 1908 under the title Liebespaar (the lovers)[5] as stated in the catalogue of the exhibition. The painting depicts a couple embracing each other, their bodies entwined in elaborate beautiful robes decorated in a style influenced by the contemporary Art Nouveau style and the organic forms of the earlier Arts and Crafts movement.`, "https://en.wikipedia.org/wiki/The_Kiss_(Klimt)", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/1024px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg", false, "sveto", categories[2]),
    itemCreate(7, "Wanderer above the Sea of Fog", "Wanderer above the Sea of Fog[a] is a painting by German Romanticist artist Caspar David Friedrich made in 1818. It depicts a man standing upon a rocky precipice with his back to the viewer; he is gazing out on a landscape covered in a thick sea of fog through which other ridges, trees, and mountains pierce, which stretches out into the distance indefinitely. ", "https://en.wikipedia.org/wiki/Wanderer_above_the_Sea_of_Fog", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Caspar_David_Friedrich_-_Wanderer_above_the_Sea_of_Fog.jpeg/800px-Caspar_David_Friedrich_-_Wanderer_above_the_Sea_of_Fog.jpeg", false, "sveto", categories[2]),
    itemCreate(8, "The Garden of Earthly Delights", "The Garden of Earthly Delights is the modern title[a] given to a triptych oil painting on oak panel painted by the Early Netherlandish master Hieronymus Bosch, between 1490 and 1510, when Bosch was between 40 and 60 years old.[1] It has been housed in the Museo del Prado in Madrid, Spain since 1939.", "https://en.wikipedia.org/wiki/The_Garden_of_Earthly_Delights", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/The_Garden_of_earthly_delights.jpg/1920px-The_Garden_of_earthly_delights.jpg", false, "sveto", categories[2]),
  ]);
}
