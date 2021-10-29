import * as React from "react";
import { ICryptocurrencies } from "../Types";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, Spin, Alert } from "antd";
import { useGetCryptosQuery } from "../Services/cryptoApi";
import { SearchOutlined } from "@ant-design/icons";

const Cryptocurrencies = ({ simplified }: ICryptocurrencies) => {
  const count = simplified ? 12 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [cryptos, setCryptos] = React.useState([]);

  React.useEffect(() => {
    // Filtered Data based on Search
    const filterdData = cryptosList?.data?.coins.filter((coin: any) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filterdData);
  }, [cryptosList, searchTerm]);

  if (isFetching) {
    return (
      <Spin tip="Loading...">
        <Alert message="Loading list of Cryptocurrencies..." />
      </Spin>
    );
  }
  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            suffix={<SearchOutlined style={{ color: "#0071bd" }} />}
            placeholder="Search Cryptocurrencies"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency: any) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}, ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    alt="crypto-icon"
                    src={currency.iconUrl}
                  />
                }
                hoverable
              >
                <p>Price: {millify(currency.price)} $</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
