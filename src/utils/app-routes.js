const Main = {
  name: "Home",
  initialRoute: "Home",
  childs: {
    Home: { name: "Home", headerTitle: "Dashboard" },
    MovieDetail: { name: "MovieDetail", headerTitle: "Movie Detail" },
  },
};

const AppRoutes = {
  Main: Main,
};

export default AppRoutes;
