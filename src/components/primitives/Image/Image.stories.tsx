import React from 'react';
import { Image as ImageComponent, ImageT } from './Image';
import { Story } from '@storybook/react/types-6-0';

export default {
    component: ImageComponent,
    title: 'Primitives/Image',
    args: {
        data: {
            srcSet:
                'https://www.datocms-assets.com/20999/1586567450-passat1.jpg?dpr=0.25&fit=crop&w=300 75w,https://www.datocms-assets.com/20999/1586567450-passat1.jpg?dpr=0.5&fit=crop&w=300 150w,https://www.datocms-assets.com/20999/1586567450-passat1.jpg?dpr=0.75&fit=crop&w=300 225w,https://www.datocms-assets.com/20999/1586567450-passat1.jpg?fit=crop&w=300 300w,https://www.datocms-assets.com/20999/1586567450-passat1.jpg?dpr=1.5&fit=crop&w=300 450w,https://www.datocms-assets.com/20999/1586567450-passat1.jpg?dpr=2&fit=crop&w=300 600w,https://www.datocms-assets.com/20999/1586567450-passat1.jpg?dpr=3&fit=crop&w=300 900w,https://www.datocms-assets.com/20999/1586567450-passat1.jpg?dpr=4&fit=crop&w=300 1200w',
            webpSrcSet:
                'https://www.datocms-assets.com/20999/1586567450-passat1.jpg?dpr=0.25&fit=crop&fm=webp&w=300 75w,https://www.datocms-assets.com/20999/1586567450-passat1.jpg?dpr=0.5&fit=crop&fm=webp&w=300 150w,https://www.datocms-assets.com/20999/1586567450-passat1.jpg?dpr=0.75&fit=crop&fm=webp&w=300 225w,https://www.datocms-assets.com/20999/1586567450-passat1.jpg?fit=crop&fm=webp&w=300 300w,https://www.datocms-assets.com/20999/1586567450-passat1.jpg?dpr=1.5&fit=crop&fm=webp&w=300 450w,https://www.datocms-assets.com/20999/1586567450-passat1.jpg?dpr=2&fit=crop&fm=webp&w=300 600w,https://www.datocms-assets.com/20999/1586567450-passat1.jpg?dpr=3&fit=crop&fm=webp&w=300 900w,https://www.datocms-assets.com/20999/1586567450-passat1.jpg?dpr=4&fit=crop&fm=webp&w=300 1200w',
            sizes: '(max-width: 300px) 100vw, 300px',
            src: 'https://www.datocms-assets.com/20999/1586567450-passat1.jpg?fit=crop&w=300',
            width: 300,
            height: 225,
            aspectRatio: 1.3333333333333333,
            alt: 'Nabouraný VW Passat',
            title: null,
            base64:
                'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoSCAgLFQoXDhgQDg0NFx0VFhEWJh0ZGCgmGh4mHysvHR0oHRUWJDUlNC0vMkoyGSI4PTcwUi0xMi8BCgsLDg0OHBAQHDsoIigvLy80Oy81LzU7Oy8vLy8vLy87Ly8vLy8yMC8vMi8vLy8vLzUvLzUvLy81Ly8vLy8vL//AABEIABIAGAMBIgACEQEDEQH/xAAYAAACAwAAAAAAAAAAAAAAAAAABQEGB//EACEQAAEDBAIDAQAAAAAAAAAAAAEAAgMEBREhMTISFDMT/8QAFgEBAQEAAAAAAAAAAAAAAAAAAgME/8QAGhEBAQACAwAAAAAAAAAAAAAAAQAiMQISE//aAAwDAQACEQMRAD8Aslbco2MOSEpZfoBL3CSXuom9Z3gTnCodM64yV2nv53lDqLaDhgttkF+gDewQs1aK4RjDipT8yiM7uvyKQ0YH7nQ5UIQNVWeNA8BpCEJlO//Z',
        },
    },
};

const Template: Story<ImageT> = (args) => <ImageComponent {...args} />;

export const Image = Template.bind({});
