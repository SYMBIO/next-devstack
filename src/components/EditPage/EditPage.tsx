import React from 'react';
import { PageRecord } from '../../types/graphql';

export const EditPage = ({ page }: { page: PageRecord }) => (
    <a
        href={
            'https://narodni-divadlo-cz.admin.datocms.com/editor/item_types/' +
            (page ? `99631/items/${page.id}/edit` : '141896/items/1556599/edit')
        }
        target="_blank"
        rel="noopener noreferrer"
        style={{
            display: 'block',
            position: 'fixed',
            left: 0,
            top: 0,
            width: '50px',
            height: '50px',
            zIndex: 1000,
            padding: '10px 20px 20px 10px',
            backgroundColor: '#000',
            color: '#fff',
            borderBottomRightRadius: '50px',
        }}
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 383.947 383.947">
            <g>
                <g>
                    <g fill="#fff">
                        <polygon points="0,303.947 0,383.947 80,383.947 316.053,147.893 236.053,67.893" />
                        <path d="M377.707,56.053L327.893,6.24c-8.32-8.32-21.867-8.32-30.187,0l-39.04,39.04l80,80l39.04-39.04 C386.027,77.92,386.027,64.373,377.707,56.053z" />
                    </g>
                </g>
            </g>
        </svg>
    </a>
);
