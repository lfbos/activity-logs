import { Link } from "react-router-dom";
import { axiosInstance, urls } from "../../apiUtils";

function Home() {
    axiosInstance.get(urls.posts).then((response) => console.log(response));
    return (
      <>
        <main>
          <h2>Welcome to the homepage!</h2>
          <p>You can do this, I believe in you.</p>
        </main>
        <nav>
          <Link to="/about">About</Link> <br/>
          <Link to="/detail/1234">Detail</Link>
        </nav>
      </>
    );
  }

  export default Home;