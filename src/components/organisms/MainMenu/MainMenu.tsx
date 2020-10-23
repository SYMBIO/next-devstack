import React, { ReactElement } from 'react';
import classNames from 'classnames';
import Nav, { NavProps } from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NextLink from 'next/link';
import { MainMenu as MainMenuType } from '../../../types/app';
import { Link } from '../../primitives/Link/Link';

export interface MainMenuProps extends NavProps {
    menu: MainMenuType;
}

const MainMenu = ({ menu, className }: MainMenuProps): ReactElement => (
    <Nav className={classNames('m-auto', className)}>
        {menu?.links.map((link) => {
            if (link.__typename === 'PageRecord' && link.url) {
                return (
                    <NextLink key={link.id} href={'[[...slug]]'} as={link.url.replace('homepage', '/')} passHref>
                        <Nav.Link key={link.id}>{link.title}</Nav.Link>
                    </NextLink>
                );
            }
            if (link.__typename === 'MenuRecord') {
                return (
                    <NavDropdown title={link.title} id={link.id}>
                        {link.links.map(
                            (item) =>
                                item.__typename === 'PageRecord' &&
                                item.url && (
                                    <Link key={item.id} page={item} withoutAnchor>
                                        <NavDropdown.Item>{item.title}</NavDropdown.Item>
                                    </Link>
                                ),
                        )}
                    </NavDropdown>
                );
            }
        })}
    </Nav>
);

MainMenu.whyDidYouRender = true;

export { MainMenu };
