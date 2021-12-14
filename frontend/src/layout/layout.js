import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import LandingMain from "../pages";
import BatchesMain from "../pages/batches";
// import InventoryMain from "../pages/inventory";
import ProductsMain from "../pages/products";
// import StockMain from "../pages/stock";
import Navbar from "./navbar";

const { Header, Content, Footer } = Layout;

const CustomLayout = ({ children, isLoggedIn, isDarkTheme }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            {true && (
                <Header
                    className="header"
                    style={{ background: isDarkTheme ? "#141414" : "white" }}
                >
                    <div className="logo" />
                    <Navbar />
                </Header>
            )}

            <Content style={{ padding: "0px" }}>
                <Layout
                    className="site-layout-background"
                    style={{ padding: "10px 25px", background: "#0000" }}
                >
                    <Content style={{ padding: "10px", minHeight: 280 }}>
                        <Routes>
                            <Route index element={<LandingMain />} />
                            <Route path="products" element={<ProductsMain />} />
                            <Route path="batches" element={<BatchesMain />} />
                        </Routes>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: "center" }}>
                Inventory Management ©{new Date().getFullYear()}
            </Footer>
        </Layout>
    );
};

export default CustomLayout
