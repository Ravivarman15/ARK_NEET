import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Hero from '../components/Hero';
import { describe, it, expect } from 'vitest';

describe('Hero Component', () => {
    it('should display the NEET Rank Prediction button with correct link', () => {
        render(
            <BrowserRouter>
                <Hero />
            </BrowserRouter>
        );

        // Check for the text
        const buttonText = screen.getByText(/Get Your NEET Rank Prediction/i);
        expect(buttonText).toBeInTheDocument();

        // Check for the anchor tag and its href
        const anchor = buttonText.closest('a');
        expect(anchor).toHaveAttribute('href', '/neet-predictor');
    });
});
