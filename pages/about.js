import Layout from 'components/Layout';
import About from 'layout/About';

export default ({ url }) => (
    <div>
        <Layout title="About" pathname={url.pathname}>
            <About />
        </Layout>
    </div>
)