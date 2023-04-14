import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  create,
  deleteItem,
  updateItem,
} from "../../States/Actions/ProductAction";
import { Delete, Update } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

const AllProducts = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    color: "",
    categories: "",
    size: "",
    image: "",
    inStock: true,
    rating: "",
  });
  console.log(form);
  const [currentId, setCurrentId] = useState(0);
  const { products } = useSelector((state) => state.productsReducer);

  const editProduct = products.find((p) =>
    currentId ? p._id === currentId : null
  );

  useEffect(() => {
    if (editProduct) {
      setForm(editProduct);
    }
  }, [editProduct]);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (currentId) {
      dispatch(
        updateItem(currentId, {
          ...form,
        })
      );
    } else {
      dispatch(create({ ...form }));
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <div style={{ textAlign: "center" }}>FORM AND PRODUCT</div>

      <input
        value={form.title}
        placeholder="title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        value={form.description}
        placeholder="description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        value={form.price}
        placeholder="price"
        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
      />
      <input
        value={form.rating}
        placeholder="rating"
        onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
      />
      <input
        value={form.color}
        placeholder="color"
        onChange={(e) => setForm({ ...form, color: e.target.value.split(",") })}
      />
      <input
        value={form.categories}
        placeholder="categories"
        onChange={(e) => setForm({ ...form, categories: e.target.value })}
      />
      <input
        value={form.image}
        type="url"
        placeholder="image"
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />
      <input
        value={form.size}
        placeholder="size"
        onChange={(e) => setForm({ ...form, size: e.target.value.split(",") })}
      />
      <select
        value={form.inStock}
        onChange={(e) => setForm({ ...form, inStock: e.target.value })}
      >
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </select>

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
                  key={c}
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

            <div>{p.title}</div>
            <div>{p.description}</div>
            <div> {p.inStock ? <>InStock</> : <>OutOfStock</>}</div>
            <div>&#8358; {Intl.NumberFormat().format(p.price)}</div>
            <div style={{ display: "flex", gap: "2rem" }}>
              <Tooltip title="update">
                <Delete
                  onClick={() => dispatch(deleteItem(p._id))}
                  sx={{ color: "red" }}
                />
              </Tooltip>

              <Tooltip title="update">
                <Update onClick={() => setCurrentId(p._id)} />
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
