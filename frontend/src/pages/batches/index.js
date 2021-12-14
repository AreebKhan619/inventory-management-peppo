import { Button, Select, Table, Tooltip, Space, Input, Modal } from 'antd';
import { useEffect, useState, useRef } from 'react';
import Highlighter from "react-highlight-words";
// import { AppContext } from '../../App';
import { getBatchData, getInventoryData } from '../../mockApis/inventoryApis';
import {
    SearchOutlined,
    ExclamationCircleFilled,
    PlusOutlined,
    EditOutlined
} from '@ant-design/icons';
import outletsData from "../../data/outlets.json"
import { getCatList } from '../../functions/utils';
import AddEditProductModal from '../products/addEditProductModal';
import AddBatch from './addBatch';
import moment from "moment"


const BatchesMain = () => {

    const [tableData, setTableData] = useState([])
    const [outletId, setOutletId] = useState(outletsData[0]._id)

    const [showAddBatchModal, setShowAddBatchModal] = useState(false)

    // const [selectedProduct, setSelectedProduct] = useState(null)
    // const [showCreateUpdateModal, setShowCreateUpdateModal] = useState(false)

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
            title: 'Product',
            key: 'productName',
            dataIndex: 'productName',
            ...getColumnSearchProps("productName"),
            render: (value, row) => <div>
                <div style={{ fontWeight: "bold", color: "darkgreen" }}>{value}</div>
                <div style={{ color: "grey" }}>({row.displayName})</div>
            </div>,
        },
        // {
        //     title: "Category",
        //     dataIndex: "category",
        //     width: 100,
        //     filters: getCatList(),
        //     filterMultiple: true,
        //     onFilter: (value, record) => record.category.indexOf(value) === 0,
        // },
        {
            title: 'Batch Qty Inwarded',
            dataIndex: "batchQty",
            render: (value, row) => {
                return <span>{value} {row.batchUom}</span>
            },
            filter: "Show non-empty records",
            onFilter: (value, record) => record.inStockQty > 0,
            sorter: (x, y) => x.batchQty - y.batchQty
        },
        {
            title: 'Date of Inward',
            dataIndex: "inwardDate",
            render: (value) => moment(value).format("DD/MM/YYYY"),
        },
        {
            title: 'SKUS in batch',
            render: (value, row) => {
                // return <span>{value} {row.batchUom}</span>
                return (
                    <div style={{ display: "flex", alignItems: "center" }}>{row.batchQty / row.unitQty}
                    </div>
                )
            },
            filter: "Show non-empty records",
            onFilter: (value, record) => record.inStockQty > 0,
            sorter: (x, y) => x.batchQty - y.batchQty
        },
        {
            title: "Status",
            dataIndex: "isConsumed",
            render: value => <Button onClick={()=>{
                if(value) return;
                window.confirm("Mark batch as consumed?")
            }} type={value ? "text" : "link"}>
                {value ? "Consumed" : "Not consumed yet"}
            </Button>

        }
    ];



    useEffect(() => {
        setterFn()
        //eslint-disable-next-line
    }, [outletId])


    const setterFn = async () => {
        setTableData(await getBatchData(outletId))
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


                <Button type='primary' onClick={() => setShowAddBatchModal(true)}>
                    <PlusOutlined /> Record a Batch for {outletsData.find(el => el._id === outletId).outletName}
                </Button>
            </div>


            <Table columns={columns} dataSource={tableData} />



            <Modal title="Add a batch"
                visible={showAddBatchModal}
                destroyOnClose={true}
                footer={null}
                onCancel={() => setShowAddBatchModal(false)}
                width={"80%"}
                style={{ top: 20 }}
            >
                <AddBatch
                    onCancel={() => setShowAddBatchModal(false)}
                />
            </Modal>




        </>
    )
}

export default BatchesMain