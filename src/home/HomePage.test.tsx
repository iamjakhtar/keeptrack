import { render, screen } from "@testing-library/react"
import  renderer  from 'react-test-renderer';
import HomePage from "./HomePage"

describe('HomePage', () => {
    it('should contain home heading', () => {
        render(<HomePage />);
        const heading = screen.getByRole('heading', { name: /home/i});
        expect(heading).toBeInTheDocument();
    })

    it('snapshot', () => {
        const tree = renderer.create(<HomePage />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})