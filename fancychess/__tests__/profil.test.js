import { render, screen } from '@testing-library/react';
import Profil from '../pages/profil';
import '@testing-library/jest-dom';

describe('Profil', () => {
  it('look if Profil Picture is there', () => {
    render(<Profil />);

    const profil_pic = screen.getByRole('profilpicture');

    expect(profil_pic).toBeInTheDocument();
  })
});