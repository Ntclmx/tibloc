import React, { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import { Form, Row } from 'react-bootstrap';
import { TransactionCard } from '../../components';
import './listTransaction.css';
import Pagination from 'react-bootstrap/Pagination';
import { withRouter } from 'react-router-dom';
import { UserContext } from '../MainApp/index';

import { getAllNftsOwnedBy } from '../../config/Blockchain.Service';
import { getGlobalState, setLoading, setLoadingTO } from '../../config/Store';

const ListTransactions = (props) => {
    setLoading(true, "Looking for NFTs...")
    const [transactions, setTransactions] = useState([]);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState('');
    const { web3User } = useContext(UserContext);
    const [nftsOwned, setNftsOwned] = useState({});

    useEffect(() => {
        const getFromBlockchain = async () => {

            const search = props.location.search;
            const userId = web3User;
    
            console.log("start get nfts owned")
            await getAllNftsOwnedBy();
            const nfts = getGlobalState("nftsOwned");
            setNftsOwned(nfts);
            console.log(nfts)    
        }
        
        getFromBlockchain()

    } , [props.location.search, web3User])

    const queryFunc = (e) => {
        setQuery(e.currentTarget.value);
    };

    setLoading(false,"")
    return (
        <div className='minDiv'>
            <div className='d-flex align-items-center'>
                <h4 className='pt-2'>LIST NFT OWNED</h4>
                <Form className='ms-auto me-0'>
                    <Form.Group className="me-0" controlId="findTransaction">
                        <Form.Control type="text" className='listTransactionFind  pe-4' placeholder="Search Transaction Here" onChange={queryFunc} />
                    </Form.Group>
                </Form>
            </div>
            {
                nftsOwned.length > 0 ? (
                    <Row className='mt-3'>
                        {nftsOwned.map(nft => {
                            return <TransactionCard
                                {...nft}
                                query={query}
                            />
                        })}
                    </Row>
                ) : (
                    <div className='text-center mt-5 pt-5'>
                        {setLoadingTO(true, "Looking for NFTs...")}
                        <p className='text-muted mt-5 pt-4'>No Transaction</p>
                    </div>
                )
            }
            <Pagination size="sm">{page}</Pagination>
        </div>
    )
}

export default withRouter(ListTransactions)