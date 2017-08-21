import Link from 'next/link';
import Head from 'next/head';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Nav, { NavItem } from 'components/Nav';

export default ({ pathname, children, title = 'This is the default title' }) => (
    <div>
        <Head>
            <meta charSet='utf-8' />
            <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            <title>{ title }</title>
            <meta name="description" content="" />
            <meta name="keywords" content="" />
            <meta name="author" content="" />
            <meta name="robots" content="index, follow" />
            <meta property="og:title" content="" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="" />
            <meta property="og:description" content="" />
            <meta property="og:image" content="" />
            <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
            <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
        </Head>
        <Header>
            <Nav>
                <NavItem isActive={pathname.length === 1}>
                    <Link href='/'><a>Home</a></Link>
                </NavItem>
                <NavItem isActive={pathname.includes('/about')} >
                    <Link href='/about'><a>About</a></Link>
                </NavItem>
            </Nav>
        </Header>

        { children }

        <Footer>
            <p>Footer</p>
        </Footer>
    </div>
)