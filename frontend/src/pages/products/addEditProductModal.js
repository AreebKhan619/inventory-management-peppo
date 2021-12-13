import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Row,
    Col,
} from 'antd';
import categoriesData from "../../data/categories.json"
import { HighlightOutlined } from "@ant-design/icons"

const AddEditProductModal = () => {

    // const [categoryId, setCategoryId] = useState("")
    const [category, setCategory] = useState(null)
    const [productName, setProductName] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [description, setDescription] = useState("")
    const [perUnitQty, setPerUnitQty] = useState("")
    const [productUom, setProductUom] = useState(null)

    const [isActive, setIsActive] = useState(true)
    const [barcodeNumber, setBarcodeNumber] = useState("")
    const [isPerishable, setIsPerishable] = useState(true)
    const [shelfLife, setShelfLife] = useState(0);


    useEffect(() => {
        if (category?._id) setIsPerishable(category.isPerishable)
    }, [category])

    return (
        <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
            layout="horizontal"
            onFinish={e => console.log(e)}
        >

            <Row style={{ paddingLeft: 165 }}>
                <Col span={12}>
                    <Form.Item label="Product Category" name="size">
                        <Select
                            showSearch
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            style={{ width: 300 }}
                            value={category?._id}
                            onChange={(_id) => {
                                const cat = categoriesData.find(el => el._id === _id)
                                setCategory(cat)
                                // console.log(cat)
                            }}
                        >
                            {categoriesData.map(({ _id, categoryName }, index) => {
                                return (
                                    <Select.Option key={_id} value={_id}>
                                        {categoryName}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>


                </Col>
                <Col span={12}>
                    <Form.Item label="Active" valuePropName="checked">
                        <Switch checked={isActive} onChange={() => setIsActive(!isActive)} />
                    </Form.Item>
                </Col>
            </Row>


            {
                !category?._id ? <div style={{ minHeight: 300 }}></div> :
                    <>
                        <Form.Item label="Product Name">
                            <Input
                                value={productName}
                                onChange={e => setProductName(e.target.value)}
                            />
                        </Form.Item>


                        <Form.Item label="Per unit Qty">
                            <InputNumber value={perUnitQty} onChange={val => setPerUnitQty(val)} /> <Select
                                placeholder="Select a UoM"
                                value={productUom}
                                onChange={val => setProductUom(val)}
                                style={{ width: 100 }}
                            >
                                {["g", "Kg", "l", "ml", "unit"].map(el => <Select.Option key={el} value={el}>{el}</Select.Option>)}
                            </Select>
                        </Form.Item>



                        <Form.Item label="Display Name">
                            <Input
                                value={displayName}
                                onChange={e => setDisplayName(e.target.value)}
                                addonAfter={
                                    <Form.Item name="suffix" noStyle>
                                        <HighlightOutlined
                                            onClick={() => {
                                                setDisplayName(productName + (productUom ? " - (" + perUnitQty + productUom + ")" : ""))
                                            }}
                                            style={{ width: 200, cursor: "pointer" }} />
                                    </Form.Item>
                                }
                            />

                        </Form.Item>
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
                        </Form.Item>


                        <Form.Item wrapperCol={{ offset: 2 }} style={{ marginLeft: 130 }}>
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
                        </Form.Item>
                    </>
            }


            <Form.Item wrapperCol={{
                offset: 6
            }}>
                <Button disabled={!category?._id} type="primary" htmlType="submit" style={{ minWidth: 200 }}>
                    Submit
                </Button>
            </Form.Item>

        </Form>
    );
};

export default AddEditProductModal