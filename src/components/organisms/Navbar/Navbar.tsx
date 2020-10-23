import React, { ReactElement, useContext } from 'react';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import BsNavbar, { NavbarProps } from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AppContext } from '../../../contexts/app-context/AppContext';
import { Image } from '../../primitives/Image/Image';
import { Link } from '../../primitives/Link/Link';
import { MainMenu } from '../MainMenu/MainMenu';

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

            <Container>
                <BsNavbar.Collapse id="basic-navbar-nav">
                    {mainMenu && <MainMenu menu={mainMenu} />}
                    {locales && locales.length > 1 && (
                        <NavDropdown id={'languageSelector'} title={locale}>
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
                        </NavDropdown>
                    )}
                </BsNavbar.Collapse>
            </Container>
        </BsNavbar>
    );
};

Navbar.whyDidYouRender = true;

export { Navbar };
