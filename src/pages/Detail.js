import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../pages/store";

export default function Detail(props) {
  const { bests } = props;
  const { id } = useParams();
  console.log({ id });
  const dispatch = useDispatch();
  let KrWon = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={bests[id].image} alt="detail_img" style={{ width: 800 }} />

      <section style={{margin:10}}>
        <h4>{bests[id].title}</h4>
        <p style={{fontWeight:"bold"}}>{KrWon.format(bests[id].price)}</p>

        <div>
          <span>상세설명</span>
          <p style={{ fontSize: 12 }}>{bests[id].detail}</p>
        </div>

        <div>
          <span>배송</span>
          <p>￦3,000 (￦50,000 이상 구매 시 무료) </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              width: 300,
              height: 40,
              backgroundColor: "black",
              color: "white",
              border: "1px solid black",
              borderRight: "none",
            }}
            onClick={() => {
              dispatch(
                addItem({
                  id: bests[id].id,
                  title: bests[id].title,
                  count: 1,
                  price: bests[id].price,
                  pricetotal: bests[id].price,
                })
              );
            }}
          >
            Add to Cart
          </button>
          <button
            style={{
              width: 300,
              height: 40,
              backgroundColor: "white",
              border: "1px solid black",
            }}
          >
            Buy it now
          </button>
        </div>
      </section>
    </div>
  );
}
