import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { withRouter } from 'react-router-dom';
import { Image, Row } from 'react-bootstrap';
import './detailEventTabs.css'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const DetailEventTabs = (props) => {
    const [value, setValue] = React.useState(0);
    const [nfts, setNfts] = useState([]);
    const [categories, setCategories] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const id = props.match.params.id;
        console.log(id);

        Axios.get(`${process.env.REACT_APP_API_URL}/v1/event/${id}/categories`)
            .then(async result => {
                console.log('categories', result.data.categories);
                setCategories(result.data.categories)
                let arrNfts = [];
                for (const category of result.data.categories) {
                    const categoryId = category._id;
                    try {
                        const nfts = await Axios.get(`${process.env.REACT_APP_API_URL}/v1/nfts/category/${categoryId}`);

                        arrNfts = arrNfts.concat(nfts.data.Nft);
                    }
                    catch {
                        continue;
                    }
                }

                setNfts(arrNfts);
            })
            .catch(err => {
                console.log(err);
            })
    }, [props])

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Description" {...a11yProps(0)} />
                    <Tab label="Collectibles" {...a11yProps(2)} />
                    <Tab label="Terms and Conditions" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <p>{props.eventDescription}</p>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Row>
                    {
                        categories.map(category => {
                            return <>
                                <p className='text-secondary'>{category.categoryName}</p>
                                {nfts.map(nft => {

                                    if (nft.categoryId === category._id) {

                                        return <div className='col-3 mb-2'><Image className=' nftImagePreview' src={`${nft.nftImageHttps}`} alt='nft'></Image></div>
                                    }

                                    return <></>
                                })}

                            </>


                        })
                    }
                    {/* {nfts.map(nft => {
                        return <Image className='col-3 mb-2 nftImagePreview' src={`${process.env.REACT_APP_API_URL}/${nft.nftImage}`}></Image>
                    })} */}
                </Row>
            </TabPanel>
            <TabPanel value={value} index={2}>
                {props.eventTnc}
            </TabPanel>
        </Box>
    );

}

export default withRouter(DetailEventTabs)