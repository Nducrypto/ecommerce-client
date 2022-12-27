import { popularProducts } from "../../data";
import { Link } from "react-router-dom";
import "./categories.css";

const Categories = () => {
  return (
    <div className="catContainer">
      {popularProducts.map((item) => (
        <div className="containerTwo" key={item.id}>
          <Link to={`/productlist/${item.category}`}>
            <img className="catImage" src={item.img} alt="" />
            <div className="info">
              <h1 className="title">{item.title}</h1>
              <button className="catButton">SHOP NOW</button>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Categories;
