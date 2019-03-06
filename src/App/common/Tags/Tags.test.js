import React from 'react';
import { render } from 'react-testing-library';

import Tags from "./Tags";

describe('Tags', function() {
  it('renders the nothing for no tags', () => {
    const { container } = render(<Tags />);

    expect(container).toBeEmpty();
  });

  it('renders the nothing for empty tags list', () => {
    const { container } = render(<Tags list={[]} />);

    expect(container).toBeEmpty();
  });

  it('renders the given tags', () => {
    const { getByText } = render(<Tags list={['a tag', 'another tag']} />);

    expect(getByText('a tag')).toBeInTheDocument();
    expect(getByText('another tag')).toBeInTheDocument();
  });
});
