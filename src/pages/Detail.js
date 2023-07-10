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
    <div style={{ display: "flex" }}>
      <img src={bests[id].image} alt="detail_img" style={{ width: 500 }} />

      <section>
        <h4>{bests[id].title}</h4>
        <p>{KrWon.format(bests[id].price)}</p>

        <div>
          <span>상세설명</span>
          <p>{bests[id].detail}</p>
        </div>

        <div>
          <span>배송</span>
          <p>￦3,000 (￦50,000 이상 구매 시 무료) </p>
        </div>
        <button
          style={{ width: 300 }}
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
          장바구니에 담기
        </button>
      </section>
    </div>
  );
}
