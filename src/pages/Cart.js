import React from 'react'
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { changeName,removeItem,cntItemCount } from './store';

export default function Cart() {

    // const state = useSelector((state) => {return state}); == store에 있는 '모든' state를 가져오는 hook
    const state = useSelector((state) => state);
    const getUser = useSelector((state) => state.user.name);

    const dispatch = useDispatch();
    // state를 변경
    

  return (
    <div>
    <h2><span style={{color:'blue',fontWeight:'bold'}}>{getUser}</span>님의 장바구니</h2>
    {/* <button onClick={()=>dispatch(changeName())}>닉네임보이기
    </button> */}
    <button onClick={()=>dispatch(changeName('박철수'))}>이름변경
    </button>
    <h1>현재 담은 상품 갯수: {state.cart.totalCount}개</h1>
    <h3>현재 상품 총가격: {state.cart.totalPrice}</h3>
    <Table striped bordered hover>
    <thead>
      <tr>
        <th>ID</th>
        <th>상품명</th>
        <th>개수</th>
        <th>가격</th>
        <th>변경</th>
      </tr>
    </thead>
    <tbody>
{state.cart.list.map((item,i)=>{
  return (
    <tr key={i}>
<td>{state.cart.list[i].id}</td>
<td>{state.cart.list[i].title}</td>
<td>{state.cart.list[i].count}</td>
<td>{state.cart.list[i].pricetotal}</td>
<td>
  <button onClick={()=>{
    dispatch(cntItemCount([state.cart.list[i],"inc"]))
  }}>+</button>
  <button onClick={()=>{
    dispatch(cntItemCount([state.cart.list[i],"dec"]))
  }}>-</button>

  <button onClick={()=>{
    dispatch(removeItem(state.cart.list[i]))
  }}>삭제</button>
</td>
    </tr>
  )
})}
    </tbody>
  </Table>
  </div>
    
  )
}
