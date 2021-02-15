import { sum } from "./math.js";
import "./app.css";
import img from "./nyancat.jpg";
import "../scss/mixins.scss";
import "../scss/normalize.scss";
import "../scss/variables.scss";
import axios from 'axios';

console.log(sum(3, 4));

document.addEventListener("DOMContentLoaded", async () => {
  const res = await axios.get("/api/users");
  console.log(res);
  // document.body.innerHTML = `
  //   <img src="${img}" />
  // `;
  document.body.innerHTML = (res.data || []).map(user=>{
    return `<div>${user.id}: ${user.name}</div>`;
  })
});
