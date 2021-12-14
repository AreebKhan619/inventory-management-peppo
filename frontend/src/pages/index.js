import { Row, Col, Card, Select, Button, List, Descriptions, Divider } from "antd"
import { useEffect, useState } from "react";
import outletsData from "../data/outlets.json"
import { getBatchData, getInventoryData } from "../mockApis/inventoryApis";
import moment from "moment"
import Modal from "antd/lib/modal/Modal";

const LandingMain = () => {

    const [outletId, setOutletId] = useState(outletsData[0]._id)

    const [lowInStock, setLowInStock] = useState([])
    const [nearingExpiry, setNearingExpiry] = useState([])
    const [showExpiringBatches, setShowExpiringBatches] = useState(false)
    const [totalSalesPrice, setTotalSalesPrice] = useState(null)

    useEffect(() => {
        getAllStats()
        //eslint-disable-next-line
    }, [outletId])


    const getAllStats = async (_outletId = outletId) => {
        // Get low inventory data
        const _inventoryData = await getInventoryData(_outletId);
        let _lowStock = _inventoryData.filter(el => {
            return el.inStockQty < el.lowStockQty
        })


        let _totalSalesPrice = _inventoryData.reduce((acc, obj) => (acc + ((obj?.inStockQty || 0) * (obj?.pricing?.sellingPrice || 0))), 0)
        setTotalSalesPrice(_totalSalesPrice)

        setLowInStock(_lowStock)

        const _batchData = await getBatchData(_outletId)
        let _nearingExpiry = _batchData.filter(el => {
            return !el.isConsumed && ((moment(el.expDate).diff(new Date(), 'days')) <= 14)
        })
        setNearingExpiry(_nearingExpiry)
    }

    return (
        <>

            <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 20
            }}>
                <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
                    <div>Outlet: </div>
                    <Select
                        style={{
                            width: "100%",
                            maxWidth: 500,
                            marginLeft: 10
                        }}
                        value={outletId}
                        onChange={(v) => {
                            setOutletId(v);
                        }}
                    >
                        {outletsData.map((_outlet) => {
                            return <Select.Option key={_outlet._id} value={_outlet._id}>{_outlet.outletName}</Select.Option>;
                        })}
                    </Select>
                </div>
            </div>

            <div className="site-card-wrapper">
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title="Low Stock" bordered={false}>
                            <h2>{lowInStock.length} Products have Low Stock</h2>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Nearing Expiry in the next two weeks" bordered={false}>
                            <Button onClick={() => setShowExpiringBatches(true)} type="link" style={{ fontSize: 20 }}>
                                Batches nearing Expiry: {nearingExpiry.length}
                            </Button>

                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Sales price worth in the inventory" bordered={false}>
                            <div style={{ fontSize: 24, fontWeight: "bold", color: "darkgreen" }}>
                                Rs {(totalSalesPrice || 0).toLocaleString("en-in")}/-
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>


            <Modal title="Batches expired / nearing expiry"
                visible={showExpiringBatches}
                destroyOnClose={true}
                footer={null}
                onCancel={() => setShowExpiringBatches(false)}
                width={"80%"}
                style={{ top: 20 }}
            >
                {nearingExpiry.map(({ expDate, isConsumed, productName, displayName, inwardDate, batchQty, batchUom }) =>
                    <>
                        <Descriptions title={displayName + " " + moment(inwardDate).format("DD MMM YYYY")}>
                            <Descriptions.Item label="Product">{productName}</Descriptions.Item>
                            <Descriptions.Item label="Expiry Date">{moment(expDate).format("DD MMM YYYY")}</Descriptions.Item>
                            <Descriptions.Item label="Batch Quantity at the time of Inward">{batchQty} {batchUom}</Descriptions.Item>
                            <Descriptions.Item label="Inwarded On">
                                {moment(inwardDate).format("DD MMM YYYY")}
                            </Descriptions.Item>
                            <Descriptions.Item label="Consumed Status">
                                {isConsumed ? "Consumed" : "Not Consumed"}
                            </Descriptions.Item>
                        </Descriptions>
                        <Divider />

                    </>
                )}
            </Modal>
        </>
    )
}

export default LandingMain