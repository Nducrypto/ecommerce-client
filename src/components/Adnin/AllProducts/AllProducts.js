import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { create } from "../../../States/Actions/ProductAction";
import FileBase from "react-file-base64";

const AllProducts = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    color: "",
    categories: "",
    size: "",
  });
  const [image, setImage] = useState("");
  const { products } = useSelector((state) => state.productsReducer);
  console.log(products);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const dispatch = useDispatch();
  const handleSubmit = async () => {
    const color = form.color.split(",");
    dispatch(create({ ...form, image, color: color }));
  };

  return (
    <div>
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
      <FileBase
        type="file"
        multiple={false}
        onDone={({ base64 }) => setImage(base64)}
      />

      <button onClick={handleSubmit}>submit</button>
      {products.map((p) => (
        <div key={p._id}>
          <img src={p.image} alt="" style={{ height: "10rem" }} />
          <div style={{ backgroundColor: p.color }}>{p.color}</div>
          <div>{p.descripon}</div>
          <div>{p.title}</div>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
