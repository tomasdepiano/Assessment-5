import { Op } from "sequelize";
import { Animal, Human } from "./model.js";

// Get the human with the primary key 2
export const query1 = await Human.findByPk(2);

// console.log(query1);

// Get the first animal whose species is "fish"
export const query2 = await Animal.findOne({
  where: {
    species: "fish",
  },
});

// console.log(query2);

// Get all animals belonging to the human with primary key 5
export const query3 = await Animal.findAll({
  where: {
    human_id: "5",
  },
});

// console.log(query3);

// Get all animals born in a year greater than (but not equal to) 2015.
export const query4 = await Animal.findAll({
  where: {
    [Op.or]: [{ birth_year: { [Op.gt]: 2015 } }],
  },
});

// console.log(query4);

// Get all the humans with first names that start with "J"
export const query5 = await Human.findAll({
  where: {
    [Op.or]: [{ fname: { [Op.startsWith]: "J" } }],
  },
});

// console.log(query5);

// Get all the animals who don't have a birth year
export const query6 = await Animal.findAll({
  where: {
    birth_year: null,
  },
});

// console.log(query6);

// Get all the animals with species "fish" OR "rabbit"
export const query7 = await Animal.findAll({
  where: {
    [Op.or]: [{ species: "fish" }, { species: "rabbit" }],
  },
});

// console.log(query7);

// Get all the humans who DON'T have an email address that contains "gmail"
export const query8 = await Human.findAll({
  where: {
    [Op.or]: [{ email: { [Op.notLike]: "%gmail%" } }],
  },
});

// console.log(query8);

// Continue reading the instructions before you move on!

// Print a directory of humans and their animals
export async function printHumansAndAnimals() {
  const humans = await Human.findAll({
    include: Animal,
  });
  let arr = [];
  humans.forEach((human) => {
    arr.push(human.fname);
    human.animals.forEach((animal) => arr.push(animal.name));
  });
  return arr;
  // return humans.map((human) => {
  //   return {
  //     name: human.fname,
  //   };
  // });
}
printHumansAndAnimals();

// Return a Set containing the full names of all humans
// with animals of the given species.
export async function getHumansByAnimalSpecies(species) {
  try {
    // Find all animals of the given species
    const animals = await Animal.findAll({
      where: { species },
      include: Human, // Include the associated human
    });

    // Extract unique human names using a Set
    const humanNamesSet = new Set();
    animals.forEach((animal) => {
      if (animal.Human) {
        humanNamesSet.add(animal.Human.getFullName());
      }
    });

    return humanNamesSet;
  } catch (error) {
    console.error("Error fetching humans by animal species:", error);
    throw error;
  }
}
