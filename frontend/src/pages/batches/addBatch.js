import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Button,
    Select,
    InputNumber,
    DatePicker,
    Switch,
    Row,
    Col,
} from 'antd';
import productsData from "../../data/products.json"
import { HighlightOutlined } from "@ant-design/icons"
import moment from "moment"

const AddBatch = ({ onCancel }) => {

    // const [categoryId, setCategoryId] = useState("")
    const [product, setProduct] = useState(null)

    // const [outletId, setOutletId] = useState("")

    // const [description, setDescription] = useState("")
    const [batchQty, setBatchQty] = useState("")
    const [batchUom, setBatchUom] = useState(null)
    const [batchUnits, setBatchUnits] = useState(null)

    const [inwardDate, setInwardDate] = useState(new Date())
    const [mfgDate, setMfgDate] = useState(new Date())
    const [expiryDate, setExpiryDate] = useState(new Date())

    const [superLatives, setSuperlatives] = useState([])


    useEffect(() => {
        if (product?._id) {
            setExpiryDate(moment(expiryDate).add(product?.shelfLife || 0, 'days'))
            let _supes = getSuperlatives()
            setSuperlatives(_supes)
            setBatchUom(_supes[0])
        }
        //eslint-disable-next-line
    }, [product])


    useEffect(() => {
        if (product?._id) {
            setExpiryDate(moment(mfgDate).add(product?.shelfLife, "days"))
        }
        //eslint-disable-next-line
    }, [mfgDate])


    useEffect(() => {
        if (product?._id) setBatchUnits(batchQty / product?.unitQty)
        //eslint-disable-next-line
    }, [batchQty])


    useEffect(() => {
        if (product?._id) {
            setBatchQty(batchUnits * product?.unitQty)
            setBatchUom(product?.unitUom)
        }
        //eslint-disable-next-line
    }, [batchUnits])


    const getSuperlatives = (uomType = product?.unitUom) => {
        switch (uomType) {
            case "g":
                return ["g", "Kg"]
            case "Kg":
                return ["Kg"]
            case "ml":
                return ["ml", "l"]
            case "l":
                return ["l"]
            default:
                return ["unit"]
        }
    }


    return (
        <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
            layout="horizontal"
            onFinish={onCancel}
        >

            {
                false ? <div style={{ minHeight: 300 }}></div> :
                    <>
                        <Form.Item label="Product Name">
                            <Select
                                showSearch
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                style={{ width: 300 }}
                                value={product?._id}
                                onChange={(_id) => {
                                    const prod = productsData.find(el => el._id === _id)
                                    setProduct(prod)
                                }}
                            >
                                {productsData.map(({ _id, displayName }, index) => {
                                    return (
                                        <Select.Option key={_id} value={_id}>
                                            {displayName}
                                        </Select.Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>

                        <div style={{ paddingLeft: 200, color: "maroon" }}>Product's per unit qty: {product?.unitQty} {product?.unitUom}</div>

                        <Form.Item label="Batch Qty">
                            <InputNumber
                                min={product?.unitQty}
                                value={batchQty} onChange={val => setBatchQty(val)} />
                            <Select
                                disabled={!product?._id}
                                placeholder="Select a UoM"
                                value={batchUom}
                                onChange={val => setBatchUom(val)}
                                style={{ width: 100 }}
                            >
                                {superLatives.map(el => <Select.Option key={el} value={el}>{el}</Select.Option>)}
                            </Select>
                            &nbsp;OR&nbsp;
                            <div style={{ display: "inline" }}>
                                <InputNumber
                                    onChange={val => setBatchUnits(val)}
                                    value={batchUnits}
                                    style={{ display: "inline-block", width: 100 }} /> Units
                            </div>
                        </Form.Item>



                        <Form.Item label="Inward Date">
                            <DatePicker
                                allowClear={false}
                                onChange={val => setInwardDate(moment(val))}
                                value={moment(inwardDate)}
                                defaultValue={moment(inwardDate, 'DD/MM/YYYY')}
                                format={'DD/MM/YYYY'}
                            />

                        </Form.Item>


                        {
                            product?._id && product?.isPerishable && (
                                <>
                                    <div style={{ paddingLeft: 200, color: "maroon" }}>Product is perishable (shelf life: {product.shelfLife} days). Enter expiry details.</div>

                                    <Form.Item label="Mfg. Date">
                                        <DatePicker
                                            allowClear={false}
                                            onChange={val => setMfgDate(moment(val))}
                                            value={moment(mfgDate)}
                                            defaultValue={moment(mfgDate, 'DD/MM/YYYY')}
                                            format={'DD/MM/YYYY'}
                                        />
                                    </Form.Item>


                                    <Form.Item label="Expiry Date">
                                        <DatePicker
                                            allowClear={false}
                                            onChange={val => setExpiryDate(moment(val))}
                                            value={moment(expiryDate)}
                                            defaultValue={moment(expiryDate, 'DD/MM/YYYY')}
                                            format={'DD/MM/YYYY'}
                                        />
                                    </Form.Item>
                                </>
                            )
                        }


                        {/* </Form.Item>
                        <Form.Item label="Description">
                            <Input.TextArea
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </Form.Item>



                        <Form.Item label="Barcode Number">
                            <InputNumber
                                value={barcodeNumber}
                                style={{ width: 200 }}
                                onChange={val => setBarcodeNumber(val)} />
                        </Form.Item> */}


                        {/* <Form.Item wrapperCol={{ offset: 2 }} style={{ marginLeft: 130 }}>
                            <Row>
                                <Col span={6}>
                                    <Form.Item label="Perishable" valuePropName="checked">
                                        <Switch
                                            checked={isPerishable}
                                            onChange={() => setIsPerishable(!isPerishable)}
                                        />

                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    {isPerishable && <div style={{ display: "flex" }}> <Form.Item label="Shelf Life (days)">
                                        <InputNumber
                                            value={shelfLife}
                                            style={{ width: 200 }}
                                            onChange={val => setShelfLife(val)} />
                                    </Form.Item>
                                    </div>
                                    }
                                </Col>
                            </Row>
                        </Form.Item> */}
                    </>
            }


            <Form.Item wrapperCol={{
                offset: 6
            }}>
                <Button
                    disabled={!product?._id} type="primary" htmlType="submit" style={{ minWidth: 200 }}>
                    Submit
                </Button>
            </Form.Item>

        </Form>
    );
};

export default AddBatch