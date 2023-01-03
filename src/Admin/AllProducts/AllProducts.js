import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  create,
  deleteItem,
  updateItem,
} from "../../States/Actions/ProductAction";
import FileBase from "react-file-base64";
import { Delete } from "@mui/icons-material";

const AllProducts = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    color: "",
    categories: "",
    size: "",
    inStock: true,
  });
  const [image, setImage] = useState("");

  const [currentId, setCurrentId] = useState();
  console.log(currentId);
  const { products } = useSelector((state) => state.productsReducer);

  const editProduct = products.find((p) =>
    currentId ? p._id === currentId : null
  );

  useEffect(() => {
    if (currentId) {
      setForm(editProduct);
    }
  }, [currentId, editProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    let color;
    let size;
    if (currentId) {
      color = form.color.split(",");
      size = form.size.split(",");
      // const categories = form.categories.split(",");
      dispatch(updateItem(currentId, { ...form, image, color, size }));
    } else {
      color = form.color.split(",");
      size = form.size.split(",");
      // const categories = form.categories.split(",");
      dispatch(create({ ...form, image, color, size }));
    }
  };
  // const handleSubmit = async () => {
  //   const color = form.color.split(",");
  //   const size = form.size.split(",");
  //   // const categories = form.categories.split(",");
  //   dispatch(create({ ...form, image, color, size }));
  // };

  return (
    <div style={{ marginTop: "1rem" }}>
      <div style={{ textAlign: "center" }}>FORM AND PRODUCT</div>

      <input name="title" placeholder="title" onChange={handleChange} />
      <input
        name="description"
        placeholder="description"
        onChange={handleChange}
      />
      <input name="price" placeholder="price" onChange={handleChange} />
      <input name="color" placeholder=" color" onChange={handleChange} />
      <input
        name="categories"
        placeholder="categories"
        onChange={handleChange}
      />
      <input name="size" placeholder="size" onChange={handleChange} />
      <select name="inStock" onChange={handleChange}>
        <option>Yes</option>
        <option>No</option>
      </select>
      <FileBase
        type="file"
        multiple={false}
        onDone={({ base64 }) => setImage(base64)}
      />

      <button onClick={handleSubmit}>submit</button>

      <div
        style={{
          marginTop: "2rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          padding: "20px",
        }}
      >
        {products.map((p) => (
          <div key={p._id}>
            <img src={p.image} alt="" style={{ height: "5rem" }} />

            <div
              style={{
                gap: "1rem",
              }}
            >
              {p.color.map((c) => (
                <div
                  style={{
                    backgroundColor: c,
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    // margin: "0px 5px",
                    cursor: "pointer",
                    marginTop: ".3rem",
                  }}
                ></div>
              ))}
            </div>

            <div>{p.descripon}</div>
            <div>{p.title}</div>
            <div> {p.inStock === true ? <>InStock</> : <>OutOfStock</>}</div>
            <div>&#8358; {Intl.NumberFormat().format(p.price)}</div>
            <Delete
              onClick={() => dispatch(deleteItem(p._id))}
              sx={{ color: "red" }}
            />
            <Delete
              onClick={() => setCurrentId(p._id)}
              sx={{ color: "blue" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
