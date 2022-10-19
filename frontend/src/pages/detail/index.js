import { Link, useParams } from "react-router-dom";

function Detail() {
    let params = useParams();

    return (
      <>
        <main>
          <h2>Deatils {params.detailId}</h2>
        </main>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </>
    );
  }

  export default Detail;