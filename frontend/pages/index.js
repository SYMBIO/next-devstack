import Layout from 'components/Layout';
import Home from 'containers/Home';

export default ({ url }) => (
    <Layout pathname={url.pathname}>
        <Home />
    </Layout>
)