import React from 'react';
import { render } from '@testing-library/react';
import Song from './CardSong';

test('render search pages', () => {
    render(
        <Song
        images="https://i.scdn.co/image/ab67616d0000b27369580456f5349c006e5114a0"
        title="Begadang"
        artist="Rhoma Irama"
        albumName="Begadang"
        onClick={() => {}}
        >
            Test
        </Song>
    );
});