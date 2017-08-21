import React, { Component } from 'react';
import Layout from 'components/Layout';
import Product from 'layout/Product';

export default class extends Component {
    static async getInitialProps ({ req, query }) {
        const { slug } = query;

        return {
            slug
        };
    }

    render () {
        return (
            <Layout title="Product" pathname={this.props.url.pathname}>
                <Product slug={this.props.slug} />
            </Layout>
        )
    }
}