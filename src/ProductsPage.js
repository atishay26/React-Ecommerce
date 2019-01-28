import {Link} from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import * as constant from './constant';
import { Button } from 'semantic-ui-react';
import './ProductPage.css';

class ProductsPage extends Component {
    state = {
        Products:[],
        message:"",
        subCatId:null
        }

    componentDidMount() {
        // console.log(this.props)
        let catid = this.props.match.params.categoryId;
        let subcatid = this.props.match.params.subcategoryId;
        axios.get(constant.ms1+'/categories/' + catid + "/" + subcatid)
            .then(res => {
                console.log(res.data);
                if(res.data.statusCode===200){
                    this.setState({
                        Products: res.data.responseData,
                        subCatId:subcatid,
                        filterBy:null,
                        message:""
                    })
                }
                else{
                    this.setState({
                        message:res.data.message
                    })
                }
            })
            .catch(error=> {
                console.log(error);
            });
        }
    // componentDidMount(){
    // }

    handleFilter=(value)=>{
        axios.get(constant.ms1+'/filterByPopularScore/'+this.state.subCatId+'/'+value)
        .then(res=>{
            console.log(res);
            if(res.data.statusCode===200){
                this.setState({
                    Products:res.data.responseData,
                })
            }
        }).catch(error=>{
            console.log(error);
        });
    }
    handleSortLow=()=>{
        axios.get(constant.ms1+'/sortByPriceLTH/'+this.state.subCatId)
        .then(res=>{
            console.log(res);
            if(res.data.statusCode===200){
                this.setState({
                    Products:res.data.responseData,
                })
            }
        }).catch(error=>{
            console.log(error);
        });
    }

    handleSortHigh=()=>{
        axios.get(constant.ms1+'/sortByPriceHTL/'+this.state.subCatId)
        .then(res=>{
            console.log(res);
            if(res.data.statusCode===200){
                this.setState({
                    Products:res.data.responseData,
                })
            }
        }).catch(error=>{
            console.log(error);
        });
    }

    render() {
        const prod = this.state;
        const products = prod.Products
        const productsList = products.map((product, index) => {
                let features=[];
                let products1=product.genFeatures;
                for(let key in products1)
                   features.push(products1[key])
                return (
                    <div className="products row" key={index}>                        
                        <Link to ={'/product/'+product.productId}>
                            <div className="collection-item col s3">Name:</div>
                            <div className="collection-item col s3">{product.productName}</div>
                            <div className="collection-item col s3">Brand:</div>
                            <div className="collection-item col s3">{product.brand}</div>
                            <div className="collection-item col s3">Price:</div>
                            <div className="collection-item col s3">Rs.{product.price}</div>
                            <div className="collection-item col s3">Product Description:</div>
                            <div className="collection-item col s3">{product.desc}</div>
                            <hr/>
                        </Link>
                    </div>
                )
            })
        return (
            productsList.length ?(
            <div className="container">
            <Button className="btn popularFilter" onClick={()=>{this.handleFilter(3)}}>Average Rated</Button>
            <Button className="btn popularFilter" onClick={()=>{this.handleFilter(5)}}>Top Rated</Button>
            <Button className="btn popularFilter" onClick={this.handleSortLow}>Show Low to High</Button>
            <Button className="btn popularFilter" onClick={this.handleSortHigh}>Show High to Low</Button>
                {productsList}
            </div>
            ):(
                this.state.message ? (
                     <div className="center">
                            <h2>{this.state.message}</h2>
                    </div>
                ) : (
                    <div className="center">
                        <img src="https://i.imgur.com/T3Ht7S3.gif" width="120"></img>
                    </div>
                )
            )
        )
    }
}
export default ProductsPage;