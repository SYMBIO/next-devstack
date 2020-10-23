import React, { ReactElement, useContext } from 'react';
import { useRouter } from 'next/router';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import BsNavbar, { NavbarProps } from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import { AppContext } from '../../../contexts/app-context/AppContext';
import { Image } from '../../primitives/Image/Image';
import { Link } from '../../primitives/Link/Link';
import { MainMenu } from '../MainMenu/MainMenu';
import styles from './Navbar.module.scss';

const Navbar = (props: NavbarProps): ReactElement => {
    const router = useRouter();
    const { locale, locales, defaultLocale } = router;
    const { mainMenu, logo, homepage, site } = useContext(AppContext);

    return (
        <BsNavbar
            {...props}
            onSelect={(eventKey) => {
                eventKey && router.push('/[[...slug]]', eventKey);
            }}
        >
            <BsNavbar.Brand>
                <Link plain page={homepage || undefined}>
                    {logo && logo.responsiveImage ? <Image data={logo.responsiveImage} /> : site?.globalSeo?.siteName}
                </Link>
            </BsNavbar.Brand>

            <BsNavbar.Toggle aria-controls="basic-navbar-nav" />

            <BsNavbar.Collapse id="basic-navbar-nav">
                <Container fluid>{mainMenu && <MainMenu menu={mainMenu} />}</Container>
                {locales && locales.length > 1 && (
                    <DropdownButton id="languageSelector" title={locale} menuAlign={'right'}>
                        {locales
                            .filter((loc) => loc !== locale)
                            .map((loc) => (
                                <Dropdown.Item
                                    key={`Dropdown_locale_${loc}`}
                                    href={`/${loc !== defaultLocale ? loc : ''}`}
                                >
                                    {loc}
                                </Dropdown.Item>
                            ))}
                    </DropdownButton>
                )}
            </BsNavbar.Collapse>
        </BsNavbar>
    );
};

Navbar.whyDidYouRender = true;

export { Navbar };
