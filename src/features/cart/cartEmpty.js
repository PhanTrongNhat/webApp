import cartEmpty from "../../assets/cartEmpty.png";
import { Container, Row, Col, Button } from "reactstrap";

const CartEmpty = () => {
  return (
    <div className="cart-empty">
      <Row>
        <Col
          xs={{ size: 8, offset: 3 }}
          sm={{ size: 6, offset: 4 }}
          md={{ size: 6, offset: 4 }}
        >
          <img className="cart-imageEmpty" src={cartEmpty} alt="cart" />
          <div className="cart-textEmpty">
            <b>Giỏ hàng của bạn còn trống!</b>
          </div>
          <div className="cart-buttonEmpty">
            <Button color="danger">MUA NGAY</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CartEmpty;
