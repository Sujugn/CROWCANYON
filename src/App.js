import "./App.css";

import { Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import data from "./pages/productData";
import About from "./pages/About";
import Detail from "./pages/Detail";
import Cart from "./pages/Cart";
import { useDispatch } from "react-redux";
import { addItem } from "./pages/store";

// useSelector
function App() {
  const navigate = useNavigate();
  const [bests] = useState(data);
  // const state = useSelector((state)=>state);
  const dispatch = useDispatch();
  let KrWon = new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  });

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate("/");
            }}
          >
            CROWCANYON
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/about");
              }}
            >
              About
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/about/info");
              }}
            >
              Infomation
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <Container>
              <img
                src={process.env.PUBLIC_URL + "/images/visual_main_01.png"}
                alt="vm"
                style={{ height: 700 }}
              />
              <h2 style={{ marginTop: 30 }}>베스트 셀러</h2>
              <Row>
                {bests.map((best, index) => {
                  return (
                    <Col key={index}>
                      <Link to={`/detail/${index}`}>
                        <img
                          className="best_img"
                          src={best.image}
                          alt="product_img"
                          style={{ width: 280 }}
                        />
                        <h4 className="best_title">{best.title}</h4>
                        <p className="best_desc">{best.desc}</p>
                        <p className="best_price">{KrWon.format(best.price)}</p>
                      </Link>
                      <button
                        className="cart_btn"
                        onClick={() => {
                          dispatch(
                            addItem({
                              id: best.id,
                              title: best.title,
                              count: 1,
                              price: best.price,
                              pricetotal: best.price,
                            })
                          );
                        }}
                      >
                        장바구니 담기
                      </button>
                    </Col>
                  );
                })}
              </Row>
            </Container>
          }
        />
        <Route path="about" element={<About />}>
          <Route path="info" element={<div>Information</div>} />
          <Route path="loca" element={<div>Location</div>} />
        </Route>

        <Route path="detail/:id" element={<Detail bests={bests} />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
      <br />
    </div>
  );
}

export default App;
