import Layout from 'components/Layout';
import Home from 'layout/Home';

export default ({ url }) => (
    <Layout pathname={url.pathname}>
        <Home />
    </Layout>
)