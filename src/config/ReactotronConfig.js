import Reactotron from "reactotron-react-js";
import { reactotronRedux } from "reactotron-redux";


const reactotron = (process.env.NODE_ENV === "development") ? (Reactotron.configure({name: "Book Shop"})
  .use(reactotronRedux())
  .connect()) : null;

// clear log on start
Reactotron.clear();

export default reactotron;