const {
    client,
    createTables,
    createUser,
    createProduct,
    createFavorite,
    fetchUsers,
    fetchProducts,
    deleteFavorite,
  } = require("./db");

const seed = async () => {
    try {
      await client.connect();
      console.log("connected to database");
      await createTables();
      console.log("tables created");
      const [Bugs, Lucas, Lola, Burgers, Chocolate, Lettuce] = await Promise.all([
        createUser({ username: "Bugs", password: "s3cr3t" }),
        createUser({ username: "Lucas", password: "s3cr3t!!" }),
        createUser({ username: "Lola", password: "s3cr3t123" }),
        createProduct({ name: "Burgers" }),
        createProduct({ name: "Chocolate" }),
        createProduct({ name: "Lettuce" }),
      ]);
      const users = await fetchUsers();
      // console.log(users);
      const products = await fetchProducts();
      // console.log(products);
  
      const Favorites = await Promise.all([
        createFavorite({ user_id: Bugs.id, product_id: Burgers.id }),
        createFavorite({ user_id: Bugs.id, product_id: Chocolate.id }),
        createFavorite({ user_id: Lucas.id, product_id: Chocolate.id }),
        createFavorite({ user_id: Lola.id, product_id: Lettuce.id }),
      ]);
      // console.log(await fetchFavorites(Bugs.id));
      // console.log(Favorites[0]);
      await deleteFavorite(Favorites[0]);
      // console.log(Favorites);
      // console.log("Bugs products", await fetchFavorites(Bugs.id));
  
    } catch (error) {
      console.error("Error during initialization", error);
    }

  };
  seed();