import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Form, Row } from 'react-bootstrap';
import { TransactionCard } from '../../components';
import './listTransaction.css';
import Pagination from 'react-bootstrap/Pagination';
import { withRouter } from 'react-router-dom';

const ListTransactions = (props) => {
    const [transactions, setTransactions] = useState([]);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState('');

    useEffect(() => {

        const userId = 'u123';

        const search = props.location.search;

        Axios.get(`http://127.0.0.1:4000/v1/transactions/user/${userId}${search}`)
            .then(result => {

                setTransactions(result.data.transactions);

                const activePage = result.data.current_page;
                const totalPage = Math.ceil(result.data.total_data / result.data.per_page);

                let items = [];

                for (let number = 1; number <= totalPage; number++) {
                    console.log(number === activePage);
                    items.push(
                        <Pagination.Item key={number} active={number === activePage} href={`/transactions?page=${number}`}>{number}</Pagination.Item>
                    );
                }

                setPage(items);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const queryFunc = (e) => {
        setQuery(e.currentTarget.value);
    };
    return (
        <div>
            <div className='d-flex align-items-center'>
                <h4 className='pt-2'>LIST TRANSACTION</h4>
                <Form className='ms-auto me-0'>
                    <Form.Group className="me-0" controlId="findTransaction">
                        <Form.Control type="text" className='listTransactionFind  pe-4' placeholder="Search Transaction Here" onChange={queryFunc} />
                    </Form.Group>
                </Form>
            </div>
            <Row className='mt-3'>
                {transactions.map(transaction => {
                    return <TransactionCard
                        key={transaction._id}
                        _id={transaction._id}
                        catId={transaction.categoryId}
                        trxAmount={transaction.transactionAmount}
                        paymentStatus={transaction.paymentStatus}
                        query={query}
                    />
                })}
            </Row>
            <Pagination size="sm">{page}</Pagination>
        </div>
    )
}

export default withRouter(ListTransactions)