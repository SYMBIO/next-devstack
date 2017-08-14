import Layout from 'components/Layout';
import About from 'layout/About';

export default ({ url }) => (
    <Layout title="About" pathname={url.pathname}>
        <About />
    </Layout>
)