import { Button, Select, Table, Tooltip, Space, Input, Modal } from 'antd';
import { useEffect, useState, useRef } from 'react';
import Highlighter from "react-highlight-words";
// import { AppContext } from '../../App';
import { getInventoryData } from '../../mockApis/inventoryApis';
import {
    SearchOutlined,
    ExclamationCircleFilled,
    PlusOutlined,
    EditOutlined
} from '@ant-design/icons';
import outletsData from "../../data/outlets.json"
import { getCatList } from '../../functions/utils';
import AddEditProductModal from './addEditProductModal';



const ProductsTable = () => {

    // const { products, setProducts } = useContext(AppContext)

    const [tableData, setTableData] = useState([])
    const [outletId, setOutletId] = useState(outletsData[0]._id)

    const [selectedProduct, setSelectedProduct] = useState(null)
    const [showCreateUpdateModal, setShowCreateUpdateModal] = useState(false)

    // for searching

    // state for search
    const [searchText, setSearchText] = useState("");
    const [searchedCol, setSearchedCol] = useState("");

    const searchInput = useRef();

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={(node) => {
                        searchInput.current = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText(selectedKeys[0]);
                            setSearchedCol(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase())
                : "",
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current.select(), 100);
            }
        },
        render: (text) =>
            searchedCol === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedCol(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };

    const columns = [
        {
            title: 'Name',
            key: 'productName',
            dataIndex: 'productName',
            ...getColumnSearchProps("productName"),
            render: (value, row) => <div>
                <div style={{fontWeight: "bold", color: "darkgreen"}}>{value}</div>
                <div style={{ color: "grey" }}>({row.displayName})</div>
            </div>,

        },
        {
            title: "Category",
            dataIndex: "category",
            width: 100,
            filters: getCatList(),
            filterMultiple: true,
            onFilter: (value, record) => record.category.indexOf(value) === 0,
        },
        {
            title: 'SKUs in stock',
            dataIndex: "inStockQty",
            render: (value, row) => {
                return (
                    <div style={{ display: "flex", alignItems: "center" }}>{row.inStockQty / row.unitQty}
                        {((row.inStockQty || 0) < row.lowStockQty) && <Tooltip title={"Low Stock Alert!"}>
                            <ExclamationCircleFilled style={{ color: "darkyellow", fontSize: 25, marginLeft: 10 }} />
                        </Tooltip>}
                    </div>
                )
            },
            filter: "Show non-empty records",
            onFilter: (value, record) => record.inStockQty > 0,
            sorter: (x, y) =>
                (x.inStockQty / x.unitQty) - (y.inStockQty / y.unitQty)
        },
        {
            title: 'Per item Qty',
            key: 'unitQty',
            dataIndex: 'unitQty',
            render: (value, row) => {
                return (
                    <div>{value} {row.unitUom}</div>
                )
            }
        },
        {
            title: 'Volume In Stock',
            dataIndex: "inStockQty",
            render: (value, row) => <>{value} {row.unitUom}</>,
            sorter: (x, y) => x.tax - y.tax,

        },
        {
            title: 'MRP',
            render: object => <span>Rs. {object.pricing.mrp}</span>
        },
        {
            title: 'Selling Price',
            render: object => <span style={{ fontSize: "1.1em", fontWeight: "bold" }}>Rs. {object.pricing.sellingPrice}</span>
        },
        {
            title: 'Barcode',
            dataIndex: "barcodeNumber",
            ...getColumnSearchProps("barcodeNumber")
        },
        {
            title: 'Actions',
            render: (value, row) => <Tooltip title="Edit">
                <Button
                    type="primary"
                    shape="circle"
                    icon={<EditOutlined />}
                    onClick={() => {
                        setSelectedProduct(row)
                        setShowCreateUpdateModal(true)
                    }}
                    danger
                />
            </Tooltip>
        },
    ];




    useEffect(() => {
        setterFn()
        //eslint-disable-next-line
    }, [outletId])


    // useEffect(() => {
    //     console.log(tableData)
    // }, [tableData])

    const setterFn = async () => {
        setTableData(await getInventoryData(outletId))
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


                <Button type='primary' onClick={() => setShowCreateUpdateModal(true)}>
                    <PlusOutlined /> Add a product
                </Button>
            </div>
            <Table columns={columns} dataSource={tableData} />



            <Modal title="Add a product"
                visible={showCreateUpdateModal}
                destroyOnClose={true}
                footer={null}
                onCancel={() => setShowCreateUpdateModal(false)}
                width={"80%"}
                style={{ top: 20 }}
            >
                <AddEditProductModal
                onCancel={()=>setShowCreateUpdateModal(false)}
                selectedProduct={selectedProduct} />
            </Modal>




        </>
    )
}

export default ProductsTable